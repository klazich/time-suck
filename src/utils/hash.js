import bcrypt from 'bcrypt'

const saltRounds = 15

export async function getHash(password) {
  const hashed = await bcrypt.hash(password, saltRounds)

  return hashed
}

export async function checkPassword(password, passwordHash) {
  const match = await bcrypt.compare(password, passwordHash)

  return match
}
