import { updateBoardService as updateTaskService } from './service'

import type { RequestHandler } from 'express'

export const updateTaskController: RequestHandler = async (req, res) => {
  const task = await updateTaskService({
    user: req.query.user,
    id: req.params?.id,
    ...req.body
  })

  return res.status(201).json(task)
}
