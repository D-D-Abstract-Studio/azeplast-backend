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
  dbUrl: `mongodb://${env.dbUser}:${env.dbPassword}@${env.dbDomain}:${env.dbPort}/${env.dbDatabase}?authSource=admin`
}
