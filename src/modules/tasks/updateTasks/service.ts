import { HTTPError } from '@/errors'

import { KanbanTask } from '@/models/KanbanTask'
import { TaskSchema } from '../validations'

import { IKanbanBoard } from '@/types/kanban'

export const updateBoardService = async (data: IKanbanBoard & { id: string; user: string }) => {
  const { name, archived, priority, categories, description, assignee, dueDate, reporter } = TaskSchema.parse(data)

  const task = await KanbanTask.findById(data.id)

  if (!task) {
    throw new HTTPError('Task not found', 404)
  }

  Object.assign(task, {
    name,
    archived,
    priority,
    categories,
    description,
    assignee,
    dueDate,
    reporter,
    history: [...(task.history || []), { user: data.user, date: new Date() }]
  })

  await task.save().catch(error => {
    throw new HTTPError('Failed to update task', 500)
  })

  return task
}
