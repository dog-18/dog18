import forge from 'node-forge'
import { SKI_PEM, SKI_PEM_DEV } from './constants/skiPem'
import { derToBytes } from './conversion'

function getCSCAPem(formattedValueAdjusted: string, dev_mode: boolean): string {
  const skiPem = dev_mode ? { ...SKI_PEM, ...SKI_PEM_DEV } : SKI_PEM
  const pem = skiPem[formattedValueAdjusted]
  return pem
}

export function verifyDSCValidity(dscCertificate: forge.pki.Certificate, dev_mode: boolean) {
  const authorityKeyIdentifierExt = dscCertificate.extensions.find(
    (ext) => ext.name === 'authorityKeyIdentifier',
  )
  const value = authorityKeyIdentifierExt.value
  const byteArray = derToBytes(value)
  const formattedValue = byteArray.map((byte) => byte.toString(16).padStart(2, '0')).join('')
  const formattedValueAdjusted = formattedValue.substring(8) // Remove the first '3016' from the formatted string
  const csca_pem = getCSCAPem(formattedValueAdjusted, dev_mode)
  if (csca_pem === null || csca_pem === undefined) {
    console.error('Error: CSCA PEM not found')
    throw new Error('CSCA PEM not found')
  }
  const csca_certificate = forge.pki.certificateFromPem(csca_pem)
  try {
    const caStore = forge.pki.createCaStore([csca_certificate])
    const verified = forge.pki.verifyCertificateChain(caStore, [dscCertificate])
    if (!verified)
      throw new Error('DSC certificate verification failed')
    const currentDate = new Date()
    if (
      currentDate < dscCertificate.validity.notBefore
      || currentDate > dscCertificate.validity.notAfter
    ) {
      throw new Error('DSC certificate is not within its validity period')
    }
    return true
  } catch (error) {
    console.error('DSC certificate validation error:', error)
    return false
  }
}
