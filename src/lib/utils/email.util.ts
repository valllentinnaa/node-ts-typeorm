import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config()

export const sendEmail = async ({
  toEmail,
  mailSubject,
  mailBody,
}: {
  toEmail: string
  mailSubject: string
  mailBody: string
}) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: mailSubject,
    html: mailBody,
  }

  try {
    await transporter.sendMail(mailOptions)

    return {
      status: 'success',
      message: 'The email was sent successfully!',
    }
  } catch (e) {
    return {
      status: 'error',
      message: 'There was an error sending the email!',
      errorMessage: e,
    }
  }
}
