import {Router} from 'express'
import { fileValidation, fileupload } from '../../utils/cloudMulter.js';
import * as SubcCategoryController from  './controller/subcategory.js'
import { AuthUser, roles } from '../../middleware/auth.js';
import { validationNew } from '../../middleware/validation.js';
import { UpdatesubcategorySchema, createsubcategorySchema } from './SubCategory.Validate.js';
import { endpoints } from './endPoints.js';
const router = Router({mergeParams:true});


router.get("/" , AuthUser(Object.values(roles)),SubcCategoryController.getSubCategoryModule)


router.post("/" ,
fileupload(fileValidation.image).single("image") 
,AuthUser(endpoints.createSubCat),
validationNew(createsubcategorySchema),
SubcCategoryController.createSubCategory)




router.put("/:subcategoryId" ,fileupload(fileValidation.image).single("image") 
,AuthUser(endpoints.updateSubCat),
validationNew(UpdatesubcategorySchema),
SubcCategoryController.updateSubCategory)



export default  router