import { collectionsData } from '@/config'
import { azePlastDB, setDefaultSettingsSchema } from '@/shared'

import { z } from 'zod'
import { Schema as SchemaMongoose } from 'mongoose'

export const NotificationSchemaZod = z.object({
  title: z.string(),
  description: z.string(),
  reporter: z.string(),
  view: z.boolean(),
  taskId: z.string(),
  assignee: z.array(z.object({ name: z.string() })),
  priority: z.string()
})

export type INotifications = Omit<DocumentSchemaZod<typeof NotificationSchemaZod>, 'taskId'> & {
  taskId: SchemaMongoose.Types.ObjectId
}

const SchemaModel = new SchemaMongoose<INotifications>(
  {
    reporter: { type: String, required: true },
    view: { type: Boolean, required: true, default: false },
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, required: true },
    assignee: [{ name: { type: String, required: true } }],
    taskId: { type: SchemaMongoose.Types.ObjectId, ref: collectionsData.KanbanTask.name }
  },
  {
    timestamps: true,
    collection: collectionsData.Notifications.collection
  }
)

setDefaultSettingsSchema(SchemaModel)

export const Notifications = azePlastDB.model<INotifications>(collectionsData.Notifications.name, SchemaModel)
