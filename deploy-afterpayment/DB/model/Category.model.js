import mongoose, { Schema, model, Types } from "mongoose";
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      // index: true,
      required: [true, 'Category required'],
      unique: [true, 'Category must be unique'],
      minlength: [3, 'Too short category name'],
      maxlength: [25, 'Too long category name'],
      lowercase: true,
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
      
    },
    updatedBy:{
      type:Types.ObjectId ,
      ref:"User",
      
    }
  },
  {
    toJSON:{ virtuals: true },
    toObject:{ virtuals: true},
    timestamps: true,
  }
);

CategorySchema.virtual("subCategoryName",{

  ref: 'subCategory',
  localField: '_id',
  foreignField: 'categoryId',
  justOne: true
})

const CategoryModel =mongoose.models.Category || model("Category", CategorySchema);
export default CategoryModel;