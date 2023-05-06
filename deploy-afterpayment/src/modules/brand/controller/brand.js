import slugify from "slugify";
import BrandModel from "../../../../DB/model/Brand.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import { asyncHandler } from "./../../../utils/errorHandling.js";



export const getbrandModule = asyncHandler(async(req, res, next) => {

    const brand = await BrandModel.find()
    return res.status(200).json({brand})
})  


export const createBrand =asyncHandler(async(req, res, next) => {

const{name }=req.body;

if(name){

    if(await BrandModel.findOne({name})){
        return next(new Error(`this name is found in Db please choose another one`),{cause:409})
    }
}

    const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,{folder: `${process.env.App_Name}/${req.user._id}/brand` } );
        req.body.image = { secure_url, public_id }

req.body.createdBy= req.user._id

    const brand = await BrandModel.create(req.body)

return res.status(201).json({message:"brand created successfully",brand})
})


export const updateBrand =asyncHandler(async(req, res, next) => {
    const{name}=req.body;
    const brandFound =await BrandModel.findById(req.params.brandId)
    if(!brandFound) return next(new Error(`brand not found`),{cause:400})
    if(name){

        if(brandFound.name === name){

            return next(new Error(`Sorry Cannot update brand With The same Name`),{cause:409})  
    }


        if(await BrandModel.findOne({name})){
            return next(new Error(`this name is found in Db please choose another one`),{cause:409})
        }


         brandFound.name = name;
    }
    if(req.file){

        const { secure_url, public_id } = await cloudinary.uploader.upload(
            req.file.path,{folder: `${process.env.App_Name}/${req.user._id}/brand` } );
                await cloudinary.uploader.destroy(brandFound.image.public_id)    
            brandFound.image = { secure_url, public_id }
    }

    brandFound.updatedBy= req.user._id
    

    await brandFound.save()

    
    return res.status(200).json({message:"brand updated successfully" ,brandFound})
    })
    

