import type { RequestHandler } from 'express'
import { deleteUserService } from './service'

export const deleteDomainController: RequestHandler = async (req, res) => {
  await deleteUserService({
    id: req.params?.id
  })

  return res.status(202).json({ message: 'User deleted successfully' })
}
