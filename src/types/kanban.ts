import { Document } from 'mongoose'

export const priorityValues = ['baixa', 'média', 'alta'] as const

export type IKanbanTask = Document & {
  name: string
  priority: (typeof priorityValues)[number]
  categories: string[]
  description: string
  assignee: Array<{
    name?: string
  }>
  dueDate: Date
  reporter: {
    user: string
  }
}

export type IKanbanColumn = Document & {
  id: string
  name: string
  taskIds: string[]
}

export type IKanbanBoard = Pick<IKanban, 'columns' | 'ordered'> &
  Document & {
    id: string
    name: string
  }

export type IKanban = Document & {
  tasks: Record<string, IKanbanTask>
  columns: Record<string, IKanbanColumn>
  ordered: string[]
}
