import { HTTPError } from '@/errors'

import { IKanbanTask, KanbanTask, TaskSchema } from '@/models/KanbanTask'
import { User } from '@/models/User'

export const updateTaskService = async (data: IKanbanTask & { userName: string }) => {
  const { name, archived, priority, categories, files, description, assignee, dueDate, reporter } =
    TaskSchema.parse(data)

  const task = await KanbanTask.findById(data.id)

  const user = await User.findOne({ name: data.userName })

  console.log(user)

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
    history: [...(task.history || []), { user, date: new Date() }]
  })

  await task.save().catch(error => {
    throw new HTTPError('Failed to update task', 500)
  })

  return task
}
