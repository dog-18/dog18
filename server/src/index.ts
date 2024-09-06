import { app } from './app'

const port = Number.parseInt(process.env.PORT || '3000', 10)
const host = process.env.HOST || 'localhost'

app.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`)
})
