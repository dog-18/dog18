import { getCircuitName } from './certificate'
import { vkey_prove_rsa_65537_sha1, vkey_prove_rsa_65537_sha256, vkey_prove_rsapss_65537_sha256 } from './constants'

export function getVkey(circuit: string, signatureAlgorithm: string, hashFunction: string) {
  const circuitName = getCircuitName(circuit, signatureAlgorithm, hashFunction)
  switch (circuitName) {
    case 'prove_rsa_65537_sha256':
      return vkey_prove_rsa_65537_sha256
    case 'prove_rsa_65537_sha1':
      return vkey_prove_rsa_65537_sha1
    case 'prove_rsapss_65537_sha256':
      return vkey_prove_rsapss_65537_sha256
    default:
      throw new Error('Invalid signature algorithm or hash function')
  }
}
