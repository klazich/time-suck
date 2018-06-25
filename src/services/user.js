import argon2 from 'argon2'
import passport from 'passport'
import { Strategy } from 'passport-local'
import jwt from 'jsonwebtoken'

import User from '../models/User'

async function registerUser(userObject) {
  let user = new User()

  user.username = userObject.username
  user.email = userObject.email
  // user.fullname

  try {
    user.passwordHash = await hashPassword(userObject.password)
  } catch (err) {
    console.error('Error hashing user password.', err)
  }

  try {
    await user.save()
  } catch (err) {
    console.error('Error saving new user to db.', err)
  }

  return user
}

export const services = {
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
