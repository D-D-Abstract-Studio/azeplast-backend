import { z } from 'zod'

import { IKanbanBoard } from '@/types/kanban'

export const BoardSchema = z.object<SchemaRequiredZod<IKanbanBoard>>({
  name: z.string(),
  columns: z.record(
    z.string(),
    z.object({
      name: z.string(),
      taskIds: z.array(z.string())
    })
  ),
  ordered: z.array(z.string())
})
