import express, { Request, Response, NextFunction } from 'express'

import { KanbanBoard } from '@/models/boards'
import { KanbanColumn } from '@/models/columns'
import { KanbanTask } from '@/models/tasks'

import { ZodSchema, z } from 'zod'
import { priorityValues } from '../types/kanban'

export const createTaskSchema = z.object({
  name: z.string(),
  priority: z.enum(priorityValues),
  categories: z.array(z.string()),
  description: z.string(),
  assignee: z.array(
    z.object({
      name: z.string().optional()
    })
  ),
  dueDate: z.date(),
  reporter: z.object({
    user: z.string()
  })
})

export const updateTaskSchema = z.object({
  name: z.string().optional(),
  priority: z.enum(priorityValues).optional(),
  categories: z.array(z.string()).optional(),
  description: z.string().optional(),
  assignee: z
    .array(
      z.object({
        name: z.string().optional()
      })
    )
    .optional(),
  dueDate: z.date().optional(),
  reporter: z
    .object({
      user: z.string().optional()
    })
    .optional()
})

export const createColumnSchema = z.object({
  name: z.string()
})

export const updateColumnSchema = z.object({
  name: z.string().optional(),
  taskIds: z.array(z.string()).optional()
})

export const createBoardSchema = z.object({
  name: z.string(),
  columns: z.record(
    z.string(),
    z.object({
      name: z.string(),
      taskIds: z.array(z.string())
    })
  ),
  ordered: z.array(z.string())
})

export const updateBoardSchema = z.object({
  name: z.string().optional(),
  columns: z
    .record(
      z.string(),
      z.object({
        name: z.string().optional(),
        taskIds: z.array(z.string()).optional()
      })
    )
    .optional(),
  ordered: z.array(z.string()).optional()
})

export const validateRequest = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (e: any) {
      res.status(400).json({ error: e.errors })
    }
  }
}

export const kanbanRouter = express.Router()

// Criar um novo painel Kanban
kanbanRouter.post('/boards', validateRequest(createBoardSchema), async (req: Request, res: Response) => {
  try {
    const boardData = req.body
    const board = new KanbanBoard(boardData)
    await board.save()
    res.status(201).json(board)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create board' })
  }
})

// Atualizar um painel Kanban
kanbanRouter.put('/boards/:boardId', validateRequest(updateBoardSchema), async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params
    const boardData = req.body
    const board = await KanbanBoard.findByIdAndUpdate(boardId, boardData, { new: true })
    if (!board) {
      return res.status(404).json({ error: 'Board not found' })
    }
    res.json(board)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update board' })
  }
})

// Criar uma nova coluna
kanbanRouter.post('/columns', validateRequest(createColumnSchema), async (req: Request, res: Response) => {
  try {
    const columnData = req.body
    const column = new KanbanColumn(columnData)
    await column.save()
    res.status(201).json(column)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create column' })
  }
})

// Atualizar uma coluna
kanbanRouter.put('/columns/:columnId', validateRequest(updateColumnSchema), async (req: Request, res: Response) => {
  try {
    const { columnId } = req.params
    const columnData = req.body
    const column = await KanbanColumn.findByIdAndUpdate(columnId, columnData, { new: true })
    if (!column) {
      return res.status(404).json({ error: 'Column not found' })
    }
    res.json(column)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update column' })
  }
})

// Criar uma nova tarefa
kanbanRouter.post('/tasks', validateRequest(createTaskSchema), async (req: Request, res: Response) => {
  try {
    const taskData = req.body
    const task = new KanbanTask(taskData)
    await task.save()
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' })
  }
})

// Atualizar uma tarefa
kanbanRouter.put('/tasks/:taskId', validateRequest(updateTaskSchema), async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params
    const taskData = req.body
    const task = await KanbanTask.findByIdAndUpdate(taskId, taskData, { new: true })
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    res.json(task)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' })
  }
})

// Deletar uma tarefa
kanbanRouter.delete('/tasks/:taskId', async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params
    await KanbanTask.findByIdAndDelete(taskId)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' })
  }
})

// Obter todas as tarefas
kanbanRouter.get('/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await KanbanTask.find()
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' })
  }
})

// Obter todas as colunas
kanbanRouter.get('/columns', async (req: Request, res: Response) => {
  try {
    const columns = await KanbanColumn.find()
    res.status(200).json(columns)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch columns' })
  }
})

// Obter todos os painéis
kanbanRouter.get('/boards', async (req: Request, res: Response) => {
  try {
    const boards = await KanbanBoard.find()
    res.status(200).json(boards)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch boards' })
  }
})

export default kanbanRouter
