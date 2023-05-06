import joi from "joi";
import { fileValidationGeneral } from "../../middleware/validation.js";



export const createcouponSchema =  joi.object({

      name: joi.string().min(3).max(25).required().messages({
        "string.empty":"Please fill your username field"
      }),
      amount: joi.number().positive().min(1).max(100).required(),
      expirationDate: joi.date().greater(Date.now()).required(),
      file:fileValidationGeneral.file,

    }).required()


    export const UpdatecouponSchema =  joi.object({
      couponId:fileValidationGeneral.id,
      name: joi.string().min(3).max(25),
      amount: joi.number().positive().min(1).max(100),
      expirationDate: joi.date().greater(Date.now()),
      file:fileValidationGeneral.file,
    }).required()





  