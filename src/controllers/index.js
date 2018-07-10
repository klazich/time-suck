import { Router } from 'express'

import local from './local'

const router = Router()

router.use('/local', local)

router.route('/').get((req, res) => {
  res.render('index.ejs', { base: '/local' })
})

router.route('/profile').get(
  (req, res, next) => {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next()
    // if they aren't redirect them to the home page
    res.redirect('/')
  },
  (req, res) => {
    // render the profile page
    res.render('profile.ejs', {
      message: req.flash('message'),
      user: req.user,
      base: req.baseUrl,
    })
  }
)

export default router
