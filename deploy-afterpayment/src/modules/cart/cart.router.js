import {Router} from 'express'
import * as CartController from  './controller/cart.js'
import { AuthUser, roles } from '../../middleware/auth.js';
import { validationNew } from '../../middleware/validation.js';
import {  createCartSchema } from './Cart.Validate.js';
import { endPoint } from './cart.endpoint.js';
const router = Router();

router.get("/" ,AuthUser(Object.values(roles)), CartController.getCartModule) 
router.post("/" ,AuthUser(endPoint.create),
validationNew(createCartSchema),
CartController.createCart)

//to delete item from cart
router.patch("/deleteItem" ,AuthUser(endPoint.create),
CartController.deleteItems)


//to delete item from cart
router.patch("/clear" ,AuthUser(endPoint.create),
CartController.clearCart)


export default  router