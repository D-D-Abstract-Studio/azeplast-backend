import { HTTPError } from '@/errors'

import { KanbanHistory } from '@/models/KanbanHistory'

export const getAllHistoriesService = async () => {
  const histories = await KanbanHistory.find().catch(error => {
    throw new HTTPError('Failed to fetch thes histories', 500)
  })

  return histories
}
