import type { Request, Response } from 'express'
import { getOneUserService } from './service'

export const getOneUserController = async (req: Request, res: Response) => {
  const user = await getOneUserService(req.params?.userId as string)

  res.status(200).json(user)
}
