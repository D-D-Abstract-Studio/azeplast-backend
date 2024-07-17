import { getOneHistoryService } from './service'

import type { Request, Response } from 'express'

export const getOneHistoryController = async (req: Request, res: Response) => {
  const task = await getOneHistoryService(req.params?.id)

  res.status(200).json(task)
}
