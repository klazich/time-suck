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

import getenv from './getenv'
import config from './config'
import initPassport from './config/passport'

const APP_PORT = getenv('APP_PORT')
const SESSION_SECRET = getenv('SESSION_SECRET')

const app = express()

// mongodb & mongoose ==========================================================

mongoose.connection.dropDatabase()

mongoose
  .connect(
    config.database.uri,
    { dbName: config.database.dbName }
  )
  .then(
    () => console.log(`[server/auth] mongodb connected successfully`),
    error =>
      console.error(
        `[server/auth] could not connect to a mongodb service`,
        error
      )
  )

mongoose.connection.dropDatabase()

initPassport(passport) // pass passport for configuration

app.use(morgan('dev')) // request logging
app.use(cookieParser())
app.use(bodyParser.json()) // application/json
app.use(bodyParser.urlencoded({ extended: false })) // application/x-www-form-urlencoded
app.use(cors()) // cross-origin resource sharing middleware

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

// routes ======================================================================
import routes from './app/routes'
routes(app, passport) // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(APP_PORT, () => {
  console.log(`[server/auth] server started up successfully`)
  console.log(`[server/auth] >>> listening on port ${APP_PORT} <<<`)
})
