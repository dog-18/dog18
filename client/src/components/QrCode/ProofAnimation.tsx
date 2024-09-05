import Lottie from 'lottie-react'
import type { FC } from 'react'
import CHECK_ANIMATION from './check_animation.json'

interface ProofAnimationProps {
  onComplete: () => void
}

export const ProofAnimation: FC<ProofAnimationProps> = ({ onComplete }) => (
  <Lottie
    animationData={CHECK_ANIMATION}
    style={{ width: 200, height: 200 }}
    loop={false}
    autoplay={true}
    onComplete={onComplete}
  />
)
