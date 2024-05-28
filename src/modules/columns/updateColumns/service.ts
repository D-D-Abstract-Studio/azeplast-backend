import { HTTPError } from '@/errors'

import { ColumnSchema } from '../validations'

import { IKanbanColumn } from '@/types/kanban'
import { KanbanColumn } from '@/models/KanbanColumn'

export const updateBoardService = async (data: IKanbanColumn & { id: string }) => {
  const { name, boardId, archived, taskIds } = ColumnSchema.parse(data)

  const colunm = await KanbanColumn.findById(data.id)

  if (!colunm) {
    throw new HTTPError('Column not found', 404)
  }

  if (name) {
    const existingBoard = await KanbanColumn.findOne({ name })

    if (existingBoard && existingBoard.id !== data.boardId) {
      throw new HTTPError('Column with this name already exists', 400)
    }

    colunm.name = name
  }

  if (archived) {
    colunm.archived = archived
  }

  if (taskIds) {
    colunm.taskIds = taskIds
  }

  if (archived) {
    colunm.archived = archived
  }

  if (boardId) {
    colunm.boardId = boardId
  }

  await colunm.save().catch(error => {
    throw new HTTPError('Failed to update column', 500)
  })

  return colunm
}
