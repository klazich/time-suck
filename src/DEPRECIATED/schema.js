import mongoose, { Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import argon2 from 'argon2'

import { userMethods } from './methods'

const JWT_SECRET = process.env.JWT_SECRET

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  passwordHash: {
    type: String,
  },
})

userSchema.methods = {
  ...userMethods,
}

// export default userSchema // testing

mongoose.model('User', userSchema)
