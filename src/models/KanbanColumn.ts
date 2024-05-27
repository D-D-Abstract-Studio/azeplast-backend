import { Schema } from 'mongoose'

import { azePlastDB } from '@/shared/connection-db'
import { setDefaultSettingsSchema } from '@/shared'

import { IKanbanColumn } from '@/types/kanban'
import { Document } from 'mongoose'

type IKanbanColumnDocument = IKanbanColumn & Document

const ColumnSchema = new Schema<IKanbanColumnDocument>(
  {
    name: { type: String, required: true },
    archived: { type: Boolean, required: true, default: false },
    taskIds: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
  },
  {
    timestamps: true,
    collection: 'kanban_columns'
  }
)

setDefaultSettingsSchema(ColumnSchema)

export const KanbanColumn = azePlastDB.model<IKanbanColumnDocument>('KanbanColumn', ColumnSchema)
