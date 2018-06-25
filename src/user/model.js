import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
})

mongoose.model('User', UserSchema)

export const User = mongoose.model('User')
