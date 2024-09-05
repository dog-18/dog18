import forge from 'node-forge'
import { groth16 } from 'snarkjs'
import { config } from './config'
import { attributeToPosition, countryCodes, defaultOptions } from './constants'
import { runSnarkjsVerification } from './run-snarkjs-verification'
import { getSignatureAlgorithm } from './vendor/certificate'
import { getVkey } from './vendor/circuit'
import { bigIntToHex, castToScope, splitToWords, unpackReveal } from './vendor/conversion'
import { getCurrentDateFormatted } from './vendor/date'
import { OpenPassportVerifierReport } from './vendor/OpenPassportVerifierReport'
import type { OpenPassport1StepInputs, VerifierOptions } from './vendor/types'
import { verifyDSCValidity } from './vendor/verify-dsc-validity'

const parsePublicSignals1Step = (publicSignals: string[]) => ({
  signature_algorithm: publicSignals[0],
  revealedData_packed: publicSignals.slice(1, 4),
  nullifier: publicSignals[4],
  pubKey: publicSignals.slice(5, 37),
  scope: publicSignals[37],
  current_date: publicSignals.slice(38, 44),
  user_identifier: publicSignals[44],
})

const verifyScope = (expectedScope: string, actualScope: string, report: OpenPassportVerifierReport) => {
  if (expectedScope !== actualScope)
    report.exposeAttribute('scope', actualScope, expectedScope)
  console.log('\x1b[32m%s\x1b[0m', `- scope verified`)
}

const verifyDate = (parsedCurrentDate: string[], report: OpenPassportVerifierReport) => {
  const currentDate = getCurrentDateFormatted()
  if (parsedCurrentDate.toString() !== currentDate.toString())
    report.exposeAttribute('current_date', parsedCurrentDate, currentDate)
  console.log('\x1b[32m%s\x1b[0m', `- current_date verified`)
}

const verifyRequirements = (
  requirements: string[][],
  unpackedReveal: string[],
  report: OpenPassportVerifierReport,
) => {
  for (const [attribute, value] of requirements) {
    const position = attributeToPosition[attribute]
    let attributeValue = ''
    for (let i = position[0]; i <= position[1]; i++)
      attributeValue += unpackedReveal[i]

    if (attribute === 'nationality' || attribute === 'issuing_state') {
      if (!countryCodes[attributeValue] || countryCodes[attributeValue] !== value)
        report.exposeAttribute(attribute as keyof OpenPassportVerifierReport)
    } else {
      if (attributeValue !== value)
        report.exposeAttribute(attribute as keyof OpenPassportVerifierReport)
    }
    console.log('\x1b[32m%s\x1b[0m', `- requirement ${attribute} verified`)
  }
}

const arraysEqual = (arr1: string[], arr2: string[]) =>
  arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index])

const verifyProof = async (
  vkey: any,
  publicSignals: string[],
  proof: any,
  report: OpenPassportVerifierReport,
) => {
  groth16.verify(vkey, publicSignals, proof).then(valid => {
    if (valid === false)
      report.exposeAttribute('proof')
  })
  console.log('\x1b[32m%s\x1b[0m', `- proof verified`)
}

const verifyCertificate = (
  dsc: string,
  parsedPublicKey: string[],
  dev_mode: boolean,
) => {
  const dscCertificate = forge.pki.certificateFromPem(dsc)
  const verified_certificate = verifyDSCValidity(dscCertificate, dev_mode)
  console.log('\x1b[32m%s\x1b[0m', 'certificate verified:' + verified_certificate)

  // @ts-ignore
  const dsc_modulus = BigInt(dscCertificate.publicKey.n)
  const dsc_modulus_words = splitToWords(dsc_modulus, BigInt(64), BigInt(32))

  const verified_modulus = arraysEqual(dsc_modulus_words, parsedPublicKey)
  console.log('\x1b[32m%s\x1b[0m', 'modulus verified:' + verified_modulus)
}

const _verify = async (
  inputs: OpenPassport1StepInputs,
  options: VerifierOptions,
): Promise<OpenPassportVerifierReport> => {
  const opts = Object.assign({}, defaultOptions, options)
  const report = new OpenPassportVerifierReport()

  const { signatureAlgorithm, hashFunction } = getSignatureAlgorithm(inputs.dsc)
  const vkey = getVkey(inputs.circuit, signatureAlgorithm, hashFunction)
  const parsedPublicSignals = parsePublicSignals1Step(inputs.dscProof.publicSignals)

  // @ts-ignore
  verifyScope(opts.scope, castToScope(parsedPublicSignals.scope), report)
  verifyDate(parsedPublicSignals.current_date, report)

  const unpackedReveal = unpackReveal(parsedPublicSignals.revealedData_packed)
  verifyRequirements(opts.requirements!, unpackedReveal, report)

  const valid = await runSnarkjsVerification(vkey, inputs.dscProof.publicSignals, inputs.dscProof.proof)
  if (valid === false) report.exposeAttribute('proof')

  report.nullifier = bigIntToHex(BigInt(parsedPublicSignals.nullifier))
  report.user_identifier = bigIntToHex(BigInt(parsedPublicSignals.user_identifier))

  // 5. Verify the DSC
  verifyCertificate(inputs.dsc, parsedPublicSignals.pubKey, opts.dev_mode!)

  return report
}

export const verify = (inputs: OpenPassport1StepInputs) => _verify(inputs, config.verifier)
