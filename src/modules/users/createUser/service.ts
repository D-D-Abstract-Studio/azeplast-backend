import { HTTPError } from '@/errors'

import { IUser, User } from '@/models/User'

import { UserSchema } from '../validations'

export const createUserService = async (data: IUser) => {
  const { name, permissions } = UserSchema.parse(data)

  if (await User.exists({ name })) {
    throw new HTTPError('User already exists', 409)
  }

  const user = new User({ name, permissions })

  await user.save().catch(error => {
    throw new HTTPError('Failed to create board', 500)
  })
}
