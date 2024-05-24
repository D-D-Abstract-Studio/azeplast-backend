import { createUserService } from './service'

import type { RequestHandler } from 'express'

export const createUserController: RequestHandler = async (req, res) => {
  await createUserService({
    user: req.query.user,
    ...req.body
  })

  return res.status(201).json({ message: 'User created successfully' })
}
