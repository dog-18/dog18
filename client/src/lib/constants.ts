export const SOCKET_URL = 'https://proofofpassport-merkle-tree.xyz'
export const SOCKET_PATH = '/websocket'

export enum SocketStatus {
  DISCONNECTED = 'disconnected',
  WEB_CONNECTED = 'web_connected',
  MOBILE_CONNECTED = 'mobile_connected',
  PROOF_GENERATION_STARTED = 'proof_generation_started',
  PROOF_GENERATED = 'proof_generated',
  PROOF_GENERATION_FAILED = 'proof_generation_failed',
  MOBILE_DISCONNECTED = 'mobile_disconnected',
}

export enum ProofStep {
  WAITING_FOR_MOBILE = 0,
  MOBILE_CONNECTED = 1,
  PROOF_GENERATION_STARTED = 2,
}

export enum Links {
  ANDROID_APP = 'https://play.google.com/store/apps/details?id=com.proofofpassportapp',
  GITHUB = 'https://github.com/dog-18/dog18',
  IOS_APP = 'https://apps.apple.com/us/app/proof-of-passport/id6478563710',
}
