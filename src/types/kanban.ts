import { Document } from 'mongoose'

export const priorityValues = ['baixa', 'média', 'alta'] as const

export type IKanbanTask = Partial<Document> & {
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

export type IKanbanColumn = Partial<Document> & {
  name: string
  taskIds: string[]
}

export type IKanbanBoard = Pick<IKanban, 'columns' | 'ordered'> &
  Partial<Document> & {
    name: string
  }

export type IKanban = Partial<Document> & {
  tasks: Record<string, IKanbanTask>
  columns: Record<string, IKanbanColumn>
  ordered: string[]
}
