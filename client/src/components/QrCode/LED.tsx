import { SocketStatus } from 'l/constants'
import type { FC } from 'react'

interface LEDProps {
  size?: number
  connectionStatus?: SocketStatus
}

const LED: FC<LEDProps> = ({ size = 10, connectionStatus = SocketStatus.DISCONNECTED }) => {
  const getColor = () => {
    switch (connectionStatus) {
      case SocketStatus.WEB_CONNECTED:
        return '#424AD8'
      case SocketStatus.MOBILE_CONNECTED:
        return '#31F040'
      default:
        return '#95a5a6'
    }
  }

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: getColor(),
        boxShadow: `0 0 ${size * 1.5}px ${getColor()}`,
        transition: 'all 0.3s ease',
      }}
    />
  )
}

export default LED
