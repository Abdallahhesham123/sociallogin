import slugify from "slugify";
import CouponModel from "../../../../DB/model/Coupon.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import { asyncHandler } from "./../../../utils/errorHandling.js";



export const getCouponModule = asyncHandler(async(req, res, next) => {

    const Coupon = await CouponModel.find()
    return res.status(200).json({Coupon})
})  


export const createCoupon =asyncHandler(async(req, res, next) => {

const{name }=req.body;

if(name){

    if(await CouponModel.findOne({name})){
        return next(new Error(`this name is found in Db please choose another one`),{cause:409})
    }
}
if(req.file){
    const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,{folder: `${process.env.App_Name}/${req.user._id}/coupon` } );
        req.body.image = { secure_url, public_id }
}

req.body.createdBy= req.user._id
req.body.expirationDate = new Date(req.body.expirationDate)
    const coupon = await CouponModel.create(req.body)

return res.status(201).json({message:"coupon created successfully"})
})


export const updateCoupon =asyncHandler(async(req, res, next) => {
    const{name}=req.body;
    const couponFound =await CouponModel.findById(req.params.couponId)
    if(!couponFound) return next(new Error(`coupon not found`),{cause:400})
    if(name){

        if(couponFound.name === name){

            return next(new Error(`Sorry Cannot update coupon With The same Name`),{cause:409})  
    }


        if(await CouponModel.findOne({name})){
            return next(new Error(`this name is found in Db please choose another one`),{cause:409})
        }


         couponFound.name = name;
    }

    if(req.body.expirationDate){

        couponFound.expirationDate = new Date(req.body.expirationDate);
    }
    if(req.body.amount){
        couponFound.amount = req.body.amount;
    }
    if(req.file ){

        const { secure_url, public_id } = await cloudinary.uploader.upload(
            req.file.path,{folder: `${process.env.App_Name}/${req.user._id}/coupon` } );
            if(couponFound.image){
                await cloudinary.uploader.destroy(couponFound.image.public_id)
            }
                    
            couponFound.image = { secure_url, public_id }
    }
    
    couponFound.updatedBy= req.user._id;
    await couponFound.save()

    
    return res.status(200).json({message:"coupon updated successfully" ,couponFound})
    })
    

