// https://gitlab.com/sharkattack/express-authentication/blob/master/middleware/middleware.js

import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export default {
  authenticateUser,
}

function authenticateUser(req, res, next) {
  const token = req.query.jwtToken

  if (token) {
  } else {
    return res.redirect
  }
}
