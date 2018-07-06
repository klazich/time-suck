import { Strategy as LocalStrategy } from 'passport-local'

import User from '../app/models/user'

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
      (req, email, password, done) => {
        User.findOne({ 'local.email': email }, (err, user) => {
          if (err) return done(err)

          if (user) {
            return done(
              null,
              false,
              req.flash('signupMessage', 'That email is already registered.')
            )
          } else {
            User.create({
              local: { email },
              password,
            })
              .then(user => {
                done(null, user)
              })
              .catch(err => {
                throw err
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
        const userNotFound = () =>
          done(null, false, req.flash('loginMessage', 'No user found.'))
        const authenticationFailed = () =>
          done(
            null,
            false,
            req.flash('loginMessage', 'Incorrect email or password.')
          )

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

        // User.findOne({ 'local.email': email }, (err, user) => {
        //   if (err) return done(err)

        //   // if no user is found, return the message
        //   if (!user)
        //     return done(
        //       null,
        //       false,
        //       req.flash('loginMessage', 'No user found.')
        //     )

        //   // authenticate the password if the user was found
        //   user
        //     .authenticate(password)
        //     .then(authenticated => {
        //       authenticated
        //         ? done(null, user)
        //         : done(
        //             null,
        //             false,
        //             req.flash(
        //               'loginMessage',
        //               'Incorrect email or password entered.'
        //             )
        //           )
        //     })
        //     .catch(err => {
        //       throw err
        //     })
        // })
      }
    )
  )
}
