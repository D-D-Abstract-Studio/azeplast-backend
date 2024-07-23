import type { RequestHandler } from 'express'
import { getUploadService as deleteTaskService } from './service'

export const getOneUploadController: RequestHandler = async (req, res) => {
  await deleteTaskService({
    id: req.params?.id
  })

  return res.status(202).json({ message: 'Task deletado com sucesso' })
}
