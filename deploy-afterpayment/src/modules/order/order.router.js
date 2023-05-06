import {Router} from 'express'
import * as orderController from  './controller/order.js'
import { AuthUser} from '../../middleware/auth.js';
import { validationNew } from '../../middleware/validation.js';
import {  createOrderSchema ,cancelOrderSchema ,deleveredOrderSchema ,onwayOrderSchema ,rejectedOrderSchema} from './Order.Validate.js';
import { endPoint } from './order.endpoint.js';
const router = Router();





router.post("/" ,AuthUser(endPoint.create),
validationNew(createOrderSchema),
orderController.createOrder)

router.patch("/cancel/:orderId" ,AuthUser(endPoint.cancel),
validationNew(cancelOrderSchema),
orderController.cancelOrder)

router.patch("/delevered/:orderId" ,AuthUser(endPoint.delevered),
validationNew(deleveredOrderSchema),
orderController.deleveredOrder)

router.patch("/onWay/:orderId" ,AuthUser(endPoint.onway),
validationNew(onwayOrderSchema),
orderController.onWayOrder)

router.patch("/rejectedOrder/:orderId" ,AuthUser(endPoint.rejected),
validationNew(rejectedOrderSchema),
orderController.rejectedOrder)


export default  router