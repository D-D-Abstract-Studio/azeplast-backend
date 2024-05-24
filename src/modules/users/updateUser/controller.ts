import { updateUserService } from './service'

import type { RequestHandler } from 'express'

export const updateUserController: RequestHandler = async (req, res) => {
  await updateUserService({
    user: req.query.user,
    userId: req.params.id,
    ...req.body
  })

  return res.status(201).json({ message: 'User updated' })
}
