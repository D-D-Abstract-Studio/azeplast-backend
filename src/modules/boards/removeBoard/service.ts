import { HTTPError } from '@/errors/httpError'

import { User } from '@/models/User'

import * as Z from 'zod'

type DeleteUserService = {
  id: string
}

export const deleteDomainSchema = Z.object({
  id: Z.string()
})

export const deleteBoardService = async (data: DeleteUserService) => {
  const { id } = deleteDomainSchema.parse(data)

  const domainExists = await User.findOne({ _id: id })

  if (!domainExists) throw new HTTPError('User not found', 404)

  return User.deleteOne({ _id: id })
}
