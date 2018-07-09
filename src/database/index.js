import mongoose from 'mongoose'

import config, { INFO, ERROR, SUCCESS, em } from '../config'

export { User } from './models/user'

const {
  db: { host, port, name },
} = config

const connectionString = `mongodb://${host}:${port}/${name}`
const connectionOptions = {
  useNewUrlParser: true,
}

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise

mongoose.connect(
  connectionString,
  connectionOptions
)

mongoose.connection
  .on('error', err => {
    console.error()
  })

  .on('connecting', () => {
    console.info()
  })

  .on('connected', () => {
    console.info()
  })

  .on('disconnected', () => {
    console.info()
  })

const gracefulExit = () => {
  mongoose.connection.close(() => {
    console.log()
    process.exit(0)
  })
}

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit)
