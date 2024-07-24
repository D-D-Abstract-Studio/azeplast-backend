import { azePlastDB, setDefaultSettingsSchema } from '@/shared'

import { collectionsData } from '@/config'

import { type Document, Schema } from 'mongoose'

export interface INotifications extends Partial<Document> {
  taskId: Schema.Types.ObjectId
  view: boolean
  finished: boolean
  title: string
  description: string
  assignee: [{ name: string }]
  priority: string
  reporter: string
}

const NotificationSchema = new Schema<INotifications>(
  {
    reporter: { type: String, required: true },
    view: { type: Boolean, required: true, default: false },
    finished: { type: Boolean, required: true, default: false },
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, required: true },
    assignee: [{ name: { type: String, required: true } }],
    taskId: { type: Schema.Types.ObjectId, ref: collectionsData.KanbanTask.name }
  },
  {
    timestamps: true,
    collection: collectionsData.Notifications.collection
  }
)

setDefaultSettingsSchema(NotificationSchema)

export const Notifications = azePlastDB.model<INotifications>(collectionsData.Notifications.name, NotificationSchema)
