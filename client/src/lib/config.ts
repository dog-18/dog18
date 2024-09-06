interface Config {
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

export const config: Config = {
  openPassport: {
    appName: 'Hello OpenPassport',
    requirements: [['older_than', '18']],
    devMode: process.env.NODE_ENV === 'development',
    scope: 'prndog',
    size: 300,
  },
  cookie: { expiresAfterDays: 1, name: 'authorized' },
  verifServerUrl: process.env.NODE_ENV === 'production' ? 'https://prndog-server.fly.dev' : 'http://localhost:3000',
}
