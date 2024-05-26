import express from 'express'

import { endpoint } from '@/middlewares'

import { createUserController } from './createUser/controller'
import { updateUserController } from './updateUser/controller'
import { getAllUsersController } from './getAllUsers/controller'
import { getOneUserController } from './getOneUser/controller'
import { deleteDomainController } from './removeUser/controller'

export const userRouter = express.Router()

userRouter.post('/user', endpoint(createUserController))

userRouter.put('/user/:userId', endpoint(updateUserController))

userRouter.get('/users', endpoint(getAllUsersController))

userRouter.get('/user/:userId', endpoint(getOneUserController))

userRouter.delete('/user/:userId', endpoint(deleteDomainController))
