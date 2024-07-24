import { HTTPError } from '@/errors'

import { INotifications, Notifications } from '@/models/Notifications'

import { NotificationSchema } from '../validations'

export const createNotificationService = async (data: INotifications) => {
  const boardData = NotificationSchema.parse(data)

  const notification = new Notifications(boardData)

  const newBoard = await notification.save().catch(error => {
    throw new HTTPError('Failed to create Notification', 500)
  })

  return newBoard
}
