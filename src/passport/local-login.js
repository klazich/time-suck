import { Strategy as LocalStrategy } from 'passport-local'

import { findUser } from './services'

const verify = async (req, email, password, done) => {
  try {
    // First, try to find the user by email.
    const found = await findUser(email)
    if (!found) {
      // Prompt user if the email is not found.
      return done(null, false, req.flash('message', 'No user found.'))
    }
    // Second, authenticate the password .
    const authenticated = await found.authenticate(password)
    if (!authenticated) {
      // Prompt user if password is incorrect.
      return done(
        null,
        false,
        req.flash('warn', 'Incorrect email or password.')
      )
    }
    // Last, return user if password is correct.
    return done(null, found, req.flash('message', 'Logged In successfully.'))
  } catch (err) {
    return done(err)
  }
}

const options = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}

// Export the 'local-login' strategy.
export default new LocalStrategy(options, verify)
