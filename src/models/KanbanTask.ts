import { Schema } from 'mongoose'

import { azePlastDB } from '@/shared/connection-db'
import { setDefaultSettingsSchema } from '@/shared'

import { collectionsData } from '@/config'

import type { IKanbanTask } from '@/types/kanban'
import type { Document } from 'mongoose'

type IKanbanTaskDocument = IKanbanTask & Document

const fileSchema = new Schema({
  fieldname: { type: String, required: true },
  originalname: { type: String, required: true },
  encoding: { type: String, required: true },
  mimetype: { type: String, required: true },
  destination: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  preview: { type: String, required: true }
})

const KanbanTaskSchema = new Schema<IKanbanTaskDocument>(
  {
    name: { type: String, required: true },
    files: { type: [fileSchema] },
    history: { type: [{ user: String, date: Date }] },
    priority: { type: String, required: true },
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
