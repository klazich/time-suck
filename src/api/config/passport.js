import passport from 'passport'
import LocalStrategy from 'passport-local'
import mongoose from 'mongoose'

const User = mongoose.model('User')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // use email instead of a username
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ email: username })

        // Check for user in the database
        if (!user) {
          return done(null, false, { message: 'User not found' })
        }

        // Validate password
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Invalid credentials' })
        }

        // Else, return the user object
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)
