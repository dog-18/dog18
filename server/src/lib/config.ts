interface Config {
  cookie: {
    name: string
    expiresAfterDays: number
  }
  verifier: {
    dev_mode: boolean
    requirements: [[string, string]]
    scope: string
  }
}

export const config: Config = {
  cookie: {
    expiresAfterDays: 1,
    name: 'authorized',
  },
  verifier: {
    dev_mode: true,
    requirements: [['older_than', '18']],
    scope: 'prndog',
  },
}
