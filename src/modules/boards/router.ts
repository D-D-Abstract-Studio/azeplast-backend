import express, { Router } from 'express'

import { endpoint } from '@/middlewares'

import { updateUserController } from './updateUser/controller'
import { getAllBoardsController } from './getAllUsers/controller'
import { getOneUserController } from './getOneUser/controller'
import { deleteBoardController } from './removeBoard/controller'
import { createBoardController } from './createBoards/controller'

const router = Router()

router.get('/', endpoint(getAllBoardsController))

router.post('/', endpoint(createBoardController))

router.put('/:boardId', endpoint(updateUserController))

router.get('/:boardId', endpoint(getOneUserController))

router.delete('/:boardId', endpoint(deleteBoardController))

export default router
