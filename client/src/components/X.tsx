import { useAuthorized } from 'h/useAuthorized'

export function X() {
  useAuthorized()
  return <h1>Protected Page</h1>
}
