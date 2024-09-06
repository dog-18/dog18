import { exec } from 'node:child_process'
import { constants as fsConstants } from 'node:fs'
import { access, mkdir, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'

const execPromise = promisify(exec)

const tmpDir = path.join(__dirname, 'tmp')

const ensureDirExists = async (dirPath: string) => {
  try {
    await access(dirPath, fsConstants.F_OK) // Check if directory exists
  } catch (err) {
    await mkdir(dirPath, { recursive: true }) // Create directory if it does not exist
  }
}

const writeTempFile = async (filename: string, data: any) => {
  await ensureDirExists(tmpDir)
  const filePath = path.join(tmpDir, filename)
  await writeFile(filePath, JSON.stringify(data))
  return filePath
}

const cleanUpTempFile = async (filePath: string) => {
  try {
    await unlink(filePath)
  } catch (err) {
    console.error('Failed to clean up temp file:', err)
  }
}

// i experienced issues with web workers when using the snarkjs node module
// so instead I run the verification with the cli in a child process
export const runSnarkjsVerification = async (
  vkeyData: any,
  publicSignalsData: string[],
  proofData: any,
) => {
  try {
    const vkeyPath = await writeTempFile('verification_key.json', vkeyData)
    const publicSignalsPath = await writeTempFile('public.json', publicSignalsData)
    const proofPath = await writeTempFile('proof.json', proofData)

    const { stdout, stderr } = await execPromise(
      `pnpx snarkjs groth16 verify ${vkeyPath} ${publicSignalsPath} ${proofPath}`,
    )

    console.log(stdout)
    if (stderr)
      console.error(stderr)

    return stdout.includes('OK')
  } catch (e) {
    console.error('Verification process failed:', e)
    throw e
  } finally {
    await cleanUpTempFile(path.join(tmpDir, 'verification_key.json'))
    await cleanUpTempFile(path.join(tmpDir, 'public.json'))
    await cleanUpTempFile(path.join(tmpDir, 'proof.json'))
  }
}
