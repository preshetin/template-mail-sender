'use strict';
const nodemailer = require('nodemailer');
const config = require('config');
const templateFiller = require('./template-filler');
const receivers = require('./var/receivers.json');


let smtpConfig = {
    host: config.get('mail.settings.host'),
    port: config.get('mail.settings.port'),
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: config.get('mail.settings.user'),
        pass: config.get('mail.settings.pass')
    }
};

let transporter = nodemailer.createTransport(smtpConfig);

let mailOptions = {
    from: config.get('mail.from'),
    subject: templateFiller.subject,
};

receivers.forEach(receiver => {
  mailOptions.to = receiver.email;
  mailOptions.html = templateFiller.prepareHtml(receiver.name);
  mailOptions.text = templateFiller.prepareText(receiver.name);

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
  });
});
