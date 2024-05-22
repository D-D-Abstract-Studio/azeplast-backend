import type { UserI } from '@models/user'

declare global {
  namespace Express {
    interface Request {
      user?: UserI
      administrador?: Record<string, string>
    }
  }
}
