import { type FC, useEffect, useRef } from 'react'

interface QRCodeDisplayProps {
  qrElement: HTMLElement | null
}

export const QRCodeDisplay: FC<QRCodeDisplayProps> = ({ qrElement }) => {
  const qrCodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (qrElement && qrCodeRef.current) {
      qrCodeRef.current.innerHTML = ''
      qrCodeRef.current.appendChild(qrElement)
    }
  }, [qrElement])

  return <div ref={qrCodeRef} />
}
