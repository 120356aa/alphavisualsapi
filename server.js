const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const stripe = require('stripe')('pk_live_AUzulzbWhPDJgwGRez3gHcBB00oJ5lfR7v');
const uuid = require('uuid/v4');
const PORT = 5000;

require('dotenv').config();

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.post('/checkout', async (req, res) => {
    console.log("Req: ", req.body);
    let status = "";
    let err = "";

    try {
        const { product, token } = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const idempotency_key = uuid();
        const charge = await stripe.charges.create({
            amount: product.price * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `Pruchased the ${product.shoot}`,
        }, { idempotency_key });
        
        console.log("Charge: ", { charge });
        status = "success"
    } catch (err) {
        console.log("Error: ", err)
        status = "error"
    }
    res.json({ err, status });
});

server.listen(PORT , () => {
    console.log("Listening on port ", PORT);
});



