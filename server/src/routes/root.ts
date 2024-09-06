import type { Request, Response } from 'express'
import type { OpenPassport1StepInputs } from '../lib/vendor/types'
import { verify } from '../lib/verify'

export const homeHandler = (_: unknown, res: Response) => {
  res.send('Online')
}

export const verifyHandler = async (req: Request, res: Response) => {
  const inputs = req.body as OpenPassport1StepInputs
  try {
    const { valid } = await verify(inputs)
    res.json(valid)
  } catch (e) {
    console.error(e)
    res.status(500).send
  }
}
