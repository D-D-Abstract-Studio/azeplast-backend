import { Router } from 'express'

import { endpoint } from '@/middlewares'

import { createUserController } from './createUser/controller'
import { updateUserController } from './updateUser/controller'
import { getAllUsersController } from './getAllUsers/controller'
import { getOneUserController } from './getOneUser/controller'
import { deleteDomainController } from './removeUser/controller'

const router = Router()

router.get('/', endpoint(getAllUsersController))

router.post('/', endpoint(createUserController))

router.put('/:userId', endpoint(updateUserController))

router.get('/:user', endpoint(getOneUserController))

router.delete('/:userId', endpoint(deleteDomainController))

export default router
