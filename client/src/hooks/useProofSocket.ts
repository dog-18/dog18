import { useStore } from 'hooks/useStore'
import { ProofStep, SOCKET_PATH, SOCKET_URL, SocketStatus } from 'l/constants'
import type { OpenPassport1StepInputs } from 'l/types'
import type { Id } from 'l/types'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

export const useProofSocket = (
  sessionId: Id,
) => {
  const [proofStep, setProofStep] = useState<ProofStep>(ProofStep.WAITING_FOR_MOBILE)
  const { setProof } = useStore()

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      path: SOCKET_PATH,
      query: { sessionId, clientType: 'web' },
    })

    const handleMobileStatus = ({ status, proof }: { status: SocketStatus; proof: OpenPassport1StepInputs }) => {
      switch (status) {
        case SocketStatus.MOBILE_CONNECTED:
          setProofStep(ProofStep.MOBILE_CONNECTED)
          break
        case SocketStatus.PROOF_GENERATION_STARTED:
          setProofStep(ProofStep.PROOF_GENERATION_STARTED)
          break
        case SocketStatus.PROOF_GENERATED:
          setProof(proof)
          break
      }
    }

    socket.on('disconnect', () => {
      setProofStep(ProofStep.WAITING_FOR_MOBILE)
    })
    socket.on('mobile_status', handleMobileStatus)

    return () => {
      if (socket.connected)
        socket.disconnect()
    }
  }, [sessionId, setProof])

  return proofStep
}
