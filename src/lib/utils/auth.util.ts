import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { sendEmail } from './email.util'
import bcrypt from 'bcrypt'

export const generateRandomToken = () => crypto.randomBytes(40).toString('hex')

export const generateHash = async (password: string) => {
  const salt = await bcrypt.genSalt(8)
  return await bcrypt.hash(password, salt)
}

export const sendPasswordResetEmail = async (user: { resetToken: string; email: string }) => {
  const resetUrl = `${process.env.APP_URL}/reset-password?token=${user.resetToken}`

  const message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`

  const status = await sendEmail({
    toEmail: user.email,
    mailSubject: 'Reset Password',
    mailBody: `<h4>Reset Password Email</h4>
               ${message}`,
  })

  return status
}

export const generateJwtToken = (data: any): string => {
  const token = jwt.sign(data, process.env.SECRET as unknown as string, { expiresIn: '5d' })
  return token
}
