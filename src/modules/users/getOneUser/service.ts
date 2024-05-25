import { HTTPError } from '@/errors'

import { User } from '@/models/User'

export const getOneUserService = async (id: string) => {
  const userDocument = await User.findOne({ _id: id })

  if (!userDocument) {
    throw new HTTPError('User not found', 404)
  }

  return userDocument
}
