import * as authController from '../controllers/auth.controller'
import {Router} from 'express'
import { body } from 'express-validator'

const authRouter = Router()

/**
 * All auth routes.
 */

// REGISTER
authRouter.post(
  '/register',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail({ gmail_remove_dots: false }),
    body('password').trim().isLength({ min: 5 }),
    body('name').trim().notEmpty(),
  ],
  authController.register
)

// LOGIN
authRouter.post('/login', authController.login)

// FORGOT PASSWORD
authRouter.post('/forgot-password', authController.forgotPassword)

// RESET PASSWORD
authRouter.post('/reset-password', authController.resetPassword)

export default authRouter