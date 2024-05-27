import { HTTPError } from '@/errors'

import { ColumnSchema } from '../validations'

import { IKanbanColumn } from '@/types/kanban'
import { KanbanColumn } from '@/models/KanbanColumn'

export const createColumnService = async (data: IKanbanColumn) => {
  const columnData = ColumnSchema.parse(data)

  const column = new KanbanColumn(columnData)

  const newBoard = await column.save().catch(error => {
    throw new HTTPError('Failed to create column', 500)
  })

  return newBoard
}
