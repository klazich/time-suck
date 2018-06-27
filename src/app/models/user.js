import mongoose, { Schema } from 'mongoose'
import argon2 from 'argon2'

const userSchema = Schema({
  local: {
    email: String,
    password: String,
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

userSchema.methods = {
  generateHash: async password =>
    await argon2.hash(password, { type: argon2.argon2id }),
  validPassword: async password =>
    await argon2.verify(this.local.password, password),
}

const log = m => new Promise.resolve(console.log(m))

userSchema.pre('save', async () => {
  try {
    await log('... saving user')
  } catch (err) {
    console.error(err)
  }
})

export default mongoose.model('User', userSchema)
