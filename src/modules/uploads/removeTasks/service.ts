import { HTTPError } from '@/errors/httpError'

import { KanbanTask } from '@/models/KanbanTask'

import * as Z from 'zod'

type DeleteUserService = {
  id: string
}

const deleteTaskSchema = Z.object({
  id: Z.string()
})

export const deleteBoardService = async (data: DeleteUserService) => {
  const { id } = deleteTaskSchema.parse(data)

  const boardExists = await KanbanTask.findOne({ _id: id })

  if (!boardExists) throw new HTTPError('Task not found', 404)

  return KanbanTask.deleteOne({ _id: id })
}
