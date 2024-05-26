import express, { Router } from 'express'

import { endpoint } from '@/middlewares'

import { updateUserController } from './updateUser/controller'
import { getAllUsersController } from './getAllUsers/controller'
import { getOneUserController } from './getOneUser/controller'
import { deleteDomainController } from './removeUser/controller'
import { createBoardController } from './createBoards/controller'

const router = Router()

router.get('/', endpoint(getAllUsersController))

router.post('/', endpoint(createBoardController))

router.put('/:boardId', endpoint(updateUserController))

router.get('/:boardId', endpoint(getOneUserController))

router.delete('/:boardId', endpoint(deleteDomainController))

export default router
