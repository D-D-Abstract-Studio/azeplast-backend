import { Schema, Document } from 'mongoose'

import { azePlastDB } from '@/shared/connection-db'
import { setDefaultSettingsSchema } from '@/shared'

import { IKanbanBoard } from '@/types/kanban'

type IKanbanBoardDocument = IKanbanBoard & Document

const BoardSchema = new Schema<IKanbanBoardDocument>(
  {
    columnIds: { type: [String], required: true },
    ordered: { type: [String], required: true },
    usersIds: { type: [String], required: true },
    name: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'kanban_boards'
  }
)

setDefaultSettingsSchema(BoardSchema)

export const KanbanBoard = azePlastDB.model<IKanbanBoardDocument>('KanbanBoard', BoardSchema)
