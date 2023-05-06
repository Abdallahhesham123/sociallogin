import joi from "joi";
import { fileValidationGeneral } from "../../middleware/validation.js";



export const createsubcategorySchema =  joi.object({
  categoryId:fileValidationGeneral.id,
    name    :     joi.string().min(3).max(25).required().messages({
                 "string.empty":"Please fill your username field"
                    }),
   file     :fileValidationGeneral.file.required(),
      // file: joi.array().
      //items(fileValidationGeneral.file.required()).required(), 
      //if this is array in fileupload
    }).required()


    export const UpdatesubcategorySchema =  joi.object({
      subcategoryId:fileValidationGeneral.id,
      categoryId:fileValidationGeneral.id,
      name: joi.string().min(3).max(25),
      file:fileValidationGeneral.file
      // file: joi.array().
      //items(fileValidationGeneral.file.required()).required(), 
      //if this is array in fileupload
    }).required()





  