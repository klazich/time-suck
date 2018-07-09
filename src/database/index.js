import mongoose from 'mongoose'

import config, { INFO, ERROR, SUCCESS, em } from '../config'

export { User } from './models/user'

// MongoDB & Mongoose Setup ///////////////////////////////////////////////////
const {
  db: { host, port, name },
} = config
const connectionString = `mongodb://${host}:${port}/${name}`
const connectionOptions = {
  useNewUrlParser: true,
}

mongoose.connect(
  connectionString,
  connectionOptions
)

if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true)
}

mongoose.Promise = global.Promise // use the global promise library
mongoose.connection.dropDatabase() // drop existing data

mongoose.connection
  .on('error', err => {
    console.error(
      `${ERROR} Could not establish a connection to MongoDB.\n└─ ${err}`
    )
  })
  .on('connecting', () => {
    console.info(`${INFO} Establishing connection to MongoDB.`)
  })
  .on('connected', () => {
    console.info(
      `${INFO} Default connection established to MongoDB.\n└─ database at: ${em(
        connectionString
      )}`
    )
  })
  .on('disconnected', () => {
    console.info(`${INFO} MongoDB disconnected`)
  })

const gracefulExit = () => {
  mongoose.connection.close(() => {
    console.log(`${INFO} MongoDB connections closed. Exiting process.`)
    process.exit(0)
  })
}

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit)
