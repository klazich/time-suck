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
        return !user
          ? done(null, false, { message: 'User not found' })
          : !user.validPassword(password)
            ? done(null, false, { message: 'Invalid credentials' })
            : done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)
