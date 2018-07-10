import { Strategy as LocalStrategy } from 'passport-local'

import { findUser, createAndSaveUser } from './services'

const verify = async (req, email, password, done) => {
  try {
    // First, check if the email is already registered.
    const found = await findUser(email)
    if (found) {
      // Prompt user if the email is already registered.
      return done(
        null,
        false,
        req.flash('message', 'Email already registered.')
      )
    }
    // Second, create and save the new user and return it.
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

// Export the 'local-signup' strategy.
export default new LocalStrategy(options, verify)
