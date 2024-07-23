import { Router } from 'express'

import { endpoint } from '@/middlewares'

import { deleteTaskController } from './removeUpload/controller'
import { createUploadsController } from './createUploads/controller'
import { getOneUploadController } from './getOneUpload/controller'

import { upload } from '@/shared/multer-config'

const router = Router()

router.post('/', upload.array('files', 100), endpoint(createUploadsController))

router.get('/:id', endpoint(getOneUploadController))

router.delete('/:id', endpoint(deleteTaskController))

export default router
