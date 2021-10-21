import * as userController from '../controllers/user.controller'
import { Router } from 'express'

const userRouter = Router()

/**
 * All user routes.
 */

// GET users
userRouter.get('/', userController.getUsers)

// GET user by id
userRouter.get('/:id', userController.getUser)

// CREATE user
userRouter.post('/', userController.createUser)

// UPDATE user
userRouter.put('/:id', userController.updateUser)

// DELETE user
userRouter.delete('/:id', userController.deleteUser)


export default userRouter
