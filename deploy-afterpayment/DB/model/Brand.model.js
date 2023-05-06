import mongoose, { Schema, model, Types } from "mongoose";
const BrandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand required'],
      unique: [true, 'Brand must be unique'],
      lowercase: true,
    },
    image: {
        type: Object,
        required: [true, 'Brand required'],
        default:{}
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


const BrandModel =mongoose.models.Brand || model("Brand", BrandSchema);
export default BrandModel;