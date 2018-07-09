import passport from 'passport'
// import { Strategy as LocalStrategy } from 'passport-local'

export { User } from '../../database/models/user'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

import localSignup from './local-signup'
import localLogin from './local-login'

passport.use('local-signup', localSignup)
passport.use('local-login', localLogin)
