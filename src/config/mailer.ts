const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
export const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: true,
    auth: {
        user: "stassara@sms.com.ar",
        pass: "irzw rxgt yvte snvy",
    },
});

transporter.verify().then(() => {
    console.log("Mailer ya puede enviar correos");
})