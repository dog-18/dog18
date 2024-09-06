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

const scope = process.env.SCOPE ?? ''
if (scope === '') throw new Error('SCOPE is not defined')

export const config: Config = {
  appName: scope,
  openPassport: {
    appName: scope,
    requirements: [['older_than', '18']],
    devMode: process.env.NODE_ENV === 'development',
    scope,
    size: 300,
  },
  cookie: { expiresAfterDays: 1, name: 'authorized' },
  verifServerUrl: process.env.NODE_ENV === 'production' ? 'https://dog18.fly.dev' : 'http://localhost:3000',
}
