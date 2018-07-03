import { Strategy as LocalStrategy } from 'passport-local'

import User from '../app/models/user'

// expose this function to our app using module.exports
export default passport => {
  // PASSPORT SESSION SETUP ////////////////////////////////////////////////////
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  // LOCAL SIGNUP STRATEGY /////////////////////////////////////////////////////
  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'email', // override passports default lookup keys
        passwordField: 'password',
        passReqToCallback: true,
        // ^^^ allows us to pass back the entire request to the callback
      },
      async (req, email, password, done) => {
        // User.findOne wont fire unless data is sent back
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists

        try {
          const found = await User.findOne({ 'local.email': email })
        } catch (error) {
          done(
            error,
            false,
            req.flash('signupMessage', 'Internal database error.')
          )
        }

        if (found) {
          done(
            null,
            false,
            req.flash('signupMessage', 'That email is already registered.')
          )
        } else {
          const newUser = new User({ local: { email } })
          newUser.password = password
        }

        User.findOne({ 'local.email': email }, (err, user) => {
          // if there are any errors, return the error
          if (err) return done(err)

          // check to see if theres already a user with that email
          if (user) {
            return done(
              null,
              false,
              req.flash('signupMessage', 'That email is already registered.')
            )
          } else {
            // if there is no user with that email create the user
            var newUser = new User()

            // set the user's local credentials
            newUser.local.email = email
            newUser.password = password

            // const saved = await newUser()

            newUser
              .save()
              .then(user => done(null, user))
              .catch(error => {
                throw error
              })
          }
        })
      }
    )
  )

  // LOCAL LOGIN STRATEGY //////////////////////////////////////////////////////
  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        // ^^^ allows us to pass back the entire request to the callback
      },
      (req, email, password, done) => {
        // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email': email }, (err, user) => {
          // if there are any errors, return the error before anything else
          if (err) return done(err)

          // if no user is found, return the message
          if (!user)
            return done(
              null,
              false,
              req.flash('loginMessage', 'No user found.')
            ) // req.flash is the way to set flashdata using connect-flash

          // if the user is found but the password is wrong
          if (!user.authenticate(password))
            return done(
              null,
              false,
              req.flash('loginMessage', 'Oops! Wrong password.')
            ) // create the loginMessage and save it to session as flashdata

          // all is well, return successful user
          return done(null, user)
        })
      }
    )
  )
}
