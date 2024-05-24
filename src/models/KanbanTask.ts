import { Schema } from 'mongoose'

import { azePlastDB } from '@/shared/connection-db'
import { setDefaultSettingsSchema } from '@/shared'

import { IKanbanTask, priorityValues } from '../types/kanban'

const collection = 'kanban_tasks'

const KanbanTaskSchema = new Schema<IKanbanTask>(
  {
    name: { type: String, required: true },
    priority: { type: String, enum: priorityValues, required: true },
    categories: { type: [String], required: true },
    description: { type: String, required: true },
    assignee: [{ name: { type: String, required: true } }],
    dueDate: { type: Date, required: true },
    reporter: { user: { type: String, required: true } }
  },
  {
    timestamps: true,
    collection
  }
)

setDefaultSettingsSchema(KanbanTaskSchema)

export const KanbanTask = azePlastDB.model<IKanbanTask>(collection, KanbanTaskSchema)
