import {Router} from 'express'
import { fileValidation, fileupload } from '../../utils/cloudMulter.js';
import * as couponController from  './controller/coupon.js'
import { AuthUser, roles } from '../../middleware/auth.js';
import { validationNew } from '../../middleware/validation.js';
import { UpdatecouponSchema, createcouponSchema } from './Coupon.Validate.js';
import { endpoints } from './endPoints.js';

const router = Router();

router.get("/" ,AuthUser(Object.values(roles)), couponController.getCouponModule)


router.post("/" ,fileupload(fileValidation.image).single("image") 
,AuthUser(endpoints.createCoupon),
validationNew(createcouponSchema),
couponController.createCoupon)




router.put("/:couponId" ,fileupload(fileValidation.image).single("image") 
,AuthUser(endpoints.updateCoupon),
validationNew(UpdatecouponSchema),
couponController.updateCoupon)



export default  router