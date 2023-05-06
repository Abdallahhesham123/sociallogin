import joi from "joi";
import { fileValidationGeneral } from "../../middleware/validation.js";

export const headersValidationFirst = joi.object({
  authorization:fileValidationGeneral.headers
}).required();

export const createProductSchema =  joi.object({
name :joi.string().min(2).max(150).required(),
description:joi.string().min(2).max(150000),
size:joi.array(),
colors:joi.array(),
stock:joi.number().integer().positive().min(1).required(),
price:joi.number().positive().min(1).required(),
discount:joi.number().positive().min(1),
categoryId:fileValidationGeneral.id,
subCategoryId:fileValidationGeneral.id,
brandId:fileValidationGeneral.id,
file:joi.object({
  mainImage:joi.array().items(fileValidationGeneral.file.required()).length(1).required(),
  subImages:joi.array().items(fileValidationGeneral.file).min(1).max(5),
}).required()
    }).required()


    export const updateProductSchema =  joi.object({
        ProductId:fileValidationGeneral.id,
        name :joi.string().min(2).max(150),
        description:joi.string().min(2).max(150000),
        size:joi.array(),
        colors:joi.array(),
        stock:joi.number().integer().positive().min(1),
        price:joi.number().positive().min(1),
        discount:joi.number().positive().min(1),
        categoryId:fileValidationGeneral.optional_id,
        subCategoryId:fileValidationGeneral.optional_id,
        brandId:fileValidationGeneral.optional_id,
        file:joi.object({
        mainImage:joi.array().items(fileValidationGeneral.file.required()).max(1),
        subImages:joi.array().items(fileValidationGeneral.file).min(1).max(5),
 
}).required()
    }).required()


    

    export const wishlistSchema = joi.object({
      ProductId:fileValidationGeneral.id,
    }).required();
  