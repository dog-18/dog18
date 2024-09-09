import type { Metadata } from 'next'

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

const scope = process.env.NEXT_PUBLIC_SCOPE ?? ''
if (scope === '') throw new Error('NEXT_PUBLIC_SCOPE is not defined')

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
  verifServerUrl: process.env.NODE_ENV === 'production' ? 'https://dog18.fly.dev' : 'http://localhost:3001',
}

export const metadata: Metadata = {
  description: "Nobdy knows you're a dog, but we'll check you're 18",
  title: 'Dog18',
}
