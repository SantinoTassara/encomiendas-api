const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "santinotassaraar@gmail.com",
        pass: "phis vavj oqie prsd",
    },
});

transporter.verify().then(() => {
    console.log("Mailer ya puede enviar correos");
})