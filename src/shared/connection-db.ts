import { createConnection } from 'mongoose'

import { MONGO_URL } from '../config'

export const azePlastDB = createConnection(MONGO_URL, {
  maxPoolSize: 10
})

azePlastDB.on('connecting', () => console.log('Connecting to the database'))
azePlastDB.on('error', err => console.error('🔴 Error connecting to the database', err))
azePlastDB.on('disconnected', () => console.log('🔴 Disconnected from the database'))
