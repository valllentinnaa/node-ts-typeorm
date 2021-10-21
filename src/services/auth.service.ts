'use strict'
import { generateRandomToken, sendPasswordResetEmail } from '../lib/utils/auth.util'
import { User } from '../lib/db/models/user.model'
import bcrypt from 'bcrypt'
import EntityNotFoundException from '../exceptions/EntityNotFoundException'
import HttpException from '../exceptions/HttpException'
import { getRepository, MoreThan } from 'typeorm'
import { DateTime } from 'luxon'

export const validateResetToken = async (token: string) => {
  const userRepository = getRepository(User)

  const user = await userRepository.findOne({
    where: {
      // reset token should be equal and its expired
      // date should be greater than now
      resetToken: token,
      resetTokenExpires: MoreThan(DateTime.now().toJSDate()),
    },
  })

  return user
}

export const forgotPasswordService = async (email: string) => {
  const userRepository = getRepository(User)

  const user = await await getRepository(User)
    .createQueryBuilder('user')
    .where('user.email = :email', { email })
    .addSelect('user.password')
    .getOne()

  // prevent email enumeration
  if (!user) {
    throw new EntityNotFoundException('Such email does not exist!')
  }

  // create reset token that expires after 24 hours
  user.resetToken = generateRandomToken()
  user.resetTokenExpires = DateTime.local().plus({ days: 1 }).toJSDate()
  await userRepository.save(user)

  // send email
  return await sendPasswordResetEmail({ resetToken: user.resetToken, email: user.email })
}

export const resetPasswordService = async (token: string, password: string) => {
  const userRepository = getRepository(User)

  const user = await validateResetToken(token)

  if (!user) {
    throw new HttpException(400, 'Invalid or expired token!')
  }

  //update password and remove reset token
  user.password = password
  user.passwordReset = DateTime.now().toJSDate()
  user.resetToken = null
  await userRepository.save(user)

  return {
    status: 'success',
    message: 'Password updated successfully!',
  }
}

export const validatePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash)
}
