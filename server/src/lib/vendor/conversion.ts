// https://github.com/zk-passport/openpassport/blob/7aba22edf4ceaa6259aef4a0984dd54bb821fcb2/common/src/utils/utils.ts#L442-L453
export const bigIntToHex = (bigInt: bigint) => bigInt.toString(16).padStart(32, '0')

export const hexToUUID = (hex: string) =>
  `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`

export const castToUUID = (bigInt: bigint) => hexToUUID(bigIntToHex(bigInt))

export function derToBytes(derValue: string) {
  const bytes = []
  for (let i = 0; i < derValue.length; i++) {
    // @ts-ignore
    bytes.push(derValue.charCodeAt(i))
  }
  return bytes
}

export function splitToWords(number: bigint, wordsize: bigint, numberElement: bigint) {
  let t = number
  const words: string[] = []
  for (let i = BigInt(0); i < numberElement; ++i) {
    const baseTwo = BigInt(2)

    words.push(`${t % BigInt(Math.pow(Number(baseTwo), Number(wordsize)))}`)
    t = BigInt(t / BigInt(Math.pow(Number(BigInt(2)), Number(wordsize))))
  }
  if (!(t == BigInt(0)))
    throw `Number ${number} does not fit in ${(wordsize * numberElement).toString()} bits`
  return words
}

export function unpackReveal(revealedData_packed: string[]): string[] {
  const bytesCount = [31, 31, 28] // nb of bytes in each of the first three field elements
  const bytesArray = revealedData_packed.flatMap((element: string, index: number) => {
    const bytes = bytesCount[index]
    const elementBigInt = BigInt(element)
    const byteMask = BigInt(255) // 0xFF
    const bytesOfElement = [...Array(bytes)].map((_, byteIndex) => {
      return (elementBigInt >> (BigInt(byteIndex) * BigInt(8))) & byteMask
    })
    return bytesOfElement
  })

  return bytesArray.map((byte: bigint) => String.fromCharCode(Number(byte)))
}

export function castToScope(num: bigint): string {
  const str = num.toString().slice(1) // Remove leading '1'
  const charCodes = str.match(/.{1,3}/g) || []
  return String.fromCharCode(...charCodes.map(code => parseInt(code, 10)))
}
