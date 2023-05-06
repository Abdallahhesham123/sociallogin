
import OrderModel from "../../../../DB/model/Order.model.js";
import ReviewModel from "../../../../DB/model/Review.model.js";
import { asyncHandler } from "./../../../utils/errorHandling.js";





export const createReview =asyncHandler(async(req, res, next) => {

const{ProductId }=req.params;

const{comment , rating }=req.body;
const orderFound = await OrderModel.findOne({
    userId:req.user._id,
    Status:"Deleivered",
    "Products.ProductId":ProductId

})

if(!orderFound){
    return next(new Error(`Can not review product  Before recievied`),{cause:404})
}

const checkReview= await ReviewModel.findOne({
    createdBy:req.user._id 
    ,ProductId,
    orderId:orderFound._id
})

if(checkReview){
    return next(new Error(`Sorry , Already This product review by you before`),{cause:404})
}


    const review = await ReviewModel.create({
        comment,
        rating,
        createdBy:req.user._id,
        ProductId,
        orderId:orderFound._id
    })

return res.status(201).json({message:"review created successfully",review})
})


export const updateReview =asyncHandler(async(req, res, next) => {

    const{ProductId ,reviewId }=req.params;

      await ReviewModel.updateOne({_id:reviewId , ProductId},req.body)
    return res.status(200).json({message:"review updated successfully" })
    })
    

