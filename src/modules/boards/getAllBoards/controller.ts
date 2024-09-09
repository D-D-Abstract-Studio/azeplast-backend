import { getAllBoardsService } from './service'

import type { RequestHandler } from 'express'

export const getAllBoardsController: RequestHandler = async (req, res) => {
  const boards = await getAllBoardsService()

  return res.status(201).json(boards)
}
