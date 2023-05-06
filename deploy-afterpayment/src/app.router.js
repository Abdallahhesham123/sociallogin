import authRouter from './modules/auth/auth.router.js';
import userRouter from './modules/user/user.router.js'
import categoryRouter from './modules/category/category.router.js';
import subcategoryRouter from './modules/subcategory/subcategory.router.js';
import couponRouter from './modules/coupon/coupon.router.js';
import brandRouter from './modules/brand/brand.router.js';
import mongoose from 'mongoose';
import productRouter from './modules/product/product.router.js';
import cartRouter from './modules/cart/cart.router.js';
import orderRouter from './modules/order/order.router.js';
import connectionDb from '../DB/connection.js';
import { globalErrorHandler } from './utils/errorHandling.js';
import cors from "cors";
import  {graphqlHTTP} from 'express-graphql';
import { productSchema } from './modules/product/GraphQl/Schema.js';
const initApp = (app, express) => {
   
    // var whitelist = ['http://localhost:3000', 'http://example2.com']// FELinlks
    // var corsOptions = {
    //     origin: function (origin, callback) {
    //       if (whitelist.indexOf(origin) !== -1) {
    //         callback(null, true)
    //       } else {
    //         callback(new Error('Not allowed by CORS'))
    //       }
    //     }
    //   }

// app.use(async(req,res,next)=>{

//     if(!whitelist.includes(req.header('origin'))){
//         return next(new Error('Sorry, Not allowed by CORS',{status:403}))
//     }

//     for(const origin of whitelist){
//         if(req.header('origin') == origin){
//             await req.header('Access-Control-Allow-Origin', origin)
//             break;
//         }
//     }

   
//     await req.header('Access-Control-Allow-Methods',"*")
//     await req.header('Access-Control-Allow-Headers',"*")
//     await req.header('Access-Control-Allow-Private-Network',"true")
//     console.log('Origin Work');
//     next();

// })

    app.use(cors({}))
    app.use(express.json({}))
    mongoose.set('strictQuery', false)
    connectionDb()


//Handle graphql

app.use(
    '/graphql',
    graphqlHTTP({
      schema:productSchema,
      graphiql: true,
    }),
  );


    app.get('/', (req, res) => res.send('Hello World welcome in my E-commerce App!'))

    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use('/cat', categoryRouter)
    app.use('/subcat', subcategoryRouter)
    app.use('/coupon', couponRouter)
    app.use('/brand', brandRouter)
    app.use('/product', productRouter)
    app.use('/cart', cartRouter)
    app.use('/order', orderRouter)
    app.use("*" , (req,res)=>{
        return res.json({message:"404 Page Not Found"})
    })
    app.use(globalErrorHandler)

}


export default initApp