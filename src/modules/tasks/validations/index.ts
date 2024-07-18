import { z } from 'zod'

import { IKanbanTask, priorityValues } from '@/types/kanban'

export const TaskSchema = z.object<SchemaRequiredZod<Partial<IKanbanTask>>>({
  name: z.string().min(1, 'Name is required'),
  archived: z.boolean(),
  priority: z.enum(priorityValues),
  categories: z.array(z.string()),
  description: z.string().min(1, 'Description is required'),
  assignee: z.array(z.object({ name: z.string().optional() })),
  dueDate: z.string().min(1, 'Due date is required'),
  reporter: z.string().min(1, 'Reporter is required')
})
