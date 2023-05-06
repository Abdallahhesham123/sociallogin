import {Router} from 'express'
import * as reviewController from  './controller/review.js'
import { AuthUser } from '../../middleware/auth.js';
import { validationNew } from '../../middleware/validation.js';
import { createreviewSchema, UpdatereviewSchema } from './Review.Validate.js';
import { endpoints } from './endPoints.js';

const router = Router({mergeParams:true});




router.post("/" ,AuthUser(endpoints.create),validationNew(createreviewSchema),
reviewController.createReview)




router.put("/:reviewId",AuthUser(endpoints.update),validationNew(UpdatereviewSchema),
reviewController.updateReview)



export default  router