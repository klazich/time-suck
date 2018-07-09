import { Router } from 'express'

import {
  login,
  logout,
  signup,
  profile,
  isLoggedIn,
  authenticateLogin,
  authenticateSignup,
} from './services'

const router = Router()

router.route('/profile').get(isLoggedIn, profile)

router.route('/logout').get(logout)

router
  .route('/signup')
  .get(signup)
  .post(authenticateSignup) // signup form

router
  .route('/login')
  .get(login)
  .post(authenticateLogin) // login form

export default router
