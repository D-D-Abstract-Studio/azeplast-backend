import { Schema, Document } from 'mongoose'

import { azePlastDB } from '@/shared/connection-db'
import { setDefaultSettingsSchema } from '@/shared'

import { IKanbanBoard } from '@/types/kanban'

type IKanbanBoardDocument = IKanbanBoard & Document & { user: string }

const BoardSchema = new Schema<IKanbanBoardDocument>(
  {
    user: { type: String, required: true },
    name: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'kanban_boards'
  }
)

setDefaultSettingsSchema(BoardSchema)

export const KanbanBoard = azePlastDB.model<IKanbanBoardDocument>('KanbanBoard', BoardSchema)
