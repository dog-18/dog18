import { OpenPassport1StepVerifier } from '@openpassport/sdk'
import { config } from 'l/config'

export const verifier = new OpenPassport1StepVerifier({
  scope: config.openPassport.scope,
  requirements: config.openPassport.requirements,
})
