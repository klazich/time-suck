import { User } from '.'

export const findUser = async email => {
  const found = await User.findOne({ 'local.email': email })
  return found
}

export const createAndSaveUser = async (email, password) => {
  const user = new User({ local: { email }, password })
  await user.save()
  return user
}
