import path from 'path'

export default {
  app: {
    port: process.env.APP_PORT || 3001,
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'auth',
  },
  cwd: path.resolve(__dirname, '..'),
}

export { DEBUG, ERROR, INFO, SUCCESS, WARNING, em } from './color'
