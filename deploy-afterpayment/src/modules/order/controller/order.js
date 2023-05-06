import slugify from "slugify";
import OrderModel from "../../../../DB/model/Order.model.js";
import ProductModel from "../../../../DB/model/Product.model.js";
import { asyncHandler } from "./../../../utils/errorHandling.js";
import CouponModel from "../../../../DB/model/Coupon.model.js";
import CartModel from "../../../../DB/model/Cart.model.js";
import { deleteItemsFromCart, emptyCart } from "../../cart/controller/cart.js";
import { createInvoice } from "../../../utils/pdf.js";
import { sendEmail } from "../../../utils/email.js";
import payment from "../../../utils/payment.js";
import Stripe from "stripe";
import dotenv from 'dotenv'
dotenv.config()
export const createOrder = async (req, res, next) => {
  const { address, phone, note, couponName, Paymenttype } = req.body;
  if (!req.body.Products) {
    const CartItems = await CartModel.findOne({ userId: req.user._id });
    if (!CartItems?.Products?.length) {
      return next(new Error(`In-Valid Cart or Empty Cart`), { cause: 404 });
    }
    req.body.isCart = true;
    req.body.Products = CartItems.Products;
  }

  if (couponName) {
    const checkFoundCoupon = await CouponModel.findOne({
      name: couponName.toLowerCase(),
    });
    // const checkFoundCoupon = await CouponModel.findOne({name:couponName.toLowerCase() ,usedBy:{$nin:req.user._id}})

    if (!checkFoundCoupon) {
      return next(new Error(`In-Valid Coupon`), { cause: 404 });
    }

    if (checkFoundCoupon.expirationDate.getTime() < Date.now()) {
      return next(new Error(` Sorry, Expire Date Coupon`), { cause: 404 });
    }
    if (checkFoundCoupon.usedBy.includes(req.user._id)) {
      return next(new Error(` Sorry, Already Used By You`), { cause: 404 });
    }

    req.body.coupon = checkFoundCoupon;
  }
  const ProductIds = [];
  const finalOrderProductsList = [];
  let subTotalPrice = 0;
  for (let product of req.body.Products) {
    const checkedProduct = await ProductModel.findOne({
      _id: product.ProductId,
      stock: { $gte: product.quantity },
      isDeleted: false,
    });
    if (!checkedProduct) {
      return next(new Error(`In-Valid Products : ${checkedProduct?.name}`), {
        cause: 409,
      });
    }
    if (req.body.isCart) {
      product = product.toObject();
    }

    ProductIds.push(product.ProductId);
    product.name = checkedProduct.name;
    product.unitPrice = checkedProduct.finalPrice;
    product.finalPrice =
      product.quantity * checkedProduct.finalPrice.toFixed(2);
    finalOrderProductsList.push(product);
    subTotalPrice += product.finalPrice;
  }
  const dummyOrderData = {
    userId: req.user._id,
    address,
    phone,
    note,
    Products: finalOrderProductsList,
    couponId: req.body.coupon?._id,
    subTotalPrice,
    finalPrice:
      subTotalPrice -
      (subTotalPrice * ((req.body.coupon?.amount || 0) / 100)).toFixed(2),
    Paymenttype,
    Status: Paymenttype == "Card" ? "WaitPayment" : "Placed",
  };

  const order = await OrderModel.create(dummyOrderData);

  //decrease product stock

  for (const product of req.body.Products) {
    await ProductModel.updateOne(
      { _id: product.ProductId },
      { $inc: { stock: -parseInt(product.quantity) } }
    );
  }
  //push userId in coupon UsedBy

  if (req.body.coupon) {
    await CouponModel.updateOne(
      { _id: req.body.coupon._id },
      { $addToSet: { usedBy: req.user._id } }
    );
  }
  // Clear Items from card

  if (req.body.isCart) {
    await emptyCart( req.user._id)
  } else {
    await deleteItemsFromCart(ProductIds , req.user._id)
  }
//Generate pdf
const invoice = {
  shipping: {
    name: req.user.username,
    address: order.address,
    city: "Alexandria",
    state: "SidiBishr",
    country: "Egypt",
    postal_code: 94111
  },
  items:order.Products,
  subtotal:order.subTotalPrice * 100,
  TotalPayment: order.finalPrice * 100,
  invoice_nr: order._id,
  data:order.createdAt
};

await createInvoice(invoice, "invoice.pdf");
  //send email to notify user

  await sendEmail({to:req.user.email  , subject:"Invoices" , attachments:[

    {
      path:"invoice.pdf",
      contentType:"application/pdf"
    }
  ]})

  //Start Payment

  if(order.Paymenttype == "Card"){

   const stripe = new Stripe(process.env.STRIPE_KEY)
if(req.body.coupon){
  const coupon = await stripe.coupons.create({
    percent_off: req.body.coupon.amount,
    duration:'once'
  })
  console.log(coupon);
  req.body.couponId = coupon.id
}

    const session =await payment({
           stripe,
      payment_method_types:['card'],
      mode:"payment",
      cancel_url:`${req.protocol}://${req.headers.host}/order/payment/cancel?orderId=${order._id}`,
      customer_email:req.user.email,
      metadata:{
        orderId:order._id.toString(),
      },
      line_items:order.Products.map(product =>{
        return{
       
            price_data:{
                currency:'usd',
                product_data:{
                    name:product?.name
                },
                unit_amount:product?.unitPrice * 100
            },
            quantity:product?.quantity
       
        }
      
      
      }),

      discounts:req.body.couponId ? [{coupon:req.body.couponId}] :[]
      
    })

    return res.status(201).json({ message: "Order Created successfully", order, session ,url:session.url});
  }


  return res.status(200).json({ message: "Order Created successfully", order });
};

export const cancelOrder = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;

  const { reasons } = req.body;

  const OrderFound = await OrderModel.findOne({
    _id: orderId,
    userId: req.user._id,
  });

  if (!OrderFound) {
    return next(new Error(`Invalid Order-Id`), { cause: 404 });
  }
  if (
    (OrderFound?.Status != "Placed" && OrderFound.Paymenttype == "Cash") ||
    (OrderFound?.Status != "WaitPayment" && OrderFound.Paymenttype == "Card")
  ) {
    return next(
      new Error(
        `CanNot Cancel Your Order after it been Changed To ${OrderFound.Status}`
      ),
      { cause: 404 }
    );
  }

  const CancelOrder = await OrderModel.updateOne(
    { _id: OrderFound._id },

    { Status: "Canceled", Reason: reasons, updatedBy: req.user._id }
  );

  if (!CancelOrder.matchedCount) {
    return next(new Error(`Fail To cancel This Order`), { cause: 404 });
  }

  //return products to system
  for (const product of OrderFound.Products) {
    await ProductModel.updateOne(
      { _id: product.ProductId },
      { $inc: { stock: parseInt(product.quantity) } }
    );
  }
  //return user from coupon to make it another time

  if (OrderFound.couponId) {
    await CouponModel.updateOne(
      { _id: OrderFound.couponId },
      { $pull: { usedBy: req.user._id } }
    );
  }
  return res.status(200).json({ message: "Order Canceled successfully" });
});

export const deleveredOrder = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;

  const OrderFound = await OrderModel.findOne({ _id: orderId });

  if (!OrderFound) { return next(new Error(`Invalid Order-Id`), { cause: 404 }); }

  if (
    (OrderFound?.Status == "On-way" && OrderFound.Paymenttype == "Cash") ||
    (OrderFound?.Status != "Canceled" && OrderFound.Paymenttype == "Cash") ||
    (OrderFound?.Status != "Rejected" && OrderFound.Paymenttype == "Cash") ||
    (OrderFound?.Status == "WaitPayment" && OrderFound.Paymenttype == "Card")
  ) {
    const DeleveredOrder = await OrderModel.updateOne(
      { _id: OrderFound._id },
      { Status: "Deleivered", updatedBy: req.user._id }
    );
    if (!DeleveredOrder.matchedCount) {
      return next(new Error(`Fail To update This Order`), { cause: 404 });
    }
    return res.status(200).json({ message: "Order updated successfully" });
  } else {
    return next(new Error(`CanNot rejected Order after it been Changed To ${OrderFound.Status}` ),
      { cause: 404 }
    );
  }
});

export const onWayOrder = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;

  const OrderFound = await OrderModel.findOne({ _id: orderId });

  if (!OrderFound) {
    return next(new Error(`Invalid Order-Id`), { cause: 404 });
  }
  if (
    (OrderFound?.Status == "Placed" && OrderFound.Paymenttype == "Cash") ||
    (OrderFound?.Status == "WaitPayment" && OrderFound.Paymenttype == "Card")||
    (OrderFound?.Status != "Canceled" && OrderFound.Paymenttype == "Cash") ||
    (OrderFound?.Status != "Rejected" && OrderFound.Paymenttype == "Cash") 
  ) {

    const OrderStatus = await OrderModel.updateOne(
        { _id: OrderFound._id },
        { Status: "On-way", updatedBy: req.user._id }
      );
      if (!OrderStatus.matchedCount) {
        return next(new Error(`Fail To update This Order`), { cause: 404 });
      }
      return res.status(200).json({ message: "Order updated successfully" });
  }else{
    return next(
        new Error(
          `CanNot Cancel Your Order after it been Changed To ${OrderFound.Status}`
        ),
        { cause: 404 }
      );

  }
});

export const rejectedOrder = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const{address, phone}= req.body;
  const OrderFound = await OrderModel.findOne({
    $and: [
      {_id: orderId},
      { $or: [{address}, {phone}] }
  ]
  });
  if (!OrderFound) {
    return next(new Error(`Invalid Order data`), { cause: 404 });
  }

    const OrderStatus = await OrderModel.updateOne(
        { _id: OrderFound._id },
        { Status: "Rejected", updatedBy: req.user._id }
      );
      if (!OrderStatus.matchedCount) {
        return next(new Error(`Fail To update This Order`), { cause: 404 });
      }
      
  //return products to system
  for (const product of OrderFound.Products) {
    await ProductModel.updateOne(
      { _id: product.ProductId },
      { $inc: { stock: parseInt(product.quantity) } }
    );
  }
  //return user from coupon to make it another time

  if (OrderFound.couponId) {
    await CouponModel.updateOne(
      { _id: OrderFound.couponId },
      { $pull: { usedBy: req.user._id } }
    );
  }

      return res.status(200).json({ message: "Order updated successfully" });

});
