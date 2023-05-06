import joi from "joi";
import { fileValidationGeneral } from "../../middleware/validation.js";



export const createreviewSchema =  joi.object({
  ProductId:fileValidationGeneral.id,
  comment:joi.string().required().min(2).max(1500),
  rating:joi.number().required().min(1).max(5).positive(),
    }).required()


    export const UpdatereviewSchema =  joi.object({
      ProductId:fileValidationGeneral.id,
      reviewId:fileValidationGeneral.id,
      comment:joi.string().min(2).max(1500),
      rating:joi.number().min(1).max(5).positive(),
    }).required()





  