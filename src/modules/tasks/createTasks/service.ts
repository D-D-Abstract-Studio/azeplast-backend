import { HTTPError } from '@/errors'

import { TaskSchema } from '../validations'

import { IKanbanColumn } from '@/types/kanban'
import { KanbanColumn } from '@/models/KanbanColumn'

export const createTasksService = async (data: IKanbanColumn) => {
  const taskData = TaskSchema.parse(data)

  const task = new KanbanColumn(taskData)

  const newTask = await task.save().catch(error => {
    throw new HTTPError('Failed to create task', 500)
  })

  return newTask
}
