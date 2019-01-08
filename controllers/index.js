const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const Event = require('../models/event');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
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

router.post('/subscribe', (req,res) => {
    // setup email data with unicode symbols
    const name = req.body.name +" " + req.body.surname;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;

    // using SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    const msg = {
    to: 'asimzaidih@gmail.com',
    from: `"${name} 👻" <${email}>`,
    subject: 'DJ Iggy Contact Form ✔',
    text: message,
    html: `<p>${message}</p>
        <p><u>Contact Number: ${phone}</u></p>`,
    };
    sgMail.send(msg);
    console.log("sent msg: ", msg);
    
    successMsg = "Thanks for contacting DJ Iggy. I'll get back to you soon!"
    res.render('contact', {successMsg})
});

module.exports = router;