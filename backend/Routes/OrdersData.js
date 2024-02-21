import express from 'express';
const router = express.Router();

import Order from '../models/Orders.js';
import stripe from 'stripe';




router.post('/create-checkout-session', async (req, res) => {
    try {
        const params = {
            submit_type: 'pay',
            mode: "payment",
            payment_method_types: ['card'],
            billing_address_collection: "auto",

            line_items: req.body[0].product.map((item) => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.Pname,
                        },
                        unit_amount: item.price * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.qty
                }
            }),

            success_url: `${process.env.YOUR_DOMAIN}/success`,
            cancel_url: `${process.env.YOUR_DOMAIN}/cancel`,
        }

        try {
            const session = await stripe(process.env.STRIPE_SECRET_KEY).checkout.sessions.create(params);
            console.log(session);
            let data = req.body[1]
            await data.order_data.splice(0, 0, { Order_date: req.body[1].order_date })
    
            let eId = await Order.findOne({ 'email': req.body[1].email })
    
        
    
            if (eId === null) {
                await Order.create({
                    email: data.email,
                    order_data: [data.order_data]
                });
            } else {
                await Order.findOneAndUpdate(
                    { email: data.email },
                    { $push: { order_data: data.order_data } }
                );
            }
            res.status(200).json({ success: true, sessionId: session.id });

        } catch (error) {
            res.status(err.statusCode || 500).json({ error: err.message });
            
        }
       
      

      
    } 
    catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message });
    }
});

router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});


export default router;







