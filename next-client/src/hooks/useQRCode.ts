import { config } from 'l/config'
import { generateQrCode } from 'l/generate-qrcode'
import type { Id } from 'l/types'
import { useEffect, useState } from 'react'

const { appName: name, scope, requirements } = config.openPassport

export const useQRCode = ({ sessionId, userId }: { sessionId: Id; userId: Id }) => {
  const [qrElement, setQrElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const qr = generateQrCode({
      name,
      scope,
      userId,
      sessionId,
      circuit: 'prove',
      arguments: { disclosureOptions: Object.fromEntries(requirements) },
    })
    setQrElement(qr)
  }, [sessionId, userId])

  return qrElement
}
