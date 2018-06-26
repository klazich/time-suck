import mongoose, { Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import argon2 from 'argon2'

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
  async setPassword(password) {
    const user = this

    try {
      user.passwordHash = await argon2.hash(password, { type: argon2.argon2id })
      return user
    } catch (error) {
      console.error('Error hashing user password', error)
    }
  },

  async validPassword(password) {
    const user = this

    try {
      const match = await argon2.verify(user.passwordHash, password)
      return match
    } catch (error) {
      console.error('Error verifying user password', error)
    }
  },

  generateJwt() {
    const user = this

    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
    }

    return jwt.sign(payload, JWT_SECRET, { expiresIn: '6h' })
  },
}

export default userSchema // testing

mongoose.model('User', userSchema)
