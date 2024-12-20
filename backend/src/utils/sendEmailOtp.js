import nodemailer from 'nodemailer';
import { smtp_host, smtp_port, smtp_user } from '../../secret.js';

export const sendEmailOtp = async ({ to, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: smtp_host,
      port: smtp_port,
      secure: false,
      auth: {
        user: smtp_user,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `${process.env.SMTP_COMPANY} <smtp_user>`,
      to: to,
      subject: 'OTP for Email Verification',
      html: message,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log(`Message sent: ${info.messageId}`);
    return;
  } catch (error) {
    console.error('Error while sending email:', error.message, error.stack);
    throw new Error('Failed to send email');
  }
};
