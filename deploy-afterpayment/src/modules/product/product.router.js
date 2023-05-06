import {Router} from 'express'
import * as productController from  './controller/product.js'
import { AuthUser, roles } from '../../middleware/auth.js';
import { fileValidation, fileupload } from '../../utils/cloudMulter.js';
import { validationNew } from '../../middleware/validation.js';
import reviewRouter from "./../review/review.router.js"
import {  createProductSchema, headersValidationFirst, updateProductSchema ,wishlistSchema } from './Product.Validate.js';
import { endPoint } from './Product.endpoint.js';
const router = Router();

router.use("/:ProductId/review" ,reviewRouter)

// AuthUser(Object.values(roles)),
router.get("/" ,productController.getProductModule)



router.post("/" ,
validationNew(headersValidationFirst , true),
AuthUser(endPoint.createProduct),
fileupload(fileValidation.image).fields([
    {name:"mainImage" , maxCount: 1},
    {name:"subImages" , maxCount: 5},
])
,validationNew(createProductSchema),
productController.createProduct)



router.put("/:ProductId" ,
AuthUser(endPoint.updateProduct),
fileupload(fileValidation.image).fields([
    {name:"mainImage" , maxCount: 1},
    {name:"subImages" , maxCount: 5},
])
,validationNew(updateProductSchema),
productController.updateProduct)


router.patch("/:ProductId/addwishlist" ,
AuthUser(endPoint.wishlist),
validationNew(wishlistSchema),
productController.addToWishListProductInUser)

router.patch("/:ProductId/removewishlist" ,
AuthUser(endPoint.wishlist),
validationNew(wishlistSchema),
productController.removeFromwishListProductInUser)

export default  router