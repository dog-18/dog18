export interface VerifierOptions {
  scope: string
  attestationId?: string
  requirements?: string[][]
  rpcUrl?: string
  dev_mode?: boolean
}

export interface OpenPassport1StepInputs {
  dscProof: {
    publicSignals: string[]
    proof: string[]
  }
  dsc: string
  circuit: string
}
