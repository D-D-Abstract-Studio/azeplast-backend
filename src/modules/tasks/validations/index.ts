import { z } from 'zod'

import { IKanbanTask, priorityValues } from '@/types/kanban'

export const TaskSchema = z.object<SchemaRequiredZod<IKanbanTask>>({
  name: z.string(),
  archived: z.boolean(),
  priority: z.enum(priorityValues),
  categories: z.array(z.string()),
  description: z.string(),
  assignee: z.array(z.object({ name: z.string().optional() })),
  dueDate: z.date(),
  reporter: z.object({ user: z.string() })
})
