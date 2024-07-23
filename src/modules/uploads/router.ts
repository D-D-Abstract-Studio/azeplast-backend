import { Router } from 'express'

import { endpoint } from '@/middlewares'

import { deleteTaskController } from './removeTasks/controller'
import { createUploadsController } from './createTasks/controller'

import { upload } from '@/shared/multer-config'

const router = Router()

router.post('/', upload.array('files', 100), endpoint(createUploadsController))

router.delete('/:id', endpoint(deleteTaskController))

export default router
