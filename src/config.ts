const process = {
  env: {
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
}

const MILISECONDS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60
const MINUTES_PER_HOUR = 60
const HOURS_PER_DAY = 24

const DAYS = Number(process.env.JWT_EXPIRATION_TIME) || 1

const milisecondsPerDay = MILISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY

const jwtExpirationTime = DAYS * milisecondsPerDay

export const env = {
  jwtExpirationTime,
  jwtSecret: process.env.JWT_SECRET,
  dbPort: process.env.MONGODB_PORT,
  dbDomain: process.env.MONGO_DOMAIN,
  dbDatabase: process.env.MONGODB_DATABASE,
  dbUser: process.env.MONGODB_USERNAME,
  dbPassword: process.env.MONGODB_PASSWORD
}

export const dbMongo = {
  ...env,
  dbUrl: `mongodb://${process.env.MONGO_DOMAIN}:${process.env.MONGODB_PORT}/${env.dbDatabase}?authSource=admin`
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
  User: {
    name: 'User',
    collection: 'users'
  }
}
