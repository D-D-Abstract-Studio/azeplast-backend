import { z } from 'zod'

import { IKanbanColumn } from '@/types/kanban'

export const ColumnSchema = z.object<SchemaRequiredZod<IKanbanColumn>>({
  name: z.string(),
  boardId: z.string(),
  archived: z.boolean(),
  taskIds: z.array(z.string())
})
