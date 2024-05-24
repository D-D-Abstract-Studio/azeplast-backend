import type { Request, Response } from 'express'
import { getOneUserService } from './service'

export const getOneUserController = async (req: Request, res: Response) => {
  const { username } = req.params

  const item = await getOneUserService(username)

  res.status(200).json(item)
}
