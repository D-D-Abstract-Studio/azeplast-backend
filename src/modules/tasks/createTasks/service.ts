import { HTTPError } from '@/errors'

import { KanbanTask } from '@/models/KanbanTask'
import { TaskSchema } from '../validations'

import { IKanbanTask } from '@/types/kanban'

export const createTasksService = async (data: IKanbanTask) => {
  const taskData = TaskSchema.parse(data)
  console.log(taskData)

  const task = new KanbanTask(taskData)

  const newTask = await task.save().catch(error => {
    console.error(error)
    throw new HTTPError('Failed to create task', 500)
  })

  return newTask
}
