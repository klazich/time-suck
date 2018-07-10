import { Router } from 'express'

import {
  login,
  logout,
  signup,
  authenticateLogin,
  authenticateSignup,
} from './services'

const router = Router()

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
