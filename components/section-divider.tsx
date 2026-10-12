'use client'

import { motion } from 'framer-motion'

const paths = {
  dome: 'M0,160 V120 Q720,-40 1440,120 V160 Z',
  scoop: 'M0,160 V40 Q720,200 1440,40 V160 Z',
  'sweep-up': 'M0,160 V150 C480,150 960,20 1440,20 V160 Z',
  'sweep-down': 'M0,160 V20 C480,20 960,150 1440,150 V160 Z',
  wave: 'M0,160 V80 C240,20 480,140 720,80 C960,20 1200,140 1440,80 V160 Z',
} as const

export function SectionDivider({ variant, fill, height = 120 }: { variant: keyof typeof paths; fill: string; height?: number }) {
  return <motion.svg className="section-divider" viewBox="0 0 1440 160" preserveAspectRatio="none" style={{ height, color: fill }} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: .8, ease: 'easeOut' }} aria-hidden="true"><path d={paths[variant]} fill="currentColor" /></motion.svg>
}
