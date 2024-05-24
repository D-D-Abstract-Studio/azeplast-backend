import { HTTPError } from '@/errors'

import { KanbanBoard } from '@/models/KanbanBoard'
import { BoardSchema } from './validation'

import { IKanbanBoard } from '@/types/kanban'

export const createBoardService = async (data: IKanbanBoard) => {
  const boardData = BoardSchema.parse(data)

  const board = new KanbanBoard(boardData)

  await board.save().catch(error => {
    throw new HTTPError('Failed to create board', 500)
  })
}
