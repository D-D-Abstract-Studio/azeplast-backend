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
  dueDate: Date
  reporter: {
    user: string
  }
}

export type IKanbanColumn = {
  archived: boolean
  name: string
  taskIds: string[]
}

export type IKanbanBoard = {
  archived: boolean
  name: string
  usersIds: string[]
  columnIds: string[]
}

export type IKanban = {
  boards: Record<string, IKanbanBoard>
  columns: Record<string, IKanbanColumn>
  ordered: string[]
  tasks: Record<string, IKanbanTask>
}
