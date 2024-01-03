const nodemailer = require('nodemailer');
const receiver = "rubasheka@gmail.com";

send = (mailAddr,mailPass,message) =>
{
    console.log("зашли");
    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: false,
        service: 'mail.ru',
        auth: {
            user: mailAddr,
            pass: mailPass
        }
    });

    const mailOptions = {
        from: mailAddr,
        to: receiver,
        subject: 'Module m06-03RAA',
        text: message
    };

    transporter.sendMail(mailOptions, (err, info) => {
        err ? console.log(err) : console.log('Sent: ' + info.response);
    });
}

module.exports = send;