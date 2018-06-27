const home = function(req, res) {
  res.render('index.ejs')
}

const login = (req, res) => {
  // render the page and pass in any flash data if it exists
  res.render('login.ejs', { message: req.flash('loginMessage') })
}

const signUp = (req, res) => {
  // render the page and pass in any flash data if it exists
  res.render('signup.ejs', { message: req.flash('signupMessage') })
}

const profile = function(req, res) {
  res.render('profile.ejs', {
    user: req.user,
  })
}

const logout = function(req, res) {
  req.logout()
  res.redirect('/')
}

const isLoggedIn = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next()

  // if they aren't redirect them to the home page
  res.redirect('/')
}

export default (app, passport) => {
  // HOME PAGE (with login links) ========
  app.get('/', home)

  // LOGIN ===============================
  // show the login form
  app.get('/login', login)

  // process the login form
  // app.post('/login', do all our passport stuff here);

  // SIGNUP ==============================
  // show the signup form
  app.get('/signup', signUp)

  // process the signup form
  // app.post('/signup', do all our passport stuff here);

  // PROFILE SECTION =====================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, profile)

  // LOGOUT ==============================
  app.get('/logout', logout)
}
