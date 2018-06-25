import express, { Router } from 'express'
import bodyparser from 'body-parser'

router = Router()

router.use(bodyparser.urlencoded({ extended: true }))
router.use(bodyparser.json())

import User from './model'
import services from './services'

router.post('/', (req, res) => {
  /* Create a new user in the database. */
  try {
    const user = services.registerUser(req.body)
    res.status(200).send(user)
  } catch (err) {
    console.error('Error calling "services.registerUser"')
    res
      .status(500)
      .send('There was a problem adding the information to the database.')
  }
})

router.get('/', (req, res) => {
  /* Fetch all Users in the database. */
})

router.get('/:id', (req, res) => {
  /* Fetch a single User with "id" from the database. */
})

router.delete('/:id', (req, res) => {
  /* Remove a single User with "id" from the database. */
})

router.put('/:id', (req, res) => {
  /* Update a single User with "id" in the database. */
})
