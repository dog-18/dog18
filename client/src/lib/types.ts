import type { SocketStatus } from 'l/constants'
import type { randomUUID } from 'node:crypto'

export interface OpenPassportQRcodeProps {
  appName: string
  scope: string
  userId: string
  requirements: any[]
  // TODO: add better type
  // @ts-ignore
  onSuccess: (result: any) => void
  devMode?: boolean
}

export type OnSuccessCb = OpenPassportQRcodeProps['onSuccess']
export type Id = ReturnType<typeof randomUUID>

export type ConnectionStatus = SocketStatus.DISCONNECTED | SocketStatus.WEB_CONNECTED | SocketStatus.MOBILE_CONNECTED

export type CircuitName = 'prove' | 'register' | 'disclose'
export interface ArgumentsProve {
  disclosureOptions: {
    older_than?: string
    nationality?: string
  }
}

export interface ArgumentsRegister {
  attestation_id: string
}

export interface ArgumentsDisclose {
  disclosureOptions: {
    older_than?: string
    nationality?: string
  }
  merkle_root: string
  merkletree_size: string
}
export interface AppType {
  name: string
  scope: string
  userId: string
  sessionId: string
  circuit: CircuitName
  arguments: ArgumentsProve | ArgumentsRegister | ArgumentsDisclose
  getDisclosureOptions?: () => Record<string, string>
}
