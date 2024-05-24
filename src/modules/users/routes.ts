import express from 'express'

import { endpoint } from '@/middlewares'

import { createUserController } from './createUser/controller'

export const userRouter = express.Router()

userRouter.post('/user', endpoint(createUserController))
