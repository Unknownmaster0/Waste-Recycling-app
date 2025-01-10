import nodemailer from 'nodemailer';

export const sendEmailOtp = async ({ to, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: `kurkure2001singh@gmail.com`,
        pass: process.env.SMTP_PASS,
      },
    });
    const mailOptions = {
      from: `${process.env.SMTP_COMPANY} <kurkure2001singh@gmail.com>`,
      to: to,
      subject: 'OTP for Email Verification',
      html: message,
    };

    const info = await transporter.sendMail(mailOptions);
    return;
  } catch (error) {
    console.error('Error while sending email:', error.message, error.stack);
    throw new Error('Failed to send email');
  }
};
