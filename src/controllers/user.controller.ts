import { getRepository } from 'typeorm'
import { User } from '../lib/db/models/user.model'
import { Request, Response, NextFunction } from 'express'

// GET
export const getUsers = async (req: Request, res: Response, next?: NextFunction) => {
  const userRepository = getRepository(User)
  try {
    const users = await userRepository.find()
    res.status(200).json(users)
  } catch (e) {
    res.status(400).json(e.message)
  }
}

// GET by id
export const getUser = async (req: Request, res: Response, next?: NextFunction) => {
  const userRepository = getRepository(User)
  try {
    const user = await userRepository.findOne(req.params.id)
    res.status(200).json(user)
  } catch (e) {
    res.status(400).json(e.message)
  }
}

// POST
export const createUser = async (req: Request, res: Response, next?: NextFunction) => {
  const userRepository = getRepository(User)
  try {
    const user = userRepository.create(req.body)
    const result = await userRepository.save(user)
    res.status(200).json(result)
  } catch (e) {
    res.status(400).json(e.message)
  }
}

// UPDATE
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = getRepository(User)
  try {
    const user = await userRepository.findOne(req.params.id)
    userRepository.merge(user, req.body)
    const result = await userRepository.save(user)
    res.status(200).json(result)
  } catch (e) {
    res.status(400).json(e.message)
  }
}

// DELETE
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = getRepository(User)
  try {
    const result = await userRepository.delete(req.params.id)
    res.status(200).json(result)
  } catch (e) {
    res.status(400).json(e.message)
  }
}
