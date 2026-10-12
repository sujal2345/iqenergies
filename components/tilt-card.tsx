'use client'

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { PropsWithChildren, useRef, useState } from 'react'

export function TiltCard({ children, className = '', maxX = 8, maxY = 10 }: PropsWithChildren<{ className?: string; maxX?: number; maxY?: number }>) {
  const reduceMotion = useReducedMotion()
  const frame = useRef<number | null>(null)
  const [hovered, setHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const scale = useMotionValue(1)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxX, -maxX]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxY, maxY]), { stiffness: 200, damping: 20 })
  const cardScale = useSpring(scale, { stiffness: 200, damping: 20 })
  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || window.matchMedia('(hover: none)').matches) return
    if (frame.current) cancelAnimationFrame(frame.current)
    const target = event.currentTarget
    const clientX = event.clientX
    const clientY = event.clientY
    frame.current = requestAnimationFrame(() => {
      const rect = target.getBoundingClientRect()
      x.set((clientX - rect.left) / rect.width - 0.5)
      y.set((clientY - rect.top) / rect.height - 0.5)
    })
  }
  const reset = () => { if (frame.current) cancelAnimationFrame(frame.current); x.set(0); y.set(0); scale.set(1); setHovered(false) }
  return <motion.div className={`tilt-card ${hovered ? 'tilt-card-active' : ''} ${className}`} style={reduceMotion ? undefined : { rotateX, rotateY, scale, perspective: 1000, transformStyle: 'preserve-3d' }} onMouseMove={onMove} onMouseEnter={() => { setHovered(true); scale.set(1.03) }} onMouseLeave={reset}>
    <div className="tilt-glare" style={{ opacity: hovered && !reduceMotion ? 1 : 0 }} />
    {children}
  </motion.div>
}
