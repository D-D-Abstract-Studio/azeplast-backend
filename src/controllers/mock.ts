import { IKanban } from '../types/kanban'

export const mock: IKanban = {
  tasks: {
    'task-1': {
      id: 'task-1',
      name: 'Task 1',
      priority: 'alta',
      categories: ['category-1', 'category-2'],
      description: 'This is a description',
      assignee: [],
      dueDate: new Date(),
      reporter: { user: 'Financeiro' }
    }
  },
  columns: {
    'status-1': {
      id: 'status-1',
      name: 'To Do',
      taskIds: ['task-1']
    }
  },
  ordered: ['status-1']
}
