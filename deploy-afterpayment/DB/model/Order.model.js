import mongoose, { Schema, model, Types } from "mongoose";
const OrderSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref:"User",
      required: [true, 'Order required']
    },
    updatedBy:{
      type: Types.ObjectId,
      ref:"User",
    },
   Note: {
    type:String,
   },
    address:{
        type:String,
        required: [true,'address is  required']
    },
    phone:[{
      type:String,
      required: [true,'phone is  required']
  }],
    Products: [{
                name:{
                  type: String,
                  required: [true, 'name required'],
                },
                ProductId:{
                  type: Types.ObjectId,
                  ref:"Product",
                  required: [true, 'ProductId required'],
                },
                quantity:{
                    type: Number,
                    default:1,
                    required: [true, 'quantity of ProductId required'],
                },
                unitPrice:{
                  type: Number,
                  default:1,
                  required: [true, 'unitPrice of ProductId required'],
              },
              finalPrice:{
                type: Number,
                default:1,
                required: [true, 'finalPrice of ProductId required'],
            },     
    }],
    couponId: {
      type: Types.ObjectId,
      ref:"Coupon",
    },
    subTotalPrice: {
      type: Number,
      default:1,
      required: [true, 'subTotalPrice of Order required'],
    },
    finalPrice:{
      type: Number,
      default:1,
      required: [true, 'finalPrice of Order required'],
  },
  Paymenttype:{
    type:String,
    default: 'Cash',
    enum:["Cash", "Card"]
  },
  Status:{
    type:String,
    default: 'Placed',
    enum:["WaitPayment", "Placed" ,"Canceled","Rejected","On-way" ,"Deleivered"]
  },
  Reason: {
    type:String,
   },
  },
  {
    timestamps: true,
  }
);


const OrderModel =mongoose.models.Order || model("Order", OrderSchema);
export default OrderModel;