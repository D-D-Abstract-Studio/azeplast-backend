import { Router } from 'express'
import { Request, Response } from 'express'

import { endpoint } from '@/middlewares'
import { mock } from './mock'

export const kanbanRouter = Router()

kanbanRouter.get(
  '/tasks',
  endpoint(async (req: Request, res: Response) => {
    res.status(200).json(mock)

    /* try {
      // Fetch tasks from the database
      const tasks = await KanbanTask.find()
      res.status(200).json({ board: tasks })
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks' })
    }
   */
  })
)
