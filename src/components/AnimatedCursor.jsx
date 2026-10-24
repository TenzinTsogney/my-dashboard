import { useEffect, useRef } from 'react'

function AnimatedCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!finePointer.matches || reducedMotion.matches) {
      return undefined
    }

    const dot = dotRef.current
    const ring = ringRef.current

    if (!dot || !ring) {
      return undefined
    }

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const trailing = { ...target }
    let frame = 0
    let visible = false
    let pressed = false
    let active = false

    const paint = () => {
      trailing.x += (target.x - trailing.x) * 0.16
      trailing.y += (target.y - trailing.y) * 0.16

      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${trailing.x}px, ${trailing.y}px, 0) translate(-50%, -50%)`

      frame = window.requestAnimationFrame(paint)
    }

    const showCursor = () => {
      if (visible) return
      visible = true
      dot.classList.add('is-visible')
      ring.classList.add('is-visible')
    }

    const syncActive = (event) => {
      const nextActive = Boolean(
        event.target.closest?.('a, button, [data-cursor]'),
      )

      if (nextActive === active) return
      active = nextActive
      ring.classList.toggle('is-active', active)
      dot.classList.toggle('is-active', active)
    }

    const handlePointerMove = (event) => {
      target.x = event.clientX
      target.y = event.clientY
      showCursor()
      syncActive(event)
    }

    const handlePointerDown = () => {
      pressed = true
      ring.classList.add('is-pressed')
    }

    const handlePointerUp = () => {
      pressed = false
      ring.classList.remove('is-pressed')
    }

    const handlePointerLeave = () => {
      visible = false
      dot.classList.remove('is-visible')
      ring.classList.remove('is-visible')
    }

    const handleVisibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frame)
      } else if (!pressed) {
        frame = window.requestAnimationFrame(paint)
      }
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    document.addEventListener('pointerleave', handlePointerLeave)
    document.addEventListener('visibilitychange', handleVisibility)
    frame = window.requestAnimationFrame(paint)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return (
    <>
      <span aria-hidden="true" className="cursor-dot" ref={dotRef} />
      <span aria-hidden="true" className="cursor-ring" ref={ringRef} />
    </>
  )
}

export default AnimatedCursor
