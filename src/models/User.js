import mongoose, { Schema } from 'mongoose'
// import timestamp from 'mongoose-timestamp'

const UserSchema = new Schema({
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
  passwordHash: {
    type: String,
    required: true,
  },
})

UserSchema.pre('save', function(next) {
  const user = this

  const hash = makeHash(user.password)

  user.password = hash

  next()
})

export const User = mongoose.model('User', UserSchema)
