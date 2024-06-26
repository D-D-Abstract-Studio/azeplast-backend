import { HTTPError } from '@/errors'

import { BoardSchema } from '../validations'
import { KanbanBoard } from '@/models/KanbanBoard'

import { IKanbanBoard } from '@/types/kanban'

export const updateBoardService = async (data: IKanbanBoard & { boardId: string }) => {
  const { name, usersIds, columnIds, ordered } = BoardSchema.parse(data)

  const board = await KanbanBoard.findById(data.boardId)

  if (!board) {
    throw new HTTPError('Board not found', 404)
  }

  if (name) {
    const existingBoard = await KanbanBoard.findOne({ name })

    if (existingBoard && existingBoard.id !== data.boardId) {
      throw new HTTPError('Board with this name already exists', 409)
    }

    board.name = name
  }

  Object.assign(board, { name, usersIds, columnIds, ordered })

  await board.save().catch(error => {
    throw new HTTPError('Failed to update board', 500)
  })

  return board
}
