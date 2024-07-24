import { z, ZodType } from 'zod'

import { INotifications } from '@/models/Notifications'

type Props = Omit<SchemaRequiredZod<INotifications>, 'taskId'> & {
  taskId: ZodType<string>
}

export const NotificationSchema = z.object<Props>({
  taskId: z.string(),
  view: z.boolean(),
  title: z.string(),
  description: z.string(),
  assignee: z.array(z.object({ name: z.string() })),
  priority: z.string(),
  reporter: z.string()
})
