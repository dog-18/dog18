'use client'
import { useProofSocket } from 'h/useProofSocket'
import { useQRCode } from 'h/useQRCode'
import { useVerify } from 'h/useVerify'
import { ProofStep } from 'l/constants'
import type { Id } from 'l/types'
import { useRouter } from 'next/navigation'
import { type FC, useState } from 'react'
import { BounceLoader } from 'react-spinners'
import LED from './LED'
import { ProofAnimation } from './ProofAnimation'
import { QRCodeDisplay } from './QrCodeDisplay'
interface OpenPassportQRcodeProps {
  userId: Id
}

export const OpenPassportQRCode: FC<OpenPassportQRcodeProps> = ({
  userId,
}) => {
  const router = useRouter()
  // FIXME avoid type assertion
  const [sessionId, setSessionId] = useState<Id>(crypto.randomUUID() as Id)
  const { valid } = useVerify()
  const qrElement = useQRCode({ userId, sessionId })
  const { proofStep, connectionStatus } = useProofSocket(sessionId)

  const handleAnimationComplete = () => {
    // FIXME avoid type assertion
    setSessionId(crypto.randomUUID() as Id)
    router.push('/x')
  }

  const renderProofStatus = () => {
    if (valid) return <ProofAnimation onComplete={handleAnimationComplete} />

    switch (proofStep) {
      case ProofStep.WAITING_FOR_MOBILE:
      case ProofStep.MOBILE_CONNECTED:
        return qrElement ? <QRCodeDisplay qrElement={qrElement} /> : null
      case ProofStep.PROOF_GENERATION_STARTED:
        return <BounceLoader loading={true} size={200} color='#94FBAB' />
      default:
        return null
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <LED connectionStatus={connectionStatus} />
      <div className='w-[300px] h-[300px] flex items-center justify-center'>
        {renderProofStatus()}
      </div>
    </div>
  )
}
