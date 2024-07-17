import { Schema } from 'mongoose'

import { azePlastDB } from '@/shared/connection-db'
import { setDefaultSettingsSchema } from '@/shared'

import { collectionsData } from '@/config'

import { type IKanbanTask, priorityValues } from '@/types/kanban'
import type { Document } from 'mongoose'

type IKanbanTaskDocument = IKanbanTask & Document

const KanbanTaskSchema = new Schema<IKanbanTaskDocument>(
  {
    name: { type: String, required: true },
    priority: { type: String, enum: priorityValues, required: true },
    categories: { type: [String], required: true },
    archived: { type: Boolean, required: true, default: false },
    assignee: [{ name: { type: String, required: true } }],
    description: { type: String, required: true },
    dueDate: { type: String, required: true },
    reporter: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: collectionsData.KanbanTask.collection
  }
)

setDefaultSettingsSchema(KanbanTaskSchema)

export const KanbanTask = azePlastDB.model<IKanbanTaskDocument>(collectionsData.KanbanTask.name, KanbanTaskSchema)
