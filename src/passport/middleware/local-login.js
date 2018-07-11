import { Strategy as LocalStrategy } from 'passport-local'

import { getUserByEmail } from '../services'

const verify = async (req, email, password, done) => {
  try {
    // First, try to find the user by email.
    const found = await getUserByEmail(email)
    if (!found) {
      // Prompt user if the email is not found.
      return done(null, false, { message: 'User not found' })
    }
    // Second, authenticate the password.
    const authenticated = await found.authenticate(password)
    return authenticated
      ? // Last, pass the user to the next middleware if valid.
        done(null, found, { message: 'Logged in Successfully' })
      : // Otherwise, prompt user th password is incorrect.
        done(null, false, { message: 'Incorrect email or password' })
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
