export const priorityValues = ['baixa', 'média', 'alta'] as const

export type IKanbanBoard = {
  name: string
  usersIds: Array<string>
  columnIds: Array<string>
  ordered: string[]
}
