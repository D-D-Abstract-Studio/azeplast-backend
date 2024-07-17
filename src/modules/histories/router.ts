import { Router } from 'express'

import { endpoint } from '@/middlewares'

import { getAllHistoriesController } from './getAllHistories/controller'
import { getOneHistoryController } from './getOneHistory/controller'

const router = Router()

router.get('/', endpoint(getAllHistoriesController))

router.get('/:id', endpoint(getOneHistoryController))

export default router
