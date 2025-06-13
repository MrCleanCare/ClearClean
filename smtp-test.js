const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtppro.zoho.sa',
  port: 465,
  secure: true,
  auth: {
    user: 'info@masterclean-care.com',
    pass: 'beSm@rt100',
  },
});

transporter.sendMail({
  from: 'info@masterclean-care.com',
  to: 'info@masterclean-care.com',
  subject: 'SMTP Test Email',
  text: 'This is a test email sent from Node.js using Zoho SMTP.',
}, (err, info) => {
  if (err) {
    return console.error('Error:', err);
  }
  console.log('Email sent:', info.response);
}); 