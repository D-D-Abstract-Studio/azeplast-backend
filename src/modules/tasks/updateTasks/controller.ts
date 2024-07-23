import { updateTaskService as updateTaskService } from './service'

import type { RequestHandler } from 'express'

export const updateTaskController: RequestHandler = async (req, res) => {
  const task = await updateTaskService({
    id: req.params?.id,
    files: req.files,
    ...req.body
  })

  return res.status(201).json(task)
}
