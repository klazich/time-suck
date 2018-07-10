import { Router } from 'express'

import {
  authenticationCheck,
  localLoginMiddleware,
  localSignupMiddleware,
} from './services'

const router = Router()

router
  // HOME PAGE ////////////////////////////////////////////////////////////////
  .route('/')
  .get((req, res) => {
    res.render('index.ejs')
  })

router
  // PROFILE PAGE /////////////////////////////////////////////////////////////
  .route('/profile')
  .get(authenticationCheck, (req, res) => {
    res.render('profile.ejs', {
      message: req.flash('message'),
      user: req.user,
    })
  })

router
  // SIGNUP PAGE //////////////////////////////////////////////////////////////
  .route('/signup')
  .get((req, res) => {
    res.render('signup.ejs', {
      message: req.flash('message'),
    })
  })
  // signup form
  .post(localSignupMiddleware, async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user,
    })
    next()
  })

router
  // LOGIN PAGE ///////////////////////////////////////////////////////////////
  .route('/login')
  .get((req, res) => {
    res.render('login.ejs', {
      message: req.flash('message'),
    })
  })
  // login form
  .post(localLoginMiddleware)

router
  // LOGOUT ENDPOINT //////////////////////////////////////////////////////////
  .route('/logout')
  .get((req, res) => {
    req.logout()
    res.redirect('/')
  })

export default router
