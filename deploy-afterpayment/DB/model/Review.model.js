import mongoose, { Schema, model, Types } from "mongoose";
const reviewSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, 'review Comment required'],

    },
    rating: {
        type: Number,
        required: [true, 'rating product  required'],
        min: 1,
        max: 5
       
    },
    createdBy:{
      type:Types.ObjectId ,
      ref:"User",
      required:true
      
    },
    ProductId:{
      type:Types.ObjectId ,
      ref:"Product",
      required:true
      
    },
    orderId:{
      type:Types.ObjectId ,
      ref:"Order",
      required:true
      
    }
  },
  {
    timestamps: true,
  }
);


const ReviewModel =mongoose.models.Review || model("Review", reviewSchema);
export default ReviewModel;