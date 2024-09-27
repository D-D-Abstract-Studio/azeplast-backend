import { Schema } from 'mongoose'

import { azePlastDB } from '@/shared/connection-db'
import { setDefaultSettingsSchema } from '@/shared'

import { collectionsData } from '@/config'

import { z } from 'zod'

export const TaskSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  archived: z.boolean(),
  priority: z.string(),
  categories: z.array(z.string()),
  description: z.string().min(1, 'Description is required'),
  assignee: z.array(z.object({ userId: z.string().optional() })),
  dueDate: z.string().min(1, 'Due date is required'),
  userId: z.string().min(1, 'Reporter is required')
})

export type IKanbanTask = Omit<DocumentSchemaZod<typeof TaskSchema>, 'taskId' | 'userId'> & {
  history: [{ userId: Schema.Types.ObjectId; date: Date }]
  userId: Schema.Types.ObjectId
}

const SchemaModel = new Schema<IKanbanTask>(
  {
    name: { type: String, required: true },
    history: { type: [{ userId: Schema.Types.ObjectId, date: Date }], ref: collectionsData.User.name },
    priority: { type: String, required: true },
    categories: { type: [String], required: true },
    archived: { type: Boolean, required: true, default: false },
    assignee: { type: [{ userId: Schema.Types.ObjectId, date: Date }], ref: collectionsData.User.name },
    description: { type: String, required: true },
    dueDate: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: collectionsData.User.name, required: true }
  },
  {
    timestamps: true,
    collection: collectionsData.KanbanTask.collection
  }
)

setDefaultSettingsSchema(SchemaModel)

export const KanbanTask = azePlastDB.model<IKanbanTask>(collectionsData.KanbanTask.name, SchemaModel)
