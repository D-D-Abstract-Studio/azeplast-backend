import { z } from 'zod'

import { IKanbanBoard } from '@/types/kanban'

export const BoardSchema = z.object<SchemaRequiredZod<IKanbanBoard>>({
  name: z.string(),
  archived: z.boolean(),
  usersIds: z.array(z.string()),
  columnIds: z.array(z.string())
})
