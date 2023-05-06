import slugify from "slugify";
import subCategoryModel from "../../../../DB/model/Subcategory.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import { asyncHandler } from "./../../../utils/errorHandling.js";
import CategoryModel from "../../../../DB/model/Category.model.js";
import { nanoid } from "nanoid";



export const getSubCategoryModule = asyncHandler(async(req, res, next) => {

    const subCategories = await subCategoryModel.find().populate([
        {
            path: "categoryId",
        }
    ]);
    return res.status(200).json({subCategories})
})  


export const createSubCategory =asyncHandler(async(req, res, next) => {
    const{categoryId}=req.params;
    // console.log(categoryId);

    if(!await CategoryModel.findById(categoryId)){
        return next(new Error(`InValid category Name`),{cause:409})
    }
const{name}=req.body;

if(name){

    if(await subCategoryModel.findOne({name})){
        return next(new Error(`this name is found in Db please choose another one`),{cause:409})
    }
}
const customId = nanoid()
const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,{folder: `${process.env.App_Name}/${req.user._id}/category/${categoryId}/${customId}` } );

    const subcategory = await subCategoryModel.create({
        name,
        slug:slugify(name ,"-"),
        image:{ secure_url, public_id },
        createdBy:req.user._id,
        categoryId,
        customId
    })

return res.status(201).json({message:"subcategory created successfully"})
})


export const updateSubCategory =asyncHandler(async(req, res, next) => {
    const{categoryId,subcategoryId}=req.params;
    const{name}=req.body;
    const subcategoryFound =await subCategoryModel.findOne ({_id:subcategoryId , categoryId})
    if(!subcategoryFound) return next(new Error(`subcategory not found`),{cause:400})


    if(name){

        if(subcategoryFound.name === name){

            return next(new Error(`Sorry Cannot update subcategory With The same Name`),{cause:409})  
    }


        if(await subCategoryModel.findOne({name})){
            return next(new Error(`this name is found in Db please choose another one`),{cause:409})
        }


         subcategoryFound.name = name;
         subcategoryFound.slug = slugify(name ,"-")
    }
    if(req.file ){

        const { secure_url, public_id } = await cloudinary.uploader.upload(
            req.file.path,{folder: `${process.env.App_Name}/${req.user._id}/category/${categoryId}/${subcategoryFound.customId}` } );

            await cloudinary.uploader.destroy(subcategoryFound.image.public_id)
            subcategoryFound.image = { secure_url, public_id }
    }
    
    subcategoryFound.updatedBy=req.user._id;
    await subcategoryFound.save()

    
    return res.status(200).json({message:"subcategory updated successfully" ,subcategoryFound})
    })
    

