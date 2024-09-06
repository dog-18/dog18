interface Config {
  appName: string
  openPassport: {
    appName: string
    devMode: boolean
    requirements: [[string, string]]
    scope: string
    size: number
  }
  cookie: { name: string; expiresAfterDays: number }
  verifServerUrl: string
}

const appName = 'dog18'

export const config: Config = {
  appName,
  openPassport: {
    appName,
    requirements: [['older_than', '18']],
    devMode: process.env.NODE_ENV === 'development',
    scope: 'dog18',
    size: 300,
  },
  cookie: { expiresAfterDays: 1, name: 'authorized' },
  verifServerUrl: process.env.NODE_ENV === 'production' ? 'https://dog18.fly.dev' : 'http://localhost:3000',
}
