import joi from "joi";
import { fileValidationGeneral } from "../../middleware/validation.js";



export const createOrderSchema =  joi.object({

    note:joi.string().min(1),
    address:joi.string().min(1).required(),
    phone:joi.array().items(joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/))
                                      .required()).min(1).max(3).required(),
    couponName:joi.string(),
    Paymenttype:joi.string().valid("Cash","Card"),
    Products:joi.array().items(
        joi.object({
            ProductId :fileValidationGeneral.id,
            quantity :joi.number().positive().integer().min(1).required(),
        }).required()
    ).min(1)
    }).required()

 export const cancelOrderSchema =  joi.object({

        reasons:joi.string().min(1).required(),
        orderId:fileValidationGeneral.id
        }).required()
    
 export const deleveredOrderSchema =  joi.object({
            orderId:fileValidationGeneral.id
            }).required()

  export const onwayOrderSchema =  joi.object({
                orderId:fileValidationGeneral.id
                }).required()

  export const   rejectedOrderSchema =  joi.object({
                    address:joi.string().min(1),
                    phone:joi.array().items(joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/))
                                                      .required()).min(1).max(3),
                    orderId:fileValidationGeneral.id
                    }).required()
              
  
            