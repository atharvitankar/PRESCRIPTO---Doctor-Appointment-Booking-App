import express from 'express';
const router = express.Router();

import { sendMail } from '../utils/Mail.js';

router.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    console.log("Hello World")
    await sendMail(to, subject, message);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send email', error: err.message });
  }
});

export default router;
