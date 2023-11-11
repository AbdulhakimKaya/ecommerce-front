import mongooseConnect from "@/lib/mongoose";
import {buffer} from "micro";
const stripe = require('stripe')(process.env.STRIPE_SK)


const endpointSecret = "whsec_03774d85c7871ab81ae9ba59c127f60550dd164cc9c5b5f44325307c602d496a";

export default async function handle(req, res) {
    await mongooseConnect()

    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const data = event.data.object;
            const orderId = data.metaData.orderId
            const paid = data.payment_status === 'paid'
            if (orderId && paid) {
                await Order.findByIdAndUpdate(orderId, {paid: true})
            }
            console.log(data)
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).send('ok')
}

export const config = {
    api: {bodyParser: false,}
}