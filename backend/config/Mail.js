import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

transporter.verify().then(() => {
  console.log("SMTP connection ready");
}).catch((err) => {
  console.error("SMTP connection failed — check SMTP_EMAIL/SMTP_PASSWORD in .env:", err.message);
});

export default transporter;
