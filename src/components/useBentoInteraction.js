import { useEffect, useState } from 'react'
import {
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'

export function useBentoInteraction() {
  const reduceMotion = useReducedMotion()
  const [canHover, setCanHover] = useState(false)
  const rotateX = useSpring(0, { stiffness: 160, damping: 22, mass: 0.55 })
  const rotateY = useSpring(0, { stiffness: 160, damping: 22, mass: 0.55 })
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setCanHover(query.matches)

    sync()
    query.addEventListener?.('change', sync)

    return () => query.removeEventListener?.('change', sync)
  }, [])

  const active = canHover && !reduceMotion

  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${glowX}% ${glowY}%, rgba(255, 22, 120, 0.17), rgba(232, 62, 145, 0.09) 34%, transparent 68%)`

  const handlePointerMove = (event) => {
    if (!active) {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height

    rotateY.set((x - 0.5) * 9)
    rotateX.set((0.5 - y) * 7)
    glowX.set(x * 100)
    glowY.set(y * 100)
  }

  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
    glowX.set(50)
    glowY.set(50)
  }

  return {
    active,
    handlePointerMove,
    reduceMotion,
    reset,
    spotlight,
    style: { rotateX, rotateY },
  }
}
