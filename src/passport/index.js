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

import localSignupStrategy from './middleware/local-signup'
import localLoginStrategy from './middleware/local-login'
import jwtValidateStrategy from './middleware/jwt-validate'

passport.use('local-signup', localSignupStrategy)
passport.use('local-login', localLoginStrategy)
passport.use('jwt-validate', jwtValidateStrategy)
