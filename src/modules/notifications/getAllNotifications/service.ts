import { HTTPError } from '@/errors'

import { KanbanBoard } from '@/models/KanbanBoard'

export const getAllNotificationsService = async () => {
  const notifications = await KanbanBoard.find().catch(error => {
    throw new HTTPError('Failed to get notifications', 500)
  })

  return notifications
}
