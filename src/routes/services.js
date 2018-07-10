import passport from 'passport'

/**
 *  Passport's authenticate options
 *
 *  successRedirect, failureRedirect ................................... string
 *    Path to redirect to on a success/failure (failure defaults
 *    to 401).
 *  successFlash, failureFlash ................................. string|boolean
 *    True to flash success/failure messages or a string to use
 *    as a flash message for success/failure (overrides any from
 *    the strategy itself).
 *  successMessage, failureMessage ............................. boolean|string
 *    True to store success/failure message in req.session.messages,
 *    or a string to use as override message for success/failure.
 *  session ........................................................... boolean
 *    Enables session support (default true).
 *  failWithError ..................................................... boolean
 *    On failure, call next() with an AuthenticationError instead
 *    of just writing a 401.
 */

export const authenticationCheck = (req, res, next) => {
  req.isAuthenticated()
    ? // If user is authenticated, continue.
      next()
    : // if user is not authenticated redirect them back or to home.
      res.redirect(req.header('Referer') || '/')
}

export const profile = (req, res) => {
  res.render('profile.ejs', {
    message: req.flash('message'),
    user: req.user,
  })
}

export const login = (req, res) => {
  res.render('login.ejs', {
    message: req.flash('message'),
  })
}

export const logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

export const signup = (req, res) => {
  res.render('signup.ejs', {
    message: req.flash('message'),
  })
}

export const localLoginMiddleware = passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
})

export const localSignupMiddleware = passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
})

export const jwtMiddleware = passport.authenticate('jwt', {})

export default {
  authenticationCheck,
  profile,
  login,
  logout,
  signup,
  localLoginMiddleware,
  localSignupMiddleware,
}
