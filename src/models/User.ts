import { azePlastDB, setDefaultSettingsSchema } from '@/shared'

import { collectionsData } from '@/config'

import { type Document, Schema } from 'mongoose'

export const userPermissions = ['user', 'admin'] as const
export interface IUser extends Partial<Document> {
  name: string
  permissions: 'user' | 'admin'
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    permissions: { type: String, enum: userPermissions, default: 'user' }
  },
  {
    timestamps: true,
    collection: collectionsData.User.collection
  }
)

setDefaultSettingsSchema(UserSchema)

export const User = azePlastDB.model<IUser>(collectionsData.User.name, UserSchema)
