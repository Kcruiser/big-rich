"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Jost } from "next/font/google"
import { useState } from "react"
import { Copy } from "lucide-react"

const jost = Jost({
  subsets: ["latin"],
  weight: ["700"],
})

export default function Hero() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.2])
  const [copied, setCopied] = useState(false)

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ opacity, scale }}>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5.jpg-m9uHREHoKATGhI6T34wp1T0j8xFABx.jpeg"
          alt="Big Rich with crew"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </motion.div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.h1
          className="mb-6 text-7xl font-bold tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-white">BIG </span>
          <motion.span
            className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent animate-pulse relative inline-block"
            style={{
              textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
            }}
            animate={{
              textShadow: [
                "0 0 10px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3), 0 0 30px rgba(255, 215, 0, 0.2)",
                "0 0 15px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.6), 0 0 45px rgba(255, 215, 0, 0.4)",
                "0 0 10px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3), 0 0 30px rgba(255, 215, 0, 0.2)",
              ],
              filter: ["brightness(1) contrast(1.2)", "brightness(1.4) contrast(1.4)", "brightness(1) contrast(1.2)"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            RICH
          </motion.span>

          <div className="flex items-center justify-center gap-4 mt-4 tracking-wider">
            <span
              className={`${jost.className} text-sm sm:text-base md:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600`}
            >
              <span className="hidden md:inline">0x...A220</span>
              <span className="hidden sm:inline md:hidden">0x...A220</span>
              <span className="sm:hidden">0x...A220</span>
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText("0x33779a40987F729a7DF6cc08B1dAD1a21b58A220")
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-black transition-colors hover:bg-yellow-500 ml-1"
              aria-label="Copy contract address"
            >
              <Copy className="h-4 w-4" />
            </button>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-full mt-2 rounded-md bg-yellow-400 px-4 py-2 text-sm text-black font-medium shadow-lg"
              >
                Address copied to clipboard! ✨
              </motion.div>
            )}
          </div>
        </motion.h1>
      </div>
    </div>
  )
}

