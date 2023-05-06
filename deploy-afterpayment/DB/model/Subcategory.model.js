import mongoose, { Schema, model, Types } from "mongoose";
const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'subCategory required'],
      unique: [true, 'subCategory must be unique'],
      minlength: [3, 'Too short subCategory name'],
      maxlength: [25, 'Too long subCategory name'],
    },
    slug: {
      type: String,
      lowercase: true,
      required:true
    },
    image: {
        type: Object,
        required:true,
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
      
    },
    categoryId:{
      type:Types.ObjectId ,
      ref:"Category",
      required:[true, 'subCategory Id required']
      
    },
    customId:{
      type:String,
      required: [true, 'subCategory Custom Id required'],
    }
  },
  {
    timestamps: true,
  }
);

const subCategoryModel =mongoose.models.subCategory || model("subCategory", subCategorySchema);
export default subCategoryModel;