import slugify from "slugify";
import BrandModel from "../../../../DB/model/Brand.model.js";
import ProductModel from "../../../../DB/model/Product.model.js";
import subCategoryModel from "../../../../DB/model/Subcategory.model.js";
import { nanoid } from "nanoid";
import { asyncHandler } from "../../../utils/errorHandling.js";
import cloudinary from "../../../utils/cloudinary.js";
import userModel from "../../../../DB/model/User.model.js";
import { paginate } from "../../../utils/Paginate.js";
import ApiFeatures from "../../../utils/ApiFeatures.js";

export const getProductModule = asyncHandler(async (req, res, next) => {



  const apiFeatures= new ApiFeatures(ProductModel.find().populate([
        {
          path:"review"
        },{
          path:"categoryId",
          ref:"Category"
        }
      ]), req.query).paginate().filter().sort().search().select()


  const Products = await apiFeatures.MongooseQuery
  for (let i = 0; i < Products.length; i++) {
    let CalcReview = 0 ;
      for (let j = 0; j < Products[i].review.length; j++) {
          
        CalcReview += Products[i].review[j].rating;

         }
   
         let Averagerating = CalcReview/Products[i].review.length;
         const ConvObjectproduct = Products[i].toObject();
         ConvObjectproduct.Averagerating =Averagerating
         Products[i]=ConvObjectproduct  
  }
  return res.status(200).json({ Products });
});

export const createProduct = asyncHandler(async (req, res, next) => {
  const { name, categoryId, subCategoryId, brandId, discount, price } =
    req.body;

  if (!(await subCategoryModel.findOne({ _id: subCategoryId, categoryId }))) {
    return next(new Error(`In Valid category Or subCategoryId`), {
      cause: 400,
    });
  }

  if (!(await BrandModel.findOne({ _id: brandId }))) {
    return next(new Error(`In Valid BrandId`), { cause: 400 });
  }
  req.body.slug = slugify(name, {
    replacement: "_",
    trim: true,
    lower: true,
  });

  req.body.finalPrice = Number.parseFloat(
    price - price * ((discount || 0) / 100)
  ).toFixed(2);
  req.body.customId = nanoid();
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.files.mainImage[0].path,
    { folder: `${process.env.App_Name}/${req.body.customId}/Product` }
  );
  req.body.mainImage = { secure_url, public_id };
  if (req.files.subImages) {
    req.body.subImages = [];
    for (const file of req.files.subImages) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        file.path,
        { folder: `${process.env.App_Name}/${req.body.customId}/Product/subImages` }
      );
      req.body.subImages.push({ secure_url, public_id });
    }
  }
  req.body.createdBy = req.user._id;
  const Product = await ProductModel.create(req.body);

  if (!Product) {
    return next(new Error(`Fail to create this Products`), { cause: 400 });
  }

  return res
    .status(201)
    .json({ message: "Product created successfully", Product });
});



export const updateProduct = asyncHandler(async (req, res, next) => {
//checkproduct Exists
const {ProductId} = req.params;
const ProductFound =await ProductModel.findById(ProductId);
if(!ProductFound){
  return next(new Error(`In-Valid ProductId`), {
    cause: 400,
  });
}
// Destruct Main Properity
  const { name, categoryId, subCategoryId, brandId, discount, price } =
    req.body;
//check category brand subcategory
    if(categoryId && subCategoryId){

      if (!(await subCategoryModel.findOne({ _id: subCategoryId, categoryId }))) {
        return next(new Error(`In Valid category Or subCategoryId`), {
          cause: 400,
        });
      }
    }
if(brandId){
  if (!(await BrandModel.findOne({ _id: brandId }))) {
    return next(new Error(`In Valid BrandId`), { cause: 400 });
  }

}

//update slug
if(name){

  req.body.slug = slugify(name, {
    replacement: "_",
    trim: true,
    lower: true,
  });
}

//update Price

if(price && discount ){

  req.body.finalPrice = Number.parseFloat(
    price - price * ((discount) / 100)
  ).toFixed(2);
}else if(price){

  req.body.finalPrice = Number.parseFloat(
    price - price * ((ProductFound.discount) / 100)
  ).toFixed(2);
}else if(discount){

  req.body.finalPrice = Number.parseFloat(
    ProductFound.price - ProductFound.price * ((discount) / 100)
  ).toFixed(2);
}


 if(req.files?.mainImage?.length){
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.files.mainImage[0].path,
    { folder: `${process.env.App_Name}/${ProductFound.customId}/Product` }
  );
  await cloudinary.uploader.destroy(ProductFound.mainImage.public_id)
  req.body.mainImage = { secure_url, public_id };

 }

  if (req.files?.subImages?.length) {
    for (const filedeleted of ProductFound.subImages) {
      await cloudinary.uploader.destroy(filedeleted.public_id)
    }

    req.body.subImages = [];
    for (const file of req.files.subImages) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        file.path,
        { folder: `${process.env.App_Name}/${ProductFound.customId}/Product/subImages` }
      );
      req.body.subImages.push({ secure_url, public_id });
    }
  }
  req.body.updatedBy = req.user._id;
  const ProductUpdated = await ProductModel.updateOne({_id:ProductFound._id},req.body,{new:true});

  if (!ProductUpdated) {
    return next(new Error(`Fail to update this Products`), { cause: 400 });
  }

  return res
    .status(201)
    .json({ message: "Product updated successfully", ProductUpdated });
});
//addToWishListProductInUserModel
export const addToWishListProductInUser = asyncHandler(async (req, res, next) => {
  //checkproduct Exists
  const {ProductId} = req.params;
  const ProductFound =await ProductModel.findById(ProductId).populate([
    {
      path:"review"
    }
  ]);
  if(!ProductFound){
    return next(new Error(`In-Valid ProductId`), {
      cause: 400,
    });
  }


    const userUpdated = await userModel.updateOne({_id:req.user._id},{$addToSet:{wishUserlist:ProductId}});
    return res
      .status(201)
      .json({ message: "Product added To wishlist successfully", userUpdated });
  });
  
  
//RemoveFromWishListProductInUserModel
export const removeFromwishListProductInUser = asyncHandler(async (req, res, next) => {
  //checkproduct Exists
  const {ProductId} = req.params;



    const userUpdated = await userModel.updateOne({_id:req.user._id},{$pull:{wishUserlist:ProductId}});
    return res
      .status(201)
      .json({ message: "Product removed From wishlist successfully", userUpdated });
  });




