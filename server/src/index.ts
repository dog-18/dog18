import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'
import type { OpenPassport1StepInputs } from './lib/vendor/types'
import { verify } from './lib/verify'

// FIXME validate body
const app = new Elysia().use(cors())
  .get('/', () => 'Online')
  .post(
    '/',
    async ({ body }) => verify(body as OpenPassport1StepInputs).then(({ valid }) => valid),
  ).listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
