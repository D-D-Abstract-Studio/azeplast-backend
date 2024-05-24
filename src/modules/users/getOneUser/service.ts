import { HTTPError } from '@/errors'

import { User } from '@/models/User'

export const getOneUserService = async (username: string) => {
  const userDocument = await User.findOne({
    username
  })

  if (!userDocument) {
    throw new HTTPError('User not found', 404)
  }

  return userDocument
}
