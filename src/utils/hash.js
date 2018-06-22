import argon2 from 'argon2'

export async function makeHash(password) {
  try {
    const hash = await argon2.hash(password)
  } catch (err) {
    console.error('Internal Error!', err)
  }

  return hash
}

export async function verifyPassword(hash, password) {
  try {
    const match = await argon2.verify(hash, password)
  } catch (err) {
    console.error('Internal Error!', err)
  }

  return match
}
