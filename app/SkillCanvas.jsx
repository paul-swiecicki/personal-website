import React, { useEffect, useRef, useState } from 'react'
import icon from '../public/skills/typescript.png'
import { skills } from '../data/skills'

const stringToFileName = (name) => {
  const fileName = name.toLowerCase().replace(' ', '_')
  return fileName
}

const importAll = (r) => {
  let images = {}
  const requireKeys = r.keys()
  requireKeys.slice(requireKeys.length / 2).map((item, index) => {
    images[item.replace('./', '')] = r(item)
  })
  return images
}

const images = importAll(require.context('../public/skills', false, /\.(png)$/))
const skillImageSrcs = []

Object.keys(images).forEach((imageName) => {
  skillImageSrcs.push(images[imageName].default.src)
})

const centerBall = {
  x: 400,
  y: 300,
  radius: 10,
}

const SkillCanvas = () => {
  const canvasRef = useRef(null)
  const [balls, setBalls] = useState([])

  const animationFrameHandle = useRef(null)
  const interval = useRef(null)

  const maxDistance = 200
  const elasticity = 0.4 // (0 to 1)

  const createUpdate = (ctx, canvas, balls) => {
    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      balls.forEach((ball, index) => {
        // Update ball position
        ball.x += ball.dx
        ball.y += ball.dy

        // Calculate the distance from the center ball
        const distance = Math.sqrt(
          (ball.x - centerBall.x) ** 2 + (ball.y - centerBall.y) ** 2,
        )

        // Check if the ball is going beyond the max distance
        if (distance > maxDistance) {
          // Calculate the angle between the ball and the center ball
          const angle = Math.atan2(ball.y - centerBall.y, ball.x - centerBall.x)

          // Calculate the new position of the ball within the max distance
          ball.x = centerBall.x + Math.cos(angle) * maxDistance
          ball.y = centerBall.y + Math.sin(angle) * maxDistance
        }

        // Check collision with other balls
        for (let i = index + 1; i < balls.length; i++) {
          const otherBall = balls[i]
          const dx = otherBall.x - ball.x
          const dy = otherBall.y - ball.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const minDistance = ball.radius + otherBall.radius

          if (distance < minDistance) {
            // Calculate the angle between the balls
            const angle = Math.atan2(dy, dx)

            // Calculate the overlap distance
            const overlap = minDistance - distance

            // Calculate the displacement vectors for the balls
            const displacementX = overlap * Math.cos(angle)
            const displacementY = overlap * Math.sin(angle)

            // Update the positions of the colliding balls
            ball.x -= displacementX * 0.5
            ball.y -= displacementY * 0.5
            otherBall.x += displacementX * 0.5
            otherBall.y += displacementY * 0.5

            // Calculate the relative velocity
            const relativeVelX = otherBall.dx - ball.dx
            const relativeVelY = otherBall.dy - ball.dy

            // Calculate the dot product of the normal and relative velocity
            const dotProduct = dx * relativeVelX + dy * relativeVelY

            // Update the velocities based on the dot product and elasticity
            const impulseX = (2 * dotProduct * dx) / (distance * distance)
            const impulseY = (2 * dotProduct * dy) / (distance * distance)

            ball.dx += impulseX * elasticity
            ball.dy += impulseY * elasticity
            otherBall.dx -= impulseX * elasticity
            otherBall.dy -= impulseY * elasticity
          }
        }

        // Draw string connecting the ball to the center ball
        ctx.strokeStyle = 'black'
        ctx.beginPath()
        ctx.moveTo(ball.x, ball.y)
        ctx.lineTo(centerBall.x, centerBall.y)
        ctx.stroke()

        // Draw ball image
        const image = new Image()
        image.src = ball.img
        ctx.drawImage(
          image,
          ball.x - ball.radius,
          ball.y - ball.radius,
          ball.radius * 2,
          ball.radius * 2,
        )
      })

      // Draw the center ball
      ctx.fillStyle = 'red'
      ctx.beginPath()
      ctx.arc(centerBall.x, centerBall.y, centerBall.radius, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()

      animationFrameHandle.current = requestAnimationFrame(update)
    }

    update()
  }

  const ballRadius = 32

  const addBall = (imgSrc) => {
    const angle = Math.random() * Math.PI * 2
    const ball = {
      x: centerBall.x,
      y: centerBall.y,
      radius: ballRadius,
      dx: (Math.random() * 2 - 1) * 2,
      dy: (Math.random() * 2 - 1) * 2,
      img: imgSrc,
    }
    setBalls((prevBalls) => [...prevBalls, ball])
  }

  useEffect(() => {
    clearInterval(interval.current)
    setBalls([])

    let counter = 0
    interval.current = setInterval(() => {
      if (counter > skillImageSrcs.length - 1) return
      addBall(skillImageSrcs[counter])
      counter++
    }, 200)
  }, [])

  useEffect(() => {
    cancelAnimationFrame(animationFrameHandle.current)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = 800
    canvas.height = 600

    createUpdate(ctx, canvas, balls)
  }, [balls])

  // const handleAddBall = () => {
  //   addBall(icon)
  // }

  return (
    <div>
      <canvas ref={canvasRef} />

      {/* <button onClick={handleAddBall}>Add Ball</button> */}
    </div>
  )
}

export default SkillCanvas
