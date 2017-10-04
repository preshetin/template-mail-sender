'use strict';
const nodemailer = require('nodemailer');
const config = require('config');


let smtpConfig = {
    host: config.get('mail.host'),
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: config.get('mail.user'),
        pass: config.get('mail.pass')
    }
};

let transporter = nodemailer.createTransport(smtpConfig);

// setup email data with unicode symbols
let mailOptions = {
    from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
    to: 'p.reshetin@gotorussia.com', // list of receivers
    subject: '2222 Hey from Petya ✔', // Subject line
    text: 'Hey?', // plain text body
    html: '<b>Hey?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});
