import { z } from 'zod'

import { IKanbanBoard } from '@/types/kanban'

export const BoardSchema = z.object<SchemaRequiredZod<IKanbanBoard>>({
  name: z.string(),
  ordered: z.array(z.string()),
  usersIds: z.array(z.string()),
  columnIds: z.array(z.string())
})
