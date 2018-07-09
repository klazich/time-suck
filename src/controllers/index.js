import { Router } from 'express'

import local from './local'

const router = Router()

router.use('/local', local)

router.get('/', (req, res) => {
  res.render('index.ejs', { base: '/local' })
})

export default router
