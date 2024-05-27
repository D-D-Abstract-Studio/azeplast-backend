import { createColumnService } from './service'

import type { RequestHandler } from 'express'

export const createColumnController: RequestHandler = async (req, res) => {
  const result = await createColumnService({
    user: req.query.user,
    ...req.body
  })

  return res.status(201).json({ items: result, message: 'Coluna criada com sucesso' })
}
