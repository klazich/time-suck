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

  // User name properties
  name: {
    first: {
      type: String,
      required: true,
      trim: true,
    },
    last: {
      type: String,
      required: true,
      trim: true,
    },
  },

  // User password property
  passwordHash: {
    type: String,
    required: true,
  },

  // meta
  socialMediaHandles: {
    type: Map,
    of: String,
  },
})

UserSchema.virtual('fullName')
  .get(function() {
    return `${this.name.first} ${this.name.last}`
  })
  .set(function(v) {
    const names = v.split(' ')
    this.name.first = names[0]
    this.name.last = names[1]
  })

// schema.pre('save', async function() {
//   await doStuff();
//   await doMoreStuff();
// });

export const User = mongoose.model('User', UserSchema)
