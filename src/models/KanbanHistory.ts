import { Schema, Document } from 'mongoose'

import { azePlastDB } from '@/shared/connection-db'

import { setDefaultSettingsSchema } from '@/shared'

import { type Types } from 'mongoose'

export type IFilter = {
  id: string
  userId: Types.ObjectId | string
  launchId: string
  type: string
  name: string
  description: string
  filters: Record<string, string | Array<string>>
}

type IKanbanBoardDocument = IFilter & Document

const FilterSchema = new Schema<IKanbanBoardDocument>(
  {
    userId: { type: String, required: true },
    launchId: { type: String, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    filters: { type: Object, required: true }
  },
  {
    timestamps: true,
    collection: 'histories_models'
  }
)

setDefaultSettingsSchema(FilterSchema)

export const KanbanHistory = azePlastDB.model<IKanbanBoardDocument>('History', FilterSchema)
