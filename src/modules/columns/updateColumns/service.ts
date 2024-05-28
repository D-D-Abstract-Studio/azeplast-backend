import { HTTPError } from '@/errors'

import { ColumnSchema } from '../validations'

import { KanbanColumn } from '@/models/KanbanColumn'
import { IKanbanColumn } from '@/types/kanban'

export const updateBoardService = async (data: IKanbanColumn & { id: string }) => {
  const { name, boardId, archived, taskIds } = ColumnSchema.parse(data)

  const column = await KanbanColumn.findById(data.id)

  if (!column) {
    throw new HTTPError('Column not found', 404)
  }

  Object.assign(column, { name, boardId, archived, taskIds })

  await column.save().catch(error => {
    throw new HTTPError('Failed to update column', 500)
  })

  return column
}
