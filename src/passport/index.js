import passport from 'passport'

import { getUserById } from './services'
export { User } from '../database'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const found = await getUserById(id)
    return done(null, found)
  } catch (err) {
    return done(err)
  }
})

import localSignupStrategy from './local-signup'
import localLoginStrategy from './local-login'
import jwtValidateStrategy from './jwt-validate'

passport.use('local-signup', localSignupStrategy)
passport.use('local-login', localLoginStrategy)
passport.use('jwt-validate', jwtValidateStrategy)
