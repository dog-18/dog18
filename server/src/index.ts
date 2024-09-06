import cors from 'cors'
import express, { type Request, type Response } from 'express'
import type { OpenPassport1StepInputs } from './lib/vendor/types'
import { verify } from './lib/verify'

const app = express()
const port = Number.parseInt(process.env.PORT || '3000', 10)
const host = process.env.HOST || 'localhost'

app.use(cors())
app.use(express.json())

app.get('/', (_, res: Response) => {
  res.send('Online')
})

app.post('/', async (req: Request, res: Response) => {
  const inputs = req.body as OpenPassport1StepInputs
  try {
    const { valid } = await verify(inputs)
    res.json(valid)
  } catch (e) {
    console.error(e)
    res.status(500).send('Error')
  }
})

app.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`)
})
