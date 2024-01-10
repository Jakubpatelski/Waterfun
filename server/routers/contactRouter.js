import { Router } from "express";
import { sendEmail } from "../email/emailUtil.js";
const router = Router();

router.post("/", async (req, res) => {
  try {
    await sendEmail(req);
    res.status(200).send({ message: `Email sent correctly!` });
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
});

export default router;
