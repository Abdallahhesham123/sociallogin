import slugify from "slugify";
import CartModel from "../../../../DB/model/Cart.model.js";
import ProductModel from "../../../../DB/model/Product.model.js";
import { asyncHandler } from "./../../../utils/errorHandling.js";



export const getCartModule = asyncHandler(async(req, res, next) => {

    const Cartitems = await CartModel.find()
    return res.status(200).json({Cartitems})
})  


export const createCart =asyncHandler(async(req, res, next) => {
const {ProductId , quantity} = req.body;

//check product avaliability
const Product = await ProductModel.findById(ProductId)
if(!Product){
    return next(new Error(`In Valid ProductId`), {
        cause: 400,
      })
}

if(Product.stock < quantity || Product.isDeleted){ //freeze product
    await ProductModel.updateOne({_id:ProductId},{$addToSet:{wishUserlist:req.user._id}})
    return next(new Error(`This product not enough in stock max avaliable is ${Product.stock}`), {
        cause: 400,
      })
}

const checkCart = await CartModel.findOne({userId:req.user.id})
//if not exist create new one

if(!checkCart){

    const newCart = await CartModel.create( {
            userId:req.user.id,
            Products:[{ProductId ,quantity}]
        
        } )
        return res.status(201).json({message:"Cart created successfully" ,cart:newCart})
}


//if exist 
//1- update old item
let matchProduct = false
for (let i = 0; i < checkCart.Products.length; i++) {
    if(checkCart.Products[i].ProductId.toString() === ProductId){
        checkCart.Products[i].quantity = quantity
        matchProduct= true
           break;
    }
    
}
// 2- push new item in cart
if(!matchProduct){
    checkCart.Products.push({ProductId , quantity})
}
const updateCart = await checkCart.save();

return res.status(200).json({message:"Cart updated successfully" ,cart :updateCart})

})


export async function deleteItemsFromCart(ProductIds , userId){

   const Cart =  await CartModel.updateOne(
        { userId},
        {
          $pull: {
            Products: {
              ProductId: { $in: ProductIds },
            },
          },
        }
      );

      return Cart

}

export const deleteItems =asyncHandler(async(req, res, next) => {
    const {ProductIds } = req.body;
  const cart = await deleteItemsFromCart(ProductIds , req.user._id)
    return res.status(200).json({message:"Cart updated successfully" ,cart })
    
    })
    

    export async function emptyCart(userId){

        const Cart =  await CartModel.updateOne(
             { userId}, { Products: [] });
     
           return Cart
     
     }
     
    export const clearCart =asyncHandler(async(req, res, next) => {
    
       await emptyCart( req.user._id)
        return res.status(200).json({message:"Cart Empty successfully" })
        
        })
    


