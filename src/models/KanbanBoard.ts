import { Schema, Document } from 'mongoose'

import { azePlastDB } from '@/shared/connection-db'
import { setDefaultSettingsSchema } from '@/shared'

import { IKanbanBoard } from '@/types/kanban'

type IKanbanBoardDocument = IKanbanBoard & Document

const BoardSchema = new Schema<IKanbanBoardDocument>(
  {
    name: { type: String, required: true },
    columns: { type: Object, required: true },
    ordered: { type: [String], required: true }
  },
  {
    timestamps: true,
    collection: 'kanban_boards'
  }
)

setDefaultSettingsSchema(BoardSchema)

export const KanbanBoard = azePlastDB.model<IKanbanBoardDocument>('KanbanBoard', BoardSchema)
