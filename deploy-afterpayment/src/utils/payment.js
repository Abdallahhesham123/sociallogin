import Stripe from "stripe";
import dotenv from 'dotenv'
dotenv.config()
 async function payment({
    stripe = new Stripe(process.env.STRIPE_KEY),
    payment_method_types=['card'],
    mode='payment',
    cancel_url,
    success_url = process.env.SUCCESS_URL,
    customer_email,
    line_items=[],
    discounts=[],
    metadata={},

}={}){

    const session = await stripe.checkout.sessions.create({

        payment_method_types,
        mode,
        cancel_url,
        success_url,
        customer_email,
        line_items,
        discounts,
        metadata,
    })
 return session
}


export default payment