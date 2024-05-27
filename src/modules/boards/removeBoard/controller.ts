import type { RequestHandler } from 'express'
import { deleteBoardService } from './service'

export const deleteBoardController: RequestHandler = async (req, res) => {
  await deleteBoardService({
    id: req.params?.userId
  })

  return res.status(202).json({ message: 'User deleted successfully' })
}
