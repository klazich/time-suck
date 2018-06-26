import path from 'path'

import express from 'express'
// import favicon from 'favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import passport from 'passport'
import cors from 'cors'

import './api/models/db'
import './api/config/passport'

// TODO: const routeApi = ...

const app = express()

// TODO: setup views: app.set(...)

//
// Apply express middleware
//

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'))
app.use(bodyParser.json()) // parse application/json
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(cookieParser())
app.use(cors())
app.use(passport.initialize())

// Handle unauthorized errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: `${err.name}: ${err.message}` })
  }
})
