import { Router } from 'express'
import { homeHandler, verifyHandler } from './root'

const router = Router()

router.get('/', homeHandler)
  .post('/', verifyHandler)

export { router }
