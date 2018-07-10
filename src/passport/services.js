import { User } from '.'

// Async, find a user by 'user.local.email'.
export const getUserByEmail = async email => {
  const found = await User.findOne({ 'local.email': email })
  return found
}

// Async, find a user by 'user.id'
export const getUserById = async id => {
  const found = await User.findById(id)
  return found
}

// Async - create a new user and save to database.
export const createAndSaveUser = async (email, password) => {
  const user = new User({ local: { email }, password })
  await user.save()
  return user
}
