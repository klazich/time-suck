import 'dotenv/config' // required to Dotenv

import path from 'path'

import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import flash from 'connect-flash'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import cors from 'cors'
import errorHandler from 'errorhandler'

import getenv from './getenv'
import config from './config'
import { ERROR, WARNING, SUCCESS, INFO, DEBUG, em } from './config/color'
// import initPassport from './config/passport'

// env config variables
const APP_PORT = getenv('APP_PORT')
const SESSION_SECRET = getenv('SESSION_SECRET')
// production env check
const isProduction = process.env.NODE_ENV === 'production'

// Init app
const app = express()

// mongodb & mongoose /////////////////////////////////////////////////////////

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise

mongoose
  .connect(config.database.uri, {
    dbName: config.database.dbName,
    useNewUrlParser: true,
  })
  .then(() => {
    console.info(`auth/session | ${SUCCESS} Mongodb connected.
             | └─ database server at ${em(config.database.uri)}`)
  })
  .catch(err => {
    console.error(`auth/session | ${ERROR} Could not connect to a mongodb service
      | └─ ${err.message}`)
  })
// mongoose.set('debug', true)
mongoose.connection.dropDatabase() // drop existing data

// initPassport(passport) // pass passport for configuration
import './config/passport/index'

// Express Middleware /////////////////////////////////////////////////////////

app.use(morgan('dev')) // request logging
app.use(cookieParser())
app.use(bodyParser.json()) // application/json
app.use(bodyParser.urlencoded({ extended: false })) // application/x-www-form-urlencoded
app.use(cors()) // cross-origin resource sharing middleware

if (!isProduction) {
  app.use(errorHandler())
}

app.set('view engine', 'ejs') // set up ejs for templating
app.set('views', path.resolve(config.cwd, 'views'))

// session middleware
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
)

// passport middleware initializing
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions

app.use(flash()) // connect-flash to flash messages stored in session

// routes /////////////////////////////////////////////////////////////////////
import routes from './app/routes'
routes(app, passport) // load our routes and pass in our app and fully configured passport

// launch /////////////////////////////////////////////////////////////////////
app.listen(APP_PORT, () => {
  console.log(`auth/session | ${INFO} Server started.`)
  console.log(`             | └─ listening on port ${em(APP_PORT)}`)
})
