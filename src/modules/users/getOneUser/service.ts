import { HTTPError } from '@/errors'

import { User } from '@/models/User'

export const getOneUserService = async (id: string) => {
  const user = await User.findById(id)

  if (!user) {
    throw new HTTPError('User not found', 404)
  }

  return user
}
