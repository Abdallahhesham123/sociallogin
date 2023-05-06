import mongoose, { Schema, model, Types } from "mongoose";
const productSchema = new Schema(
  {
    customId:String,
    name: {
      type: String,
      required: [true, "Product is required"],
      trim: true,
      lowercase: true,
    },
    slug: {
      type: String,
      required: [true, "Product Slug is required"],
      trim: true,
      lowercase: true,
    },
    description: String,
    stock: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      default: 1,
    },
    discount: {
      type: Number,
      default: 0,
    },
    finalPrice: {
      type: Number,
      default: 1,
    },
    colors: [String],
    size: {
      type: [String],
      enum: ["s", "m", "lg", "xl"],
    },
    mainImage: {
      type: Object,
      required: true,
    },
    subImages: {
      type: [Object],
    },
    categoryId:{
      type:Types.ObjectId,
      ref:"Category",
      required: true,
    },
    subCategoryId:{
      type:Types.ObjectId,
      ref:"subCategory",
      required: true,
    },
    brandId:{
      type:Types.ObjectId,
      ref:"Brand",
      required: true,
    },
    createdBy:{
      type:Types.ObjectId,
      ref:"User",
      required: true,
    },
    updatedBy:{
      type:Types.ObjectId,
      ref:"User",
      
    },
    wishUserlist:[{ // to product out of stock he wants to by in another time
      type:Types.ObjectId,
      ref:"User",
    }],
   isDeleted:{
      type:Boolean,
      default:false
  }, 
  },

  {
    toJSON:{ virtuals: true },
    toObject:{ virtuals: true},
    timestamps: true,
  }
);


productSchema.virtual("review",{

  ref: 'Review',
  localField: '_id',
  foreignField: 'ProductId'
})
const ProductModel = mongoose.models.Product || model("Product", productSchema);
export default ProductModel;
