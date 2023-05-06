import joi from "joi";
import { fileValidationGeneral } from "../../middleware/validation.js";



export const createbrandSchema =  joi.object({

      name: joi.string().min(3).max(25).required().messages({
        "string.empty":"Please fill your username field"
      }),
      file:fileValidationGeneral.file.required(),
    }).required()


    export const UpdatebrandSchema =  joi.object({
      brandId:fileValidationGeneral.id,
      name: joi.string().min(3).max(25),
      file:fileValidationGeneral.file,
    }).required()





  