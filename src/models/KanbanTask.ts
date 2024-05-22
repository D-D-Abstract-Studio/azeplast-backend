import { azePlastDB } from '@/shared/connection-db'
import { setDefaultSettingsSchema } from '@/shared'
import { Document, Schema } from 'mongoose'

export interface IKanbanTask extends Document {
  user: Document['_id']
  title: string
  category: string
  responsible: string
  urgency: 'low' | 'medium' | 'high'
  dueDate: Date
  status: 'new' | 'in_progress' | 'archived'
}

const KanbanTaskSchema = new Schema<IKanbanTask>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    responsible: { type: String, required: true },
    urgency: { type: String, enum: ['low', 'medium', 'high'], required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['new', 'in_progress', 'archived'], default: 'new' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true,
    collection: 'kanban_tasks'
  }
)

setDefaultSettingsSchema(KanbanTaskSchema)

export const KanbanTask = azePlastDB.model<IKanbanTask>('KanbanTask', KanbanTaskSchema)
