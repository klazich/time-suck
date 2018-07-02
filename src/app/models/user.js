import mongoose, { Schema } from 'mongoose'
import argon2 from 'argon2'

const userSchema = Schema({
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

// User virtual properties
userSchema.virtual('password').set(password => {
  this._password = password
  this.local.hash = this.generateHash(password)
})

// User methods
userSchema.methods = {
  generateHash: async function(password) {
    return argon2.hash(password, { type: argon2.argon2id })
  },

  authenticate: async function(password) {
    return argon2.verify(this.local.hash, password)
  },
}

// User middleware
// userSchema.pre('save', async () => {})

export default mongoose.model('User', userSchema)
