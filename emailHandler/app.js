/* eslint-disable import/extensions */
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { sendEmail } from './emailHandler.js';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // origin: `http://localhost:${process.env.serverPort}`,
    origin: `http://localhost:5333`,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.listen(process.env.serverPort, () => {
  console.log('Server is running on port', process.env.serverPort);
});

app.post('/contactForm/sendEmail', (req, res) => {
  sendEmail(req, res);
});
