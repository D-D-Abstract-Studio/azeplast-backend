import { Schema, Document } from 'mongoose'

import { azePlastDB } from '@/shared/connection-db'

import { setDefaultSettingsSchema } from '@/shared'

import { collectionsData } from '@/config'

import { type Types } from 'mongoose'

export type IFilter = {
  taskId: string
  modifications: Array<{
    userId: string
    fields: Array<string>
  }>
}

type IKanbanBoardDocument = IFilter & Document

const FilterSchema = new Schema<IKanbanBoardDocument>(
  {
    taskId: { type: String, required: true },
    modifications: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
  },
  {
    timestamps: true,
    collection: collectionsData.KanbanHistory.collection
  }
)

setDefaultSettingsSchema(FilterSchema)

export const KanbanHistory = azePlastDB.model<IKanbanBoardDocument>(collectionsData.KanbanHistory.name, FilterSchema)
