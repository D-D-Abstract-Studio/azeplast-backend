import express, { Router } from 'express'

import { endpoint } from '@/middlewares'

import { updateBoardController } from './updateBoard/controller'
import { getAllBoardsController } from './getAllBoards/controller'
import { deleteBoardController } from './removeBoard/controller'
import { createBoardController } from './createBoards/controller'

const router = Router()

router.get('/', endpoint(getAllBoardsController))

router.post('/', endpoint(createBoardController))

router.put('/:boardId', endpoint(updateBoardController))

router.delete('/:boardId', endpoint(deleteBoardController))

export default router
