import { HTTPError } from '@/errors'

import { User } from '@/models/User'

export const getOneUserService = async (name: string) => {
  const user = await User.findOne({ name })

  if (!user) {
    throw new HTTPError('User not found', 404)
  }

  return user
}
