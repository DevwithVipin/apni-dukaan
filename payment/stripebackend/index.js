const cors = require('cors');
const express = require('express');
// Replace with your secret key
const app = express();
const uuid = require('uuid');
app.use(express.json());
app.use(cors());
require('dotenv').config();


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)



app.post('/payment', async (req, res) => {
    try {
        const { amount } = req.body
        if (amount === 0) {
            return res.json('No items to order')
        }
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount*100,
            currency: 'INR',
            payment_method_types: ['card'],
        });
        if (paymentIntent.client_secret) {
            res.json(paymentIntent)
        }
    } catch (error) {
        res.status(401).json(error);
    }
})
app.get('/', (req, res) => {
    res.send('It works on this port');
});


app.listen(8282, () => console.log('Listening at port 8282'));
