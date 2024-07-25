import { updateTaskService as updateTaskService } from './service'

import type { RequestHandler } from 'express'

export const updateTaskController: RequestHandler = async (req, res) => {
  const task = await updateTaskService({
    ...req.body,
    id: req.params?.id,
    nameUser: req.query?.nameUser
  })

  return res.status(201).json(task)
}
