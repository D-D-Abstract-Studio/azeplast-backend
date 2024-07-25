import { HOST_API } from '@/config'

export const createUploadsService = async ({ files }: { files: Express.Multer.File[] }) => {
  const newfiles = files.map(file => {
    return {
      ...file,
      name: file.filename,
      size: file.size,
      type: file.mimetype,
      preview: `${HOST_API}/${file.path.split('src/')[1]}`
    }
  })

  return newfiles
}
