import type { Types } from 'mongoose'

export const priorityValues = ['baixa', 'média', 'alta'] as const

type File = {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
  name: string
  type: string
  preview: string
}

export type IKanbanColumn = {
  boardId: Types.ObjectId
  taskIds: Array<Types.ObjectId>
  archived: boolean
  name: string
}

export type IKanbanBoard = {
  name: string
  usersIds: Array<string>
  columnIds: Array<string>
  ordered: string[]
}
