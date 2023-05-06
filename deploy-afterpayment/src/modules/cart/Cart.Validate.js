import joi from "joi";
import { fileValidationGeneral } from "../../middleware/validation.js";



export const createCartSchema =  joi.object({
  ProductId:fileValidationGeneral.id,
  quantity:joi.number().integer().positive(),
    }).required()






  