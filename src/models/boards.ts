import { Schema } from 'mongoose'

import { azePlastDB } from '@/shared/connection-db'
import { setDefaultSettingsSchema } from '@/shared'

import { IKanbanBoard } from '../types/kanban'
import { KanbanColumn } from './columns'

const collection = 'kanban_boards'

export const KanbanBoard = new Schema<IKanbanBoard>(
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

setDefaultSettingsSchema(KanbanColumn)

export const KanbanColums = azePlastDB.model<IKanbanBoard>(collection, KanbanBoard)
