'use client'
import { useProofSocket } from 'h/useProofSocket'
import { useQRCode } from 'h/useQRCode'
import { useVerify } from 'h/useVerify'
import { ProofStep } from 'l/constants'
import type { Id } from 'l/types'
import { type FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const [sessionId, setSessionId] = useState(crypto.randomUUID())
  const { valid, error } = useVerify()
  const navigate = useNavigate()
  const qrElement = useQRCode({ userId, sessionId })
  const { proofStep, connectionStatus } = useProofSocket(sessionId)

  const handleAnimationComplete = () => {
    setSessionId(crypto.randomUUID())
    navigate('/x')
  }

  useEffect(() => {
    if (error) alert(error)
  }, [error])

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
