import { getAllHistoriesService } from './service'

import type { RequestHandler } from 'express'

export const getAllHistoriesController: RequestHandler = async (req, res) => {
  const histories = await getAllHistoriesService()

  return res.status(201).json(histories)
}
