const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var stripe = require("stripe")("sk_test_CKhY3B72JlPjNAM0S8MmQscw");
const SendGrid = require('./sendGrid');


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
    console.log("email:", email);
    
    SendGrid.sendPrelaunchSignupEmail(email);
    res.redirect('/');
});

router.post('/donate', (req,res) => {
    console.log("in donate route");
    
    const token = req.body.stripeToken; // Using Express
    const donationAmount = req.body.donationAmount;
    console.log("donationAmount:", donationAmount);    
    console.log("req.body:", req.body);
    
    const charge = stripe.charges.create({
        amount: donationAmount*100,
        currency: 'usd',
        description: 'Until After charge',
        source: token,
    })
    console.log("charge successful.");
    res.redirect('/');
})

module.exports = router;