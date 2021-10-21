import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { generateJwtToken } from '../lib/utils/auth.util'
import { forgotPasswordService, resetPasswordService, validatePassword } from '../services/auth.service'
import HttpException from '../exceptions/HttpException'

import EntityNotFoundException from '../exceptions/EntityNotFoundException'
import { getRepository } from 'typeorm'
import { User } from '../lib/db/models/user.model'

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = getRepository(User)
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    next(new HttpException(400, 'Validation failed'))
  }
  try {
    const checkUser = await userRepository.findOne({
      where: {
        email: req.body.email,
      },
    })
    if (checkUser) {
      next(new HttpException(400, 'User with this email already exists!'))
    }

    const user = new User()
    user.email = req.body.email
    user.name = req.body.name
    user.password = req.body.password
    await userRepository.insert(user)

    const { password, ...returnUser } = user

    const token = generateJwtToken({
      id: user.id,
      email: user.email,
    })

    res.status(201).json({
      user: returnUser,
      token: token,
    })
  } catch (e) {
    next(e)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  try {
    const user = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne()

    if (!user) {
      throw new EntityNotFoundException('User with this email does not exists!')
    }

    const passwordStatus = await validatePassword(password, user.password)

    if (!passwordStatus) {
      throw new HttpException(400, 'Wrong password')
    }

    const token = generateJwtToken({
      id: user.id,
      email: user.email,
    })

    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: token,
    })
  } catch (e) {
    next(e)
  }
}

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body

  try {
    const emailSumbissionResponse: any = await forgotPasswordService(email)

    if (emailSumbissionResponse.status === 'error') {
      throw new HttpException(400, JSON.stringify(emailSumbissionResponse))
    }

    res.status(200).json(emailSumbissionResponse)
  } catch (e) {
    next(e)
  }
}

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { token, password } = req.body

  if (!token || !password || (!token && !password)) {
    throw new HttpException(400, 'Missing token or password!')
  }

  try {
    const passwordResetResult = await resetPasswordService(token, password)

    if (passwordResetResult.status === 'error') {
      throw new HttpException(400, JSON.stringify(passwordResetResult))
    }

    res.status(200).json(passwordResetResult)
  } catch (e) {
    next(e)
  }
}
