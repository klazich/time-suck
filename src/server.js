import 'dotenv/config' // required for Dotenv

import path from 'path'

import express from 'express'
import passport from 'passport'
import flash from 'connect-flash'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import cors from 'cors'
import errorHandler from 'errorhandler'

import config, { INFO, em } from './config'
const { app: { port } } = config // env config variables

// Initialize a new Express application
const app = express()

// Setup mongoose and connect to MongoDB
import './database'
// Setup Passport strategies
import './passport'
// Setup and import route controllers
import routes from './routes'

// Express Middleware /////////////////////////////////////////////////////////
// Configure view engine to render EJS templates.
app.set('view engine', 'ejs') // set up ejs for templating
app.set('views', path.resolve(config.cwd, 'views'))

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(morgan('dev')) // request logging
app.use(cookieParser())
app.use(bodyParser.json()) // application/json
app.use(bodyParser.urlencoded({ extended: true })) // application/x-www-form-urlencoded
app.use(cors()) // cross-origin resource sharing middleware

// Setup session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

if (process.env.NODE_ENV !== 'production') {
  app.use(errorHandler())
}

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize())
app.use(passport.session()) // Needed for local strategy but not for JWT.

app.use(flash()) // connect-flash to flash messages stored in session.

// ROUTING ////////////////////////////////////////////////////////////////////
app.use(routes)
app.set('port', port)

// LAUNCH /////////////////////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(
    `${INFO} Server started.\n└─ listening at: ${em(
      `http://localhost:${port}`
    )}`
  )
})
