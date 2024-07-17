import { Schema } from 'mongoose'

import { azePlastDB } from '@/shared/connection-db'
import { setDefaultSettingsSchema } from '@/shared'

import { collectionsData } from '@/config'

import type { Document } from 'mongoose'
import type { IKanbanColumn } from '@/types/kanban'

type IKanbanColumnDocument = IKanbanColumn & Document

const ColumnSchema = new Schema<IKanbanColumnDocument>(
  {
    name: { type: String, required: true },
    boardId: { type: Schema.Types.ObjectId, ref: collectionsData.KanbanBoard.name, required: true },
    taskIds: [{ type: Schema.Types.ObjectId, ref: collectionsData.KanbanTask.name }],
    archived: { type: Boolean, required: true, default: false }
  },
  {
    timestamps: true,
    collection: collectionsData.KanbanColumn.collection
  }
)

setDefaultSettingsSchema(ColumnSchema)

export const KanbanColumn = azePlastDB.model<IKanbanColumnDocument>(collectionsData.KanbanColumn.name, ColumnSchema)
