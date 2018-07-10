import { User } from '.'

// Async - find user by email.
export const findUser = async email => {
  const found = await User.findOne({ 'local.email': email })
  return found
}

// Async - create a new user and save to database.
export const createAndSaveUser = async (email, password) => {
  const user = new User({ local: { email }, password })
  await user.save()
  return user
}
