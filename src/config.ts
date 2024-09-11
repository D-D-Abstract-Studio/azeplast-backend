export const HOST_API = process.env.HOST_API || ''

export const MONGO_URL = process.env.MONGO_URI || ''

export const collectionsData = {
  KanbanTask: {
    name: 'KanbanTask',
    collection: 'kanban_tasks'
  },
  KanbanBoard: {
    name: 'KanbanBoard',
    collection: 'kanban_boards'
  },
  KanbanColumn: {
    name: 'KanbanColumn',
    collection: 'kanban_columns'
  },
  KanbanHistory: {
    name: 'KanbanHistory',
    collection: 'histories_models'
  },
  Notifications: {
    name: 'Notifications',
    collection: 'notifications'
  },
  User: {
    name: 'User',
    collection: 'users'
  }
}
