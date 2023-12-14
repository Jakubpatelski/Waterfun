import nodemailer from "nodemailer";
import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

router.post("/", async (req, res) => {
  try {
    // create reusable transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jakubnodemailer@gmail.com",
        pass: process.env.Nodemailer_Password,
      },
    });

    // send mail
    let info = await transporter.sendMail({
      to: "jakubpatelski24@gmail.com",
      subject: `${req.body.subject}`,
      html: `
            <html>
              <body>
                <p><strong>Full Name:</strong> ${req.body.fullName}</p>
                <p><strong>Email:</strong> ${req.body.email}</p>
                <p><strong>Message:</strong> ${req.body.text}</p>
              </body>
            </html>
          `,
    });

    res.status(200).send({ message: `Email sent correctly!` });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
});

export default router;
