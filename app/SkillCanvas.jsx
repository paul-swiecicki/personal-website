import React, { useEffect, useRef, useState } from 'react'
import icon from '../public/pauls-stroke.png'
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
  y: 400,
  radius: 40,
}

const SkillCanvas = () => {
  const canvasRef = useRef(null)
  const [balls, setBalls] = useState([])

  const animationFrameHandle = useRef(null)
  const interval = useRef(null)

  const softMinDistance = 100
  const softMinDistanceForce = 0.0005
  const softMaxDistance = 220
  const softMaxDistanceForce = 0.0015
  const maxDistance = 350
  const elasticity = 0.43 // (0 to 1) og 0.48

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

        if (distance < softMinDistance) {
          const angle = Math.atan2(centerBall.y - ball.y, centerBall.x - ball.x)

          // Calculate the force towards the center
          const force = (distance - softMaxDistance) * softMinDistanceForce // Adjust the strength of the force as needed

          // Apply the force to the ball's velocity
          ball.dx += force * Math.cos(angle)
          ball.dy += force * Math.sin(angle)
        }

        // Check if the ball is going beyond the softMaxDistance
        if (distance > softMaxDistance) {
          // Calculate the angle between the ball and the center ball
          const angle = Math.atan2(centerBall.y - ball.y, centerBall.x - ball.x)

          // Calculate the force towards the center
          const force = (distance - softMaxDistance) * softMaxDistanceForce // Adjust the strength of the force as needed

          // Apply the force to the ball's velocity
          ball.dx += force * Math.cos(angle)
          ball.dy += force * Math.sin(angle)
        }

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

            // Calculate the displacement vectors for the balls (with elasticity)
            const displacementX = overlap * Math.cos(angle) * elasticity
            const displacementY = overlap * Math.sin(angle) * elasticity

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
        ctx.globalCompositeOperation = 'destination-over'
        ctx.strokeStyle = '#ccc'
        ctx.beginPath()
        ctx.moveTo(ball.x, ball.y)
        ctx.lineTo(centerBall.x, centerBall.y)
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw ball image
        const image = new Image()
        image.src = ball.img
        ctx.globalCompositeOperation = 'source-over'
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

      // console.log(balls)
      if (balls.length) {
        const image = new Image()
        image.src = icon.src
        ctx.globalCompositeOperation = 'source-over'
        ctx.drawImage(
          image,
          centerBall.x - centerBall.radius,
          centerBall.y - centerBall.radius,
          centerBall.radius * 2,
          centerBall.radius * 2,
        )
      }
      // ctx.fill()

      animationFrameHandle.current = requestAnimationFrame(update)
    }

    update()
  }

  const ballRadius = 32
  const randomSpawnForceMultiplier = 2

  const addBall = (imgSrc) => {
    const angle = Math.random() * Math.PI * 2
    const ball = {
      x: centerBall.x,
      y: centerBall.y,
      radius: ballRadius,
      dx: (Math.random() * 2 - 1) * randomSpawnForceMultiplier,
      dy: (Math.random() * 2 - 1) * randomSpawnForceMultiplier,
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
    }, 100)
  }, [])

  useEffect(() => {
    cancelAnimationFrame(animationFrameHandle.current)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = 800
    canvas.height = 800

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
