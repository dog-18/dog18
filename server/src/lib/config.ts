interface Config {
  verifier: {
    dev_mode: boolean
    requirements: [[string, string]]
    scope: string
  }
}

export const config: Config = {
  verifier: {
    dev_mode: true,
    requirements: [['older_than', '18']],
    scope: 'prndog',
  },
}
