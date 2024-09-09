'use client'
import { useProofSocket } from 'h/useProofSocket'
import { useQRCode } from 'h/useQRCode'
import { useStore } from 'h/useStore'
import { useVerify } from 'h/useVerify'
import { ProofStep } from 'l/constants'
import type { Id } from 'l/types'
import { useRouter } from 'next/navigation'
import { type FC, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { ProofAnimation } from './ProofAnimation'
import { QRCodeDisplay } from './QrCodeDisplay'

interface OpenPassportQRcodeProps {
  userId: Id
}

export const OpenPassportQRCode: FC<OpenPassportQRcodeProps> = ({
  userId,
}) => {
  const { setAuth } = useStore()
  const router = useRouter()
  // FIXME avoid type assertion
  const [sessionId, setSessionId] = useState<Id>(crypto.randomUUID() as Id)
  const { valid } = useVerify()
  const qrElement = useQRCode({ userId, sessionId })
  const proofStep = useProofSocket(sessionId)

  const handleAnimationComplete = () => {
    setAuth(true)
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
        return <BeatLoader loading={true} size={50} color='#e0a3c8' />
      default:
        return null
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='w-[300px] h-[300px] flex items-center justify-center'>
        {renderProofStatus()}
      </div>
    </div>
  )
}
