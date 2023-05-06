import {Router} from 'express'
import * as userController from  './controller/user.js'
import { AuthUser, roles } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import {  updateSchema ,headersSchema } from "./crudValidationuser.js";
import { fileupload, fileValidation } from '../../utils/cloudMulter.js';
const router = Router();

router.get("/" ,AuthUser([roles.user]), userController.getUser)
router.get("/getProfile" ,  AuthUser([roles.user]),userController.getProfile)

//update user
router.
put("/findByIdAndUpdate"
 ,fileupload(fileValidation.image)
 .single("image")
,validation(updateSchema),
 AuthUser([roles.user]),userController.findByIdAndUpdate)

//delete user
router.delete("/findOneAndDelete" ,
 validation(headersSchema),AuthUser([roles.user]),
  userController.findOneAndDelete)
//soft-delete
router.put("/softDelete" , AuthUser([roles.user]),userController.softDelete)
router.put("/restoretodatabase" , AuthUser([roles.admin]),userController.restoretodatabase)





export default  router