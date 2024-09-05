import { DEFAULT_RPC_URL, PASSPORT_ATTESTATION_ID } from './vendor/constants'
import type { VerifierOptions } from './vendor/types'

export const defaultOptions: Partial<VerifierOptions> = {
  attestationId: PASSPORT_ATTESTATION_ID,
  requirements: [],
  rpcUrl: DEFAULT_RPC_URL,
  dev_mode: false,
}

export * from './vendor/constants'
