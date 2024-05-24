import type { RequestHandler } from 'express'
import { createBoardService } from './service'

export const createBoardController: RequestHandler = async (req, res) => {
  const result = await createBoardService({
    user: req.params.user,
    ...req.body
  })

  return res.status(201).json(result)
}
