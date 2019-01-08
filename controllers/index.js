const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var stripe = require("stripe")("sk_test_CKhY3B72JlPjNAM0S8MmQscw");


// // create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//     service: 'gmail', // true for 465, false for other ports
//     auth: {
//         user: process.env.USER_EMAIL, // generated ethereal user
//         pass: process.env.USER_PASSWORD // generated ethereal password
//     }
// });
// read into mongoose methods.
router.get('/', (req,res) => {
    res.render("index");
});

router.post('/notify', (req,res) => {
    const email = req.body.email;
    SendGrid.sendWebsiteAcceptanceEmail(email);
    res.redirect('/');
});

router.post('/donate', (req,res) => {
    const token = req.body.stripeToken; // Using Express
    console.log("req.body:", req.body);
    
    const charge = stripe.charges.create({
        amount: 10,
        currency: 'usd',
        description: 'Tech Made charge',
        source: token,
    })
    console.log("charge successful.");
})

module.exports = router;