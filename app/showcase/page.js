'use client'

import Rotate from '@/components/motion/rotate'
import ScrollTriggered from '@/components/motion/scroll'
import { motion } from 'motion/react'

export default function Showcase() {
  return (
    <main className="p-8 space-y-24 flex">
      <Rotate />
      <ScrollTriggered />
    </main>
  )
}