import fs from 'node:fs'
import * as Z from 'zod'

type DeleteUserService = {
  id: string
}

const getUploadSchema = Z.object({
  id: Z.string()
})

export const getUploadService = async (data: DeleteUserService) => {
  const { id } = getUploadSchema.parse(data)

  const file = fs.readFileSync(`src/uploads/${id}`)

  return file
}
