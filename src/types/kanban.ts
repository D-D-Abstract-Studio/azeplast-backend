import type { Types } from 'mongoose'

export const priorityValues = ['baixa', 'média', 'alta'] as const

export type IKanbanTask = {
  name: string
  archived: boolean
  priority: (typeof priorityValues)[number]
  categories: string[]
  description: string
  assignee: Array<{
    name?: string
  }>
  dueDate: string
  reporter: string
}

export type IKanbanColumn = {
  boardId: Types.ObjectId
  taskIds: Array<Types.ObjectId>
  archived: boolean
  name: string
}

export type IKanbanBoard = {
  name: string
  usersIds: Array<Types.ObjectId>
  columnIds: Array<Types.ObjectId>
  ordered: string[]
}
