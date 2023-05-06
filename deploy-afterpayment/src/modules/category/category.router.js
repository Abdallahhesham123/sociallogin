import {Router} from 'express'
import { fileValidation, fileupload } from '../../utils/cloudMulter.js';
import * as categoryController from  './controller/category.js'
import { AuthUser, roles } from '../../middleware/auth.js';
import { validationNew } from '../../middleware/validation.js';
import { UpdateCategorySchema, createCategorySchema } from './Category.Validate.js';
import subcategoryRouter from "./../subcategory/subcategory.router.js"
import { endPoint } from './category.endpoint.js';
const router = Router();
// console.log("asd",Object.values(roles));
router.use("/:categoryId/subcategory" ,subcategoryRouter)
//AuthUser(Object.values(roles)),
router.get("/" , categoryController.getCategoryModule) 
//for any one to login


router.post("/" ,fileupload(fileValidation.image).single("image") 
,AuthUser(endPoint.create),
validationNew(createCategorySchema),
categoryController.createCategory)




router.put("/:categoryId" ,fileupload(fileValidation.image).single("image") 
,AuthUser(endPoint.update),
validationNew(UpdateCategorySchema),
categoryController.updateCategory)



export default  router