const express = require('express');
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');
// const stripe = require('stripe')('pk_live_AUzulzbWhPDJgwGRez3gHcBB00oJ5lfR7v');
// const uuid = require('uuid/v4');
const PORT = process.env.PORT;
const UNAME = process.env.UNAME;
const PWORD = process.env.PWORD;
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { Consultation } = require('./templates/consultation');

const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


server.post('/checkout', async (req, res) => {
    // console.log("Req: ", req.body);
    // let status = "";
    // let err = "";

    // try {
    //     const { product, token } = req.body;
    //     const customer = await stripe.customers.create({
    //         email: token.email,
    //         source: token.id
    //     });

    //     const idempotency_key = uuid();
    //     const charge = await stripe.charges.create({
    //         amount: product.price * 100,
    //         currency: "usd",
    //         customer: customer.id,
    //         receipt_email: token.email,
    //         description: `Pruchased the ${product.shoot}`,
    //     }, { idempotency_key });
        
    //     console.log("Charge: ", { charge });
    //     status = "success"
    // } catch (err) {
    //     console.log("Error: ", err)
    //     status = "error"
    // }
    // res.json({ err, status });
});

server.post('/api/send', (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: UNAME,
            pass: PWORD
        }
    });

    function MailTo(photographer, video) {
        // if (video === 'yes') return ['casey@alphavnw.com', 'tocatchfilms@gmail.com']
        if (photographer === 'casey') return ['casey@alphavnw.com', 'yurlovandrew@gmail.com'];
        if (photographer === 'bryan') return ['bryan@alphavnw.com', 'casey@alphavnw.com'];
        if (photographer === 'chris') return ['chris@alphavnw.com', 'casey@alphavnw.com'];
        if (photographer === 'jonny') return ['jonny@alphavnw.com',  'casey@alphavnw.com'];

        // if (photographer === 'bryan' && video === 'yes') return ['bryan@alphavnw.com', 'casey@alphavnw.com', 'tocatchfilms@gmail.com'];
        // if (photographer === 'chris' && video === 'yes') return ['chris@alphavnw.com', 'casey@alphavnw.com', 'tocatchfilms@gmail.com'];
        // if (photographer === 'jonny' && video === 'yes') return ['jonny@alphavnw.com',  'casey@alphavnw.com', 'tocatchfilms@gmail.com'];

    }

    let mailOptions = {
        from: `${req.body.email}`,
        to: MailTo(req.body.photographer),
        subject: 'Photoshoot Request',
        html: Consultation(req.body),
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return console.log(err)
        else return info.messageId
    });
});

server.listen(PORT , () => {
    console.log("Listening on port ", PORT);
});



