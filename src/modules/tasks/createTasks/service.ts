import { HTTPError } from '@/errors'

import { KanbanTask } from '@/models/KanbanTask'
import { TaskSchema } from '../validations'

import { IKanbanTask } from '@/types/kanban'

export const createTasksService = async (data: IKanbanTask) => {
  const taskData = TaskSchema.parse(data)

  const task = new KanbanTask(taskData)

  const newTask = await task.save().catch(error => {
    throw new HTTPError('Failed to create task', 500)
  })

  return newTask
}
