import { User } from '.'
import { Strategy as LocalStrategy } from 'passport-local'

const options = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}

const verify = (req, email, password, done) => {
  const userNotFound = () =>
    done(null, false, req.flash('loginMessage', 'No user found.'))
  const authenticationFailed = () =>
    done(null, false, req.flash('loginMessage', 'Incorrect email or password.'))

  User.findOne({ 'local.email': email })
    .then(user => {
      user
        ? user.authenticate(password).then(authenticated => {
            authenticated ? done(null, user) : authenticationFailed()
          })
        : userNotFound()
    })
    .catch(err => {
      throw err
    })
}

export default new LocalStrategy(options, verify)
