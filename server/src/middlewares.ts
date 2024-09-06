import cors from 'cors'
import express from 'express'

export const middlewares = [cors(), express.json()]
