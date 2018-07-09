import { Strategy as LocalStrategy } from 'passport-local'

import { findUser } from './services'

const verify = async (req, email, password, done) => {
  try {
    const found = await findUser(email)
    if (!found) {
      return done(null, false, req.flash('warn', 'No user found.'))
    }

    const authenticated = await found.authenticate(password)
    if (!authenticated) {
      return done(
        null,
        false,
        req.flash('warn', 'Incorrect email or password.')
      )
    }

    return done(null, found, req.flash('warn', 'Logged In successfully.'))
  } catch (err) {
    return done(err)
  }
}

const options = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}

export default new LocalStrategy(options, verify)
