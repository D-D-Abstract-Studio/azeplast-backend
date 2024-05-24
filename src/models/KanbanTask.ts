import { azePlastDB } from '@/shared/connection-db'
import { setDefaultSettingsSchema } from '@/shared'
import { Document, Schema } from 'mongoose'

export const status = ['To Do', 'In Progress', 'Ready To Test', 'Done'] as const

export const urgency = ['low', 'medium', 'high'] as const

export interface IKanbanTask extends Document {
  title: string
  category: string
  responsible: string
  dueDate: Date
  urgency: (typeof urgency)[number]
  status: (typeof status)[number]
}

const KanbanTaskSchema = new Schema<IKanbanTask>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    responsible: { type: String, required: true },
    urgency: { type: String, enum: urgency, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: status, required: true }
  },
  {
    timestamps: true,
    collection: 'kanban_tasks'
  }
)

setDefaultSettingsSchema(KanbanTaskSchema)

export const KanbanTask = azePlastDB.model<IKanbanTask>('KanbanTask', KanbanTaskSchema)
