import express from 'express'
import session from 'express-session'
// import uuid from 'uuid'

const APP_PORT = process.env.APP_PORT
const APP_SESSION_SECRET = process.env.APP_SESSION_SECRET

const app = express()

// app.use(
//   session({
//     genid: req => {
//       console.log('-> Inside the session middleware')
//       console.log(req.sessionID)
//       return uuid()
//     },
//     secret: APP_SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// )

// app.get('/auth', (req, res) => {
//   console.log('-> Inside the "/auth" callback function')
//   console.log(req.sessionID)
//   res.send('WIP - Authentication/Authorization Server')
// })

// app.listen(APP_PORT, () => {
//   console.log(`-> Listening on port: ${APP_PORT}`)
// })
