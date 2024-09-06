import express from 'express'
import { middlewares } from './middlewares'
import { router } from './routes'

const app = express()
app.use([...middlewares, router])

export { app }
