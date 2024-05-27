import express, { Router } from 'express'

import { endpoint } from '@/middlewares'

import { updateBoardController } from './updateTasks/controller'
import { getAllTasksController } from './getAllTasks/controller'
import { deleteBoardController } from './removeTasks/controller'
import { createColumnController } from './createTasks/controller'

const router = Router()

router.get('/', endpoint(getAllTasksController))

router.post('/', endpoint(createColumnController))

router.put('/:id', endpoint(updateBoardController))

router.delete('/:id', endpoint(deleteBoardController))

export default router
