import argon2 from 'argon2'

export async function makeHash(password) {
  try {
    return await argon2.hash(password)
  } catch (err) {
    return console.error('Internal Error!', err)
  }
}

export async function verifyPassword(hash, password) {
  try {
    const match = await argon2.verify(hash, password)
  } catch (err) {
    console.error('Internal Error!', err)
  }
  return match
}
