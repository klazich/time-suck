import { ERROR, WARNING, SUCCESS, INFO, DEBUG, em } from './color'

export default {
  uri: process.env.DB_URI,
  port: process.env.DB_PORT || 27017,
  dbName: process.env.DB_NAME,
}

export function lastModifiedPlugin(schema, options) {
  schema.add({ lastMod: Date })

  schema.pre('save', function(next) {
    this.lastMod = new Date()
    next()
  })

  if (options && options.index) {
    schema.path('lastMod').index(options.index)
  }
}

export function logSave(schema, options) {
  function handle(next) {
    console.info(`database     | ${INFO} saving to database`)
    next()
  }
  schema.pre('save', handle)
}
