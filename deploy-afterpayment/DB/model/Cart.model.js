import mongoose, { Schema, model, Types } from "mongoose";
const CartSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref:"User",
      required: [true, 'Cart required'],
      unique: [true, 'Cart must be unique']
    },
    Products: [{
                ProductId:{
                  type: Types.ObjectId,
                  ref:"Product",
                  required: [true, 'ProductId required'],
                },
                quantity:{
                    type: Number,
                    default:1,
                    required: [true, 'quantity of ProductId required'],
                }
    }]

  },
  {
    timestamps: true,
  }
);


const CartModel =mongoose.models.Cart || model("Cart", CartSchema);
export default CartModel;