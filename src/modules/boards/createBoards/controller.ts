import { createBoardService } from './service'

import type { RequestHandler } from 'express'

export const createBoardController: RequestHandler = async (req, res) => {
  const result = await createBoardService({
    user: req.query.user,
    ...req.body
  })

  return res.status(201).json(result)
}
