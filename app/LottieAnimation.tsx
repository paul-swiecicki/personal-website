'use client'

import { LottieComponentProps, LottieOptions, useLottie } from 'lottie-react'

export default function LottieAnimation({
  animationData,
}: LottieComponentProps) {
  const options: LottieOptions = {
    animationData,
    loop: false,
  }

  const { View } = useLottie(options)

  return View
}
