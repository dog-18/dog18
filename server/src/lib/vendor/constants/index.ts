// https://github.com/zk-passport/openpassport/blob/7aba22edf4ceaa6259aef4a0984dd54bb821fcb2/common/src/constants/constants.ts#L13C1-L13C118
export const PASSPORT_ATTESTATION_ID = '8518753152044246090169372947057357973469996808638122125210848696986717482788'
// https://github.com/zk-passport/openpassport/blob/7aba22edf4ceaa6259aef4a0984dd54bb821fcb2/common/src/constants/constants.ts#L323
export const DEFAULT_RPC_URL = 'https://mainnet.optimism.io'

// https://github.com/zk-passport/openpassport/blob/7aba22edf4ceaa6259aef4a0984dd54bb821fcb2/common/src/constants/constants.ts#L39
export const attributeToPosition = {
  issuing_state: [2, 4],
  name: [5, 43],
  passport_number: [44, 52],
  nationality: [54, 56],
  date_of_birth: [57, 62],
  gender: [64, 64],
  expiry_date: [65, 70],
  older_than: [88, 89],
}

export * from './country-codes'
export * from './vkey'
