import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

import { getUserById } from './services'

const verify = async (jwtPayload, done) => {
  // Find the user in db if needed. This functionality may
  // be omitted if you store everything you'll need in JWT payload.
  try {
    // First, try to find a user with the id from the JWT payload.
    const found = await getUserById(jwtPayload.id)
    return found
      ? // Return user if it was found.
        done(null, found)
      : // Prompt user if the id is not found.
        done(null, false, req.flash('message', 'No user found.'))
  } catch (err) {
    return done(err)
  }
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

// Export the 'jwt-validate' strategy.
export default new JwtStrategy(options, verify)
