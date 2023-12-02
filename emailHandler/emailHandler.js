/* eslint-disable import/extensions */
import nodemailer from "nodemailer";
import { generateEmail } from "./emailTemplate.js";

export function sendEmail(req, res) {
  const data = {
    from: '"Lab Equip LTD" <admin@lel.co.tz>', // sender address
    to: process.env.sendEmailTo, // receivers
    subject: "Lab Equip LTD - New contact form submission", // Subject line
    html: generateEmail(req.body.name, req.body.email, req.body.message), // html body
  };

  const config = {
    host: process.env.host,
    port: process.env.port,
    secure: process.env.secure, // true for 465, false for other ports
    auth: {
      user: process.env.user, // cPanel email address
      pass: process.env.pass, // cPanel Password
    },
  };

  const transporter = nodemailer.createTransport(config);

  transporter.sendMail(data, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      res.json({ success: false });
    }
    res.json({ success: true });
    transporter.close();
  });
}
