const hb = require('express-handlebars').create();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (function() {
    function sendPrelaunchSignupEmail(email) {
        return new Promise(function(resolve,reject) { 
            hb.render('views/emails/signup.hbs', {email} ).then(html => {
                sgMail.send({
                    to: email,
                    from: `"Until After 👻" <asimzaidih@gmail.com>`,
                    subject: 'Thanks for Signing up for Until After ✔',
                    html: html
                });
            });
        });
    }
    return {
        sendPrelaunchSignupEmail: sendPrelaunchSignupEmail
    }

})();