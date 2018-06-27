export default {
  uri: process.env.DB_URI,
  port: process.env.DB_PORT || 27017,
  dbName: process.env.DB_NAME,
}
