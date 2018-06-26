import passport from 'passport'
import mongoose from 'mongoose'

const User = mongoose.model('User')

// export function register(req, res) {
//   console.log(` -> Registering user: ${req.body.email}`)

//   res.status(200)
//   res.json({
//     message: `User registered: ${req.body.email}`,
//   })
// }

export function login(req, res) {
  console.log(` -> Logging user in: ${req.body.email}`)

  res.status(200)
  res.json({
    message: `User login: ${req.body.email}`,
  })
}

export const register = async (req, res) => {
  const user = new User()

  user.name = req.body.name
  user.email = req.body.email

  try {
    const savedUser = await user.save()
  } catch (error) {
    console.error('Error ', error)
  }
}
