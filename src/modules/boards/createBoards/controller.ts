import type { RequestHandler } from 'express'
import { createBoardService } from './service'

export const createBoardController: RequestHandler = async (req, res) => {
  const result = await createBoardService({
    user: req.user?.id,
    ...req.body
  })

  return res.status(201).json(result)
}
