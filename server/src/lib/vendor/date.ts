// https://github.com/zk-passport/openpassport/blob/7aba22edf4ceaa6259aef4a0984dd54bb821fcb2/common/src/utils/utils.ts#L262-L274
function getCurrentDateYYMMDD(dayDiff: number = 0): number[] {
  const date = new Date()
  date.setDate(date.getDate() + dayDiff) // Adjust the date by the dayDiff
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  const YY = `0${year % 100}`.slice(-2)
  const MM = `0${month}`.slice(-2)
  const DD = `0${day}`.slice(-2)

  const yymmdd = `${YY}${MM}${DD}`
  return Array.from(yymmdd).map((char) => parseInt(char))
}

// https://github.com/zk-passport/openpassport/blob/7aba22edf4ceaa6259aef4a0984dd54bb821fcb2/sdk/utils/utils.ts#L14-L16
export const getCurrentDateFormatted = () => getCurrentDateYYMMDD().map((datePart) => BigInt(datePart).toString())
