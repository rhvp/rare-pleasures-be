const nodemailer = require('nodemailer');

const sendEmail = async options => {
    // 1) Create a transporter
const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: '465',
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  
    // 2) Define the email options
    const mailOptions = {
      from: options.from,
      to: options.email,
      subject: options.subject,
      replyTo: options.replyTo,
      // text: options.message
      html: options.message
    };
  
    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;