import { Schema } from 'mongoose'

import { azePlastDB } from '@/shared/connection-db'
import { setDefaultSettingsSchema } from '@/shared'

import { IKanbanColumn } from '../types/kanban'

const collection = 'kanban_colums'

const ColumnSchema = new Schema<IKanbanColumn>(
  {
    name: { type: String, required: true },
    taskIds: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
  },
  {
    timestamps: true,
    collection
  }
)

setDefaultSettingsSchema(ColumnSchema)

export const KanbanColumn = azePlastDB.model<IKanbanColumn>(collection, ColumnSchema)
