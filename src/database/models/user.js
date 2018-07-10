import mongoose, { Schema } from 'mongoose'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

// User Schema ////////////////////////////////////////////////////////////////
export const userSchema = Schema({
  local: {
    email: {
      type: String,
      unique: true,
      index: {
        unique: true,
      },
    },
    hash: {
      type: String,
      default: '',
    },
  },
  facebook: {
    id: String,
    token: String,
    name: String,
    email: String,
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
})

// User Virtuals //////////////////////////////////////////////////////////////
userSchema.virtual('password').set(async function(password) {
  this._password = password
})

// User Methods ///////////////////////////////////////////////////////////////
userSchema.methods = {
  generateHash: async function(password) {
    return argon2.hash(password, { type: argon2.argon2id })
  },

  authenticate: async function(password) {
    return argon2.verify(this.local.hash, password)
  },

  generateToken: function() {
    return jwt.sign(this, process.env.JWT_SECRET)
  },
}

// User Middleware ////////////////////////////////////////////////////////////
userSchema.pre('save', async function(next) {
  if (this._password) {
    try {
      const hash = await this.generateHash(this._password)
      this.local.hash = hash
      return next()
    } catch (err) {
      console.error(err)
      return next(err)
    }
  }
})

// Compile and export the User model
export const User = mongoose.model('User', userSchema)
