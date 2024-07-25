import { HTTPError } from '@/errors'

import { IKanbanTask, KanbanTask, TaskSchema } from '@/models/KanbanTask'

export const updateTaskService = async (data: IKanbanTask & { user: string }) => {
  const { name, archived, priority, categories, files, description, assignee, dueDate, reporter } =
    TaskSchema.parse(data)

  const task = await KanbanTask.findById(data.id)

  if (!task) {
    throw new HTTPError('Task not found', 404)
  }

  Object.assign(task, {
    name,
    files,
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
    console.log(error)
    throw new HTTPError('Failed to update task', 500)
  })

  return task
}
