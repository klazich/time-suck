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
userSchema.virtual('password').set(async function(password) {
  // this._password = password
  console.dir(this)
  console.log(password)
  this.local.hash = await this.generateHash(password)
  console.log(this.local.hash)
  console.dir(this)
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
