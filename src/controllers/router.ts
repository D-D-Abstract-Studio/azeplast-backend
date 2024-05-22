import { Router } from 'express'

import { endpoint } from '@/middlewares'

import { Request, Response } from 'express'
import { KanbanTask } from '@/models/KanbanTask'
import { z } from 'zod'

export const kanbanRouter = Router()

const createTaskSchema = z.object({
  title: z.string(),
  category: z.string(),
  responsible: z.string(),
  urgency: z.enum(['low', 'medium', 'high']),
  dueDate: z.string().transform(str => new Date(str)),
  status: z.enum(['new', 'in_progress', 'archived']).optional(),
  user: z.string()
})

// Controlador para criar uma tarefa
export const createTaskController = async (req: Request, res: Response) => {
  try {
    const taskData = createTaskSchema.parse(req.body)
    const user = req.body.user

    const newTask = new KanbanTask({ ...taskData, user })
    await newTask.save()
    res.status(201).json(newTask)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Controlador para arquivar uma tarefa
export const archiveTaskController = async (req: Request, res: Response) => {
  try {
    const user = req.body.user
    const task = await KanbanTask.findOneAndUpdate({ _id: req.params.id, user }, { status: 'archived' }, { new: true })
    if (!task) {
      return res.status(404).json({ message: 'Task not found or you do not have permission' })
    }
    res.status(200).json(task)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Controlador para obter uma tarefa
export const getTaskController = async (req: Request, res: Response) => {
  try {
    const user = req.body.user
    const task = await KanbanTask.findOne({ _id: req.params.id, user })
    if (!task) {
      return res.status(404).json({ message: 'Task not found or you do not have permission' })
    }
    res.status(200).json(task)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Controlador para obter todas as tarefas do usuário
export const getAllTasksController = async (req: Request, res: Response) => {
  try {
    const user = req.body.user
    const tasks = await KanbanTask.find({ user })
    res.status(200).json(tasks)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const updateTaskSchema = z.object({
  title: z.string().optional(),
  category: z.string().optional(),
  responsible: z.string().optional(),
  urgency: z.enum(['low', 'medium', 'high']).optional(),
  dueDate: z
    .string()
    .optional()
    .transform(str => (str ? new Date(str) : undefined)),
  status: z.enum(['new', 'in_progress', 'archived']).optional()
})

// Controlador para atualizar uma tarefa
export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const taskData = updateTaskSchema.parse(req.body)
    const user = req.body.user
    const task = await KanbanTask.findOneAndUpdate({ _id: req.params.id, user }, taskData, { new: true })
    if (!task) {
      return res.status(404).json({ message: 'Task not found or you do not have permission' })
    }
    res.status(200).json(task)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Controlador para deletar uma tarefa
export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const user = req.body.user
    const task = await KanbanTask.findOneAndDelete({ _id: req.params.id, user })
    if (!task) {
      return res.status(404).json({ message: 'Task not found or you do not have permission' })
    }
    res.status(200).json({ message: 'Task deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

kanbanRouter.post('/kanban', endpoint(createTaskController))
kanbanRouter.patch('/kanban/:id/archive', endpoint(archiveTaskController))
kanbanRouter.get('/kanban/:id', endpoint(getTaskController))
kanbanRouter.get('/kanban', endpoint(getAllTasksController))
kanbanRouter.patch('/kanban/:id', endpoint(updateTaskController))
