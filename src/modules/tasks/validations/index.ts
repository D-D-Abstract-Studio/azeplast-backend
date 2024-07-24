import { z } from 'zod'

import { IKanbanTask } from '@/types/kanban'

export const TaskSchema = z.object<SchemaRequiredZod<Partial<IKanbanTask>>>({
  name: z.string().min(1, 'Name is required'),
  archived: z.boolean(),
  files: z
    .array(
      z.object({
        fieldname: z.string(),
        originalname: z.string(),
        encoding: z.string(),
        mimetype: z.string(),
        destination: z.string(),
        filename: z.string(),
        path: z.string(),
        size: z.number(),
        name: z.string(),
        type: z.string(),
        preview: z.string()
      })
    )
    .optional(),
  priority: z.string(),
  categories: z.array(z.string()),
  description: z.string().min(1, 'Description is required'),
  assignee: z.array(z.object({ name: z.string().optional() })),
  dueDate: z.string().min(1, 'Due date is required'),
  reporter: z.string().min(1, 'Reporter is required')
})
