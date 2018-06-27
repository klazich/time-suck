import passport from 'passport'
import mongoose from 'mongoose'

const User = mongoose.model('User')

export const register = async (req, res) => {
  const user = new User()

  user.name = req.body.name
  user.email = req.body.email

  try {
    user.setPassword(req.body.password)
    const savedUser = await user.save()

    res.status(200).json({ token: savedUser.generateJwt() })
  } catch (error) {
    console.error('Error registering user', error)

    res.status(500).json(error)
  }
}

export const login = (req, res) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      res.status(404).json(error)
      return
    }

    if (user) {
      res.status(200).json({ token: user.generateJwt() })
    } else {
      res.status(401).json(info)
    }
  })(req, res)
}
