import express, { Router } from 'express'

import { endpoint } from '@/middlewares'

import { updateBoardController } from './updateTasks/controller'
import { getAllColumnsController } from './getAllTasks/controller'
import { deleteBoardController } from './removeTasks/controller'
import { createColumnController } from './createTasks/controller'

const router = Router()

router.get('/', endpoint(getAllColumnsController))

router.post('/', endpoint(createColumnController))

router.put('/:id', endpoint(updateBoardController))

router.delete('/:id', endpoint(deleteBoardController))

export default router
