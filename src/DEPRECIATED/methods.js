export const userMethods = {
  async setPassword(password) {
    const user = this

    try {
      user.passwordHash = await argon2.hash(password, { type: argon2.argon2id })
      return user
    } catch (error) {
      console.error('[server/auth] error hashing user password', error)
    }
  },

  async validPassword(password) {
    const user = this

    try {
      const match = await argon2.verify(user.passwordHash, password)
      return match
    } catch (error) {
      console.error('[server/auth] error verifying user password', error)
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
