import { Strategy as LocalStrategy } from 'passport-local'

import { findUser, createAndSaveUser } from './services'

const verify = async (req, email, password, done) => {
  try {
    const found = await findUser(email)
    if (found) {
      return done(null, false, req.flash('warn', 'Email already registered.'))
    }

    const user = await createAndSaveUser(email, password)
    return done(null, user)
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
