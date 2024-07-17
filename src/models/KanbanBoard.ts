import { Schema, Document } from 'mongoose'

import { azePlastDB } from '@/shared/connection-db'
import { setDefaultSettingsSchema } from '@/shared'

import { collectionsData } from '@/config'

import type { IKanbanBoard } from '@/types/kanban'

type IKanbanBoardDocument = IKanbanBoard & Document

const BoardSchema = new Schema<IKanbanBoardDocument>(
  {
    columnIds: { type: [String], ref: collectionsData.KanbanColumn.name, required: true },
    usersIds: { type: [String], ref: collectionsData.User.name, required: true },
    ordered: { type: [String], required: true },
    name: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: collectionsData.KanbanBoard.collection
  }
)

setDefaultSettingsSchema(BoardSchema)

export const KanbanBoard = azePlastDB.model<IKanbanBoardDocument>(collectionsData.KanbanBoard.name, BoardSchema)
