export const HOST_API = process.env.NODE_ENV === 'production' ? 'http://192.168.2.15' : 'http://localhost:8000'

const environment = {
  PORT: '8000',
  MONGODB_PORT: '27017',
  MONGO_DOMAIN: '127.0.0.1',
  MONGODB_USERNAME: 'div',
  MONGODB_PASSWORD: '20020000',
  MONGODB_DATABASE: 'azePlast',
  JWT_SECRET: 'yqutyvxijqbiugc8976t23971g2ydw796fc5f237vucyva8yf725r3821ouqygd8632fx2v3y',
  JWT_EXPIRATION_TIME: '10',
  MAIL_PASSWORD: 'erfhsokepljtfszn',
  MAIL_USERNAME: 'developers@azePlast.com.br'
}

const MILISECONDS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60
const MINUTES_PER_HOUR = 60
const HOURS_PER_DAY = 24

const DAYS = Number(environment.JWT_EXPIRATION_TIME) || 1

const milisecondsPerDay = MILISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY

const jwtExpirationTime = DAYS * milisecondsPerDay

export const env = {
  jwtExpirationTime,
  jwtSecret: environment.JWT_SECRET,
  dbPort: environment.MONGODB_PORT,
  dbDomain: environment.MONGO_DOMAIN,
  dbDatabase: environment.MONGODB_DATABASE,
  dbUser: environment.MONGODB_USERNAME,
  dbPassword: environment.MONGODB_PASSWORD
}

export const dbMongo = {
  ...env,
  dbUrl: `mongodb://${environment.MONGO_DOMAIN}:${environment.MONGODB_PORT}/${env.dbDatabase}?authSource=admin`
}

export const collectionsData = {
  KanbanTask: {
    name: 'KanbanTask',
    collection: 'kanban_tasks'
  },
  KanbanBoard: {
    name: 'KanbanBoard',
    collection: 'kanban_boards'
  },
  KanbanColumn: {
    name: 'KanbanColumn',
    collection: 'kanban_columns'
  },
  KanbanHistory: {
    name: 'KanbanHistory',
    collection: 'histories_models'
  },
  Notifications: {
    name: 'Notifications',
    collection: 'notifications'
  },
  User: {
    name: 'User',
    collection: 'users'
  }
}
