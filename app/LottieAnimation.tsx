'use client'

import { LottieComponentProps, useLottie } from 'lottie-react'

export default function LottieAnimation({
  animationData,
}: LottieComponentProps) {
  const options = {
    animationData,
    loop: false,
  }

  const { View } = useLottie(options)

  return View
}
