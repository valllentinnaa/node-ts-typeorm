import { Router } from 'express'

import userRouter from './user.router'
import authRouter from './auth.router'

const router = Router()

// /api/auth
router.use('/auth', authRouter)

// /api/users
router.use('/users', userRouter)


export default router