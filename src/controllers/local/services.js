import passport from 'passport'

export const login = (req, res) => {
  // render the page and pass in any flash data if it exists
  res.render('login.ejs', {
    message: req.flash('warn'),
    base: req.baseUrl,
  })
}

export const signup = (req, res) => {
  // render the page and pass in any flash data if it exists
  res.render('signup.ejs', {
    message: req.flash('warn'),
    base: req.baseUrl,
  })
}

export const profile = (req, res) => {
  // render the profile page
  res.render('profile.ejs', {
    message: req.flash('warn'),
    user: req.user,
    base: req.baseUrl,
  })
}

export const logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

export const isLoggedIn = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next()
  // if they aren't redirect them to the home page
  res.redirect('/')
}

export const authenticateLogin = passport.authenticate('local-login', {
  // login form authentication with passport
  successRedirect: '/local/profile',
  failureRedirect: '/local/login',
  failureFlash: true,
})

export const authenticateSignup = passport.authenticate('local-signup', {
  // signup form authentication with passport
  successRedirect: '/local/profile',
  failureRedirect: '/local/signup',
  failureFlash: true,
})
