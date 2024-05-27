import { Schema } from 'mongoose'

import { azePlastDB } from '@/shared/connection-db'
import { setDefaultSettingsSchema } from '@/shared'

import { IKanbanTask, priorityValues } from '@/types/kanban'
import { Document } from 'mongoose'

type IKanbanTaskDocument = IKanbanTask & Document

const KanbanTaskSchema = new Schema<IKanbanTaskDocument>(
  {
    name: { type: String, required: true },
    priority: { type: String, enum: priorityValues, required: true },
    categories: { type: [String], required: true },
    archived: { type: Boolean, required: true, default: false },
    description: { type: String, required: true },
    assignee: [{ name: { type: String, required: true } }],
    dueDate: { type: Date, required: true },
    reporter: { user: { type: String, required: true } }
  },
  {
    timestamps: true,
    collection: 'kanban_tasks'
  }
)

setDefaultSettingsSchema(KanbanTaskSchema)

export const KanbanTask = azePlastDB.model<IKanbanTaskDocument>('KanbanTask', KanbanTaskSchema)
