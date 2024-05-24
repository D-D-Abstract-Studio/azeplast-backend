import { Schema } from 'mongoose'

import { azePlastDB } from '@/shared/connection-db'
import { setDefaultSettingsSchema } from '@/shared'

import { IKanbanBoard } from '../types/kanban'
import { columnSchema } from './columns'

const collection = 'kanban_boards'

const boardsSchema = new Schema<IKanbanBoard>(
  {
    name: { type: String, required: true },
    columns: { type: Map, of: columnSchema },
    ordered: { type: [String], required: true }
  },
  {
    timestamps: true,
    collection
  }
)

setDefaultSettingsSchema(columnSchema)

export const KanbanColums = azePlastDB.model<IKanbanBoard>(collection, boardsSchema)
