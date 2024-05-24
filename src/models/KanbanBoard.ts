import { Schema } from 'mongoose'

import { azePlastDB } from '@/shared/connection-db'
import { setDefaultSettingsSchema } from '@/shared'

import { IKanbanBoard } from '../types/kanban'
import { KanbanColumn } from './KanbanColumn'

const collection = 'kanban_boards'

const BoardSchema = new Schema<IKanbanBoard>(
  {
    name: { type: String, required: true },
    columns: { type: Map, of: KanbanColumn },
    ordered: { type: [String], required: true }
  },
  {
    timestamps: true,
    collection
  }
)

setDefaultSettingsSchema(BoardSchema)

export const KanbanBoard = azePlastDB.model<IKanbanBoard>(collection, BoardSchema)
