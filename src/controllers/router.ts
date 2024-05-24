import { Router } from 'express'
import { Request, Response } from 'express'
import { KanbanTask, status, urgency } from '@/models/KanbanTask'
import { z } from 'zod'
import { endpoint } from '@/middlewares'
import { mock } from './mock'

export const kanbanRouter = Router()

const createTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  responsible: z.string(),
  urgency: z.custom(value => {
    if (!urgency.includes(value)) {
      throw new Error(`Invalid urgency: ${value}, must be one of ${urgency.join(', ')}`)
    }

    return value
  }),
  dueDate: z.number().optional(),
  status: z.custom(value => {
    if (!status.includes(value)) {
      throw new Error(`Invalid status: ${value}, must be one of ${status.join(', ')}`)
    }

    return value
  })
})

const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  responsible: z.string().optional(),
  urgency: z.enum(['low', 'medium', 'high']).optional(),
  dueDate: z.number().optional(),
  status: z.enum(['To Do', 'In Progress', 'Ready To Test', 'Done']).optional(),
  comments: z
    .array(
      z.object({
        name: z.string(),
        message: z.string(),
        messageType: z.enum(['text', 'image']),
        createdAt: z.string()
      })
    )
    .optional(),
  assignee: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        avatarUrl: z.string()
      })
    )
    .optional(),
  labels: z.array(z.string()).optional(),
  attachments: z.array(z.string()).optional()
})

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

kanbanRouter.post(
  '/tasks',
  endpoint(async (req: Request, res: Response) => {
    createTaskSchema.parse(req.body)

    const user = req.query.user

    const taskData = { ...req.body, user }
    const newTask = new KanbanTask(taskData)

    await newTask.save().then(() => {
      res.status(201).json({ message: 'Task created successfully' })
    })
  })
)

kanbanRouter.put(
  '/tasks/:taskId',
  endpoint(async (req: Request, res: Response) => {
    try {
      await updateTaskSchema.parse(req.body)

      const { taskId } = req.params
      const updateData = req.body
      const updatedTask = await KanbanTask.findByIdAndUpdate(taskId, updateData, { new: true })
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' })
      }
      res.status(200).json(updatedTask)
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' })
    }
  })
)

kanbanRouter.delete(
  '/tasks/:taskId',
  endpoint(async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params
      const deletedTask = await KanbanTask.findByIdAndDelete(taskId)
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' })
      }
      res.status(200).json({ message: 'Task deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' })
    }
  })
)

kanbanRouter.put(
  '/tasks/:taskId/move',
  endpoint(async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params
      const { toColumnId, position } = req.body
      const task = await KanbanTask.findById(taskId)
      if (!task) {
        return res.status(404).json({ error: 'Task not found' })
      }
      // Update the task's status and position here based on the toColumnId and position
      task.status = toColumnId // Update the status to the new column ID
      // Implement the logic to update the task's position within the column
      await task.save()
      res.status(200).json(task)
    } catch (error) {
      res.status(500).json({ error: 'Failed to move task' })
    }
  })
)
