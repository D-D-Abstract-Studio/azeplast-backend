import { HOST_API } from '@/config'

export const createUploadsService = async ({ files }: { files: Express.Multer.File[] }) => {
  const newfiles = files.map(file => {
    const originalNameUtf8 = Buffer.from(file.originalname, 'latin1').toString('utf8').replace(/_/g, '_')

    return {
      name: originalNameUtf8,
      size: file.size,
      type: file.mimetype,
      preview: `${HOST_API}/${file.path.split('src/')[1]}`
    }
  })

  console.log(newfiles)

  return newfiles
}
