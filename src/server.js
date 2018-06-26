import 'dotenv/config' // required to Dotenv

import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import flash from 'connect-flash'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'

import getEnv from './getEnv'

const APP_PORT = getEnv('APP_PORT')
const DB_URI = getEnv('DB_URI')
const SESSION_SECRET = getEnv('SESSION_SECRET')

const app = express()

// mongodb & mongoose ==========================================================

// const mongooseOptions = {}
mongoose.connect(DB_URI /* options */).then(
  () => {
    console.log(` -- Connected to MongoDB at: ${DB_URI}.`)
  },
  error => {
    console.error(` !! Could not connect to MongoDB.`, error)
  }
)

// mongoose.connect(DB_URL) // connect to our database

// require('./config/passport')(passport); // pass passport for configuration

// setup the Express application
app.use(morgan('dev')) // log every request to the console
app.use(cookieParser()) // read cookies (needed for auth)
app.use(bodyParser.json()) // parse application/json
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: tru }))// support encoded bodies

// app.set('view engine', 'ejs'); // set up ejs for templating

// middleware - "express-session"
const sessionOptions = {
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}
app.use(session(sessionOptions))

// required for Passport
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(flash()) // use connect-flash for flash messages stored in session

// routes ======================================================================
// require('./app/routes.js')(app, passport) // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(APP_PORT, () => {
  console.log(` -- Server listening at: http://localhost:${APP_PORT}.`)
})
