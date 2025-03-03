"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import AboutSection from "./AboutSection"
import DownloadsSection from "./DownloadsSection"

export default function ScrollingTextSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0.3])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen pt-16 pb-16 flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div className="relative z-10 w-full" style={{ y, opacity }}>
        <AboutSection />
        <div className="h-1 w-full mx-auto bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 opacity-50 my-12" />
        <DownloadsSection />
      </motion.div>
    </section>
  )
}

