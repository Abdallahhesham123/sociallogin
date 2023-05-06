import {Router} from 'express'
import { fileValidation, fileupload } from '../../utils/cloudMulter.js';
import * as brandController from  './controller/brand.js'
import { AuthUser, roles } from '../../middleware/auth.js';
import { validationNew } from '../../middleware/validation.js';
import { createbrandSchema, UpdatebrandSchema } from './Brand.Validate.js';
import { endpoints } from './endPoints.js';

const router = Router();

router.get("/" , AuthUser(Object.values(roles)),brandController.getbrandModule)


router.post("/" ,fileupload(fileValidation.image).single("image") 
,AuthUser(endpoints.createBrand),
validationNew(createbrandSchema),
brandController.createBrand)




router.put("/:brandId" ,fileupload(fileValidation.image).single("image") 
,AuthUser(endpoints.updateBrand),
validationNew(UpdatebrandSchema),
brandController.updateBrand)



export default  router