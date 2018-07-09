import { User } from '.'
import { Strategy as LocalStrategy } from 'passport-local'

const options = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}

const verify = (req, email, password, done) => {
  const emailAlreadyRegistered = () =>
    done(null, false, req.flash('warn', 'Email already registered.'))

  User.findOne({ 'local.email': email })
    .then(user => {
      if (user) emailAlreadyRegistered()
      else {
        const newUser = new User({ local: { email }, password })
        return newUser.save()
      }
    })
    .then(user => {
      done(null, user)
    })
    .catch(err => {
      throw err
    })
}

export default new LocalStrategy(options, verify)
