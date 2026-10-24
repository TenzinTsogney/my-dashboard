import { useEffect, useRef } from 'react'

const palette = ['255, 22, 120', '232, 62, 145', '255, 22, 120']

function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!canvas || !context) {
      return undefined
    }

    let width = window.innerWidth
    let height = window.innerHeight
    let particles = []
    let frame = 0
    let running = true
    const pointer = { x: -1000, y: -1000 }

    const createParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      velocityX: (Math.random() - 0.5) * 0.2,
      velocityY: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.45 + 0.12,
      color: palette[Math.floor(Math.random() * palette.length)],
    })

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const count = Math.min(100, Math.round((width * height) / 17000))
      particles = Array.from({ length: count }, createParticle)

      if (reducedMotion.matches) {
        drawFrame()
      }
    }

    const drawFrame = () => {
      context.clearRect(0, 0, width, height)

      particles.forEach((particle, index) => {
        if (!reducedMotion.matches) {
          particle.x += particle.velocityX
          particle.y += particle.velocityY

          if (particle.x < -20) particle.x = width + 20
          if (particle.x > width + 20) particle.x = -20
          if (particle.y < -20) particle.y = height + 20
          if (particle.y > height + 20) particle.y = -20
        }

        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fillStyle = `rgba(${particle.color}, ${particle.alpha})`
        context.fill()

        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next]
          const distance = Math.hypot(
            particle.x - other.x,
            particle.y - other.y,
          )

          if (distance < 105) {
            context.beginPath()
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.strokeStyle = `rgba(84, 33, 63, ${
              (1 - distance / 105) * 0.1
            })`
            context.lineWidth = 0.6
            context.stroke()
          }
        }

        const pointerDistance = Math.hypot(
          particle.x - pointer.x,
          particle.y - pointer.y,
        )

        if (pointerDistance < 180) {
          context.beginPath()
          context.moveTo(particle.x, particle.y)
          context.lineTo(pointer.x, pointer.y)
          context.strokeStyle = `rgba(255, 22, 120, ${
            (1 - pointerDistance / 180) * 0.16
          })`
          context.lineWidth = 0.7
          context.stroke()
        }
      })
    }

    const animate = () => {
      if (!running) return
      drawFrame()
      frame = window.requestAnimationFrame(animate)
    }

    const handlePointerMove = (event) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
    }

    const handlePointerLeave = () => {
      pointer.x = -1000
      pointer.y = -1000
    }

    const handleVisibility = () => {
      running = !document.hidden

      if (running && !reducedMotion.matches) {
        frame = window.requestAnimationFrame(animate)
      } else {
        window.cancelAnimationFrame(frame)
      }
    }

    resize()

    if (reducedMotion.matches) {
      drawFrame()
    } else {
      frame = window.requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerleave', handlePointerLeave)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return <canvas aria-hidden="true" className="particle-field" ref={canvasRef} />
}

export default ParticleField
