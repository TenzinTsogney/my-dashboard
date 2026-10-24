import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import './GlassGridReveal.css'

const EASE = [0.16, 1, 0.3, 1]

const contentVariants = {
  closed: {
    opacity: 0.45,
    scale: 1.015,
    filter: 'blur(9px)',
  },
  open: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      delay: 0.55,
      duration: 1.55,
      ease: EASE,
    },
  },
}

const leftPanelVariants = {
  closed: {
    opacity: 1,
    rotate: 0,
    x: '0%',
  },
  open: {
    opacity: [1, 1, 0],
    rotate: -1.5,
    x: '-103%',
    transition: {
      delay: 0.55,
      duration: 1.75,
      times: [0, 0.72, 1],
      ease: [0.7, 0, 0.2, 1],
    },
  },
}

const rightPanelVariants = {
  closed: {
    opacity: 1,
    rotate: 0,
    x: '0%',
  },
  open: {
    opacity: [1, 1, 0],
    rotate: 1.5,
    x: '103%',
    transition: {
      delay: 0.55,
      duration: 1.75,
      times: [0, 0.72, 1],
      ease: [0.7, 0, 0.2, 1],
    },
  },
}

const seamVariants = {
  closed: {
    opacity: 0.9,
    scaleY: 1,
  },
  open: {
    opacity: [0.9, 1, 0],
    scaleY: [1, 1, 0.3],
    transition: {
      delay: 0.5,
      duration: 1.8,
      times: [0, 0.68, 1],
      ease: 'easeInOut',
    },
  },
}

const beamVariants = {
  closed: {
    opacity: 0,
    x: '-38%',
  },
  open: {
    opacity: [0, 1, 0.9, 0],
    x: ['-38%', '38%'],
    transition: {
      delay: 0.2,
      duration: 1.9,
      times: [0, 0.24, 0.7, 1],
      ease: 'easeInOut',
    },
  },
}

const rippleVariants = {
  closed: {
    opacity: 0,
    scale: 0.8,
  },
  open: {
    opacity: [0, 0.55, 0.22, 0],
    scale: [0.8, 1.02, 1.16, 1.32],
    transition: {
      delay: 0.6,
      duration: 1.55,
      times: [0, 0.3, 0.65, 1],
      ease: 'easeOut',
    },
  },
}

const auraVariants = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: {
      delay: 1.85,
      duration: 1.05,
      ease: EASE,
    },
  },
}

function GlassGridReveal({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.28, once: true })
  const reduceMotion = useReducedMotion()
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    if (reduceMotion) {
      setOpened(true)
      return undefined
    }

    if (!inView) {
      return undefined
    }

    const timer = window.setTimeout(() => setOpened(true), 420)
    return () => window.clearTimeout(timer)
  }, [inView, reduceMotion])

  const state = reduceMotion ? 'open' : opened ? 'open' : 'closed'

  return (
    <div className={`glass-grid-reveal ${className}`.trim()} ref={ref}>
      <motion.div
        animate={state}
        className="glass-grid-reveal__content"
        initial={reduceMotion ? 'open' : 'closed'}
        variants={contentVariants}
      >
        {children}
      </motion.div>

      <motion.div
        animate={state}
        aria-hidden="true"
        className="glass-grid-reveal__aura"
        initial={reduceMotion ? 'open' : 'closed'}
        variants={auraVariants}
      />

      {!reduceMotion && (
        <>
          <motion.div
            animate={state}
            aria-hidden="true"
            className="glass-grid-reveal__panel glass-grid-reveal__panel--left"
            initial="closed"
            variants={leftPanelVariants}
          >
            <span className="glass-grid-reveal__sheen" />
            <span className="glass-grid-reveal__glow" />
          </motion.div>

          <motion.div
            animate={state}
            aria-hidden="true"
            className="glass-grid-reveal__panel glass-grid-reveal__panel--right"
            initial="closed"
            variants={rightPanelVariants}
          >
            <span className="glass-grid-reveal__sheen" />
            <span className="glass-grid-reveal__glow" />
          </motion.div>

          <motion.span
            animate={state}
            aria-hidden="true"
            className="glass-grid-reveal__seam"
            initial="closed"
            variants={seamVariants}
          />

          <motion.span
            animate={state}
            aria-hidden="true"
            className="glass-grid-reveal__ripple"
            initial="closed"
            variants={rippleVariants}
          />

          <motion.span
            animate={state}
            aria-hidden="true"
            className="glass-grid-reveal__beam"
            initial="closed"
            variants={beamVariants}
          />

          <span aria-hidden="true" className="glass-grid-reveal__rim" />
        </>
      )}
    </div>
  )
}

export default GlassGridReveal
