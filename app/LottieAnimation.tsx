'use client'
import dynamic from 'next/dynamic'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const LottieAnimation = ({ animationData }: any) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
  }

  return <Lottie {...defaultOptions} />
}

export default LottieAnimation
