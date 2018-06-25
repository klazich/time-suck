import argon2 from 'argon2'
import passport from 'passport'
import { Strategy } from 'passport-local'
import jwt from 'jsonwebtoken'

import User from './models'

const JWT_SECRET = process.env.JWT_SECRET

// Configure Passport
passport.use(new Strategy())

async function registerUser(userObject) {
  try {
    const hashedPassword = await hashPassword(userObject.password)
  } catch (err) {
    console.error('Error hashing user password.', err)
  }

  try {
    const user = User.create({
      name: userObject.name,
      email: userObject.email,
      password: await hashedPassword,
    })
  } catch (err) {
    console.error('Error adding new user to db.', err)
  }

  return await user
}

export default {
  registerUser,
}

async function hashPassword(password) {
  const opts = {
    ...argon2.defaults,
    type: argon2.argon2id,
  }
  const hash = await argon2.hash(password, opts)

  return hash
}

async function verifyPassword(user, password) {
  const isMatch = await argon2.verify(user.passwordHash, password)

  return isMatch
}

// ---

export function verifyJwt(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error || !decoded) {
        return reject(error)
      }

      resolve(decoded)
    })
  })
}

function generateJwt(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    exp: new Date().valueOf() + 1000 * 60 * 60 * 6,
  }
  return jwt.sign(payload, JWT_SECRET)
}
