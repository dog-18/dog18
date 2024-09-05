import { Elysia } from 'elysia'

const app = new Elysia().post('/', () => true).listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
