import slugify from "slugify";
import CategoryModel from "../../../../DB/model/Category.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import { asyncHandler } from "./../../../utils/errorHandling.js";



export const getCategoryModule = asyncHandler(async(req, res, next) => {

    const Categories = await CategoryModel.find().populate([
        {
            path:"subCategoryName"
        }
    ]);
    return res.status(200).json({Categories})
})  


export const createCategory =asyncHandler(async(req, res, next) => {

const{name}=req.body;

if(name){

    if(await CategoryModel.findOne({name})){
        return next(new Error(`this name is found in Db please choose another one`),{cause:409})
    }
}
const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,{folder: `${process.env.App_Name}/${req.user._id}/category` } );

    const category = await CategoryModel.create({
        name,
        slug:slugify(name ,"-"),
        image:{ secure_url, public_id },
        createdBy:req.user._id,
    })

return res.status(201).json({message:"Category created successfully"})
})


export const updateCategory =asyncHandler(async(req, res, next) => {
    const{name}=req.body;
    const categoryFound =await CategoryModel.findById(req.params.categoryId)
    if(!categoryFound) return next(new Error(`Category not found`),{cause:400})


    if(name){

        if(categoryFound.name === name){

            return next(new Error(`Sorry Cannot update Category With The same Name`),{cause:409})  
    }


        if(await CategoryModel.findOne({name})){
            return next(new Error(`this name is found in Db please choose another one`),{cause:409})
        }


         categoryFound.name = name;
         categoryFound.slug = slugify(name ,"-")
    }
    if(req.file ){

        const { secure_url, public_id } = await cloudinary.uploader.upload(
            req.file.path,{folder: `${process.env.App_Name}/${req.user._id}/category` } );

            await cloudinary.uploader.destroy(categoryFound.image.public_id)
            categoryFound.image = { secure_url, public_id }
    }
    
    categoryFound.updatedBy = req.user._id

    await categoryFound.save()

    
    return res.status(200).json({message:"Category updated successfully" ,categoryFound})
    })
    

