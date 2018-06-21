import mongoose from 'mongoose'

import { getHash, checkPassword } from '../utils/hash'

const UserSchema = new mongoose.Schema({
  // User email property
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },

  // User username property
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },

  // User password property
  password: {
    type: String,
    required: true,
  },
  passwordConfirm: {
    type: String,
    required: true,
  },
})

UserSchema.pre('save', function(next) {
  const user = this

  const hash = getHash(user.password)

  user.password = hash

  next()
})

export const User = mongoose.model('User', UserSchema)
