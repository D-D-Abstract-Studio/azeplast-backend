import { z } from 'zod'

import { IUser, userPermissions } from '@/models/User'

export const UserSchema = z.object<SchemaRequiredZod<IUser>>({
  name: z.string(),
  permissions: z.enum(userPermissions)
})
