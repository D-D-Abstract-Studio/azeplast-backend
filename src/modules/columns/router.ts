import express, { Router } from 'express'

import { endpoint } from '@/middlewares'

import { updateBoardController } from './updateColumns/controller'
import { getAllBoardsController } from './getAllColumns/controller'
import { deleteBoardController } from './removeColumns/controller'
import { createBoardController } from './createColumns/controller'

const router = Router()

router.get('/', endpoint(getAllBoardsController))

router.post('/', endpoint(createBoardController))

router.put('/:id', endpoint(updateBoardController))

router.delete('/:id', endpoint(deleteBoardController))

export default router
