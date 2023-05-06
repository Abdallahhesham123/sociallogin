import mongoose, { Schema, model, Types } from "mongoose";
const CouponSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Coupon required'],
      unique: [true, 'Coupon must be unique'],
      lowercase: true,
    },

    image: {
        type: Object,
        default:{}
    },
    amount :{
      type:Number,
      default:1
    },
    usedBy:[{
      type:Types.ObjectId,
      ref:"User",
    }],
    expirationDate:{
      type:Date,
      required:true
    },
    createdBy:{
      type:Types.ObjectId ,
      ref:"User",
      required:true
      
    },
    updatedBy:{
      type:Types.ObjectId ,
      ref:"User",
    }
  },
  {
    timestamps: true,
  }
);


const CouponModel =mongoose.models.Coupon || model("Coupon", CouponSchema);
export default CouponModel;