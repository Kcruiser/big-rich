"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Jost } from "next/font/google"
import GoldBorderDrawer from "./GoldBorderDrawer"
import SwapDrawer from "./SwapDrawer"
import AudioDialog from "./AudioDialog"
import FloatingAudioPlayer from "./FloatingAudioPlayer"
import { useAudioService } from "@/lib/audio-service" // Updated import

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "700"],
})

interface NavigationBarProps {
  onButtonClick: () => void
}

const NavigationBar = ({ onButtonClick }: NavigationBarProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isGoldBorderOpen, setIsGoldBorderOpen] = useState(false)
  const [isSwapOpen, setIsSwapOpen] = useState(false)
  const [isAudioOpen, setIsAudioOpen] = useState(false)
  const { isPlaying } = useAudioService() // Updated hook usage

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleButtonClick = () => {
    onButtonClick()
  }

  const navItems = [
    {
      label: "GET RICH",
      className:
        "relative overflow-hidden bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition-all duration-200 px-4 py-2 rounded-full before:absolute before:inset-0 before:w-[200%] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent before:animate-[shimmer_2s_infinite] before:translate-x-[-100%]",
    },
  ]

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-row items-center justify-between h-16 gap-2">
            <div className="flex-none flex items-center">
              <button
                onClick={() => {
                  setIsGoldBorderOpen(true)
                  handleButtonClick()
                }}
                className="relative overflow-hidden bg-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 font-bold px-3 sm:px-4 py-2 rounded-full border-[3px] border-transparent text-sm sm:text-base whitespace-nowrap"
                style={{
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  position: "relative",
                }}
              >
                <span
                  className={`${jost.className} relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600`}
                >
                  LOOK RICH
                </span>
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(to right, #FFD700, #FFF8DC, #FFD700)",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    padding: "3px",
                  }}
                />
              </button>
            </div>
            <div className="flex-none flex justify-center items-center gap-2">
              {isPlaying && (
                <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
              )}
              <button
                onClick={() => {
                  setIsAudioOpen(true)
                  handleButtonClick()
                }}
                className="relative overflow-hidden bg-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 font-bold px-4 py-2 rounded-full border-[3px] border-transparent"
                style={{
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  position: "relative",
                }}
              >
                <span
                  className={`${jost.className} relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600`}
                >
                  SOUND RICH
                </span>
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(to right, #FFD700, #FFF8DC, #FFD700)",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    padding: "3px",
                  }}
                />
              </button>
            </div>
            <div className="flex-none flex justify-end">
              <button
                onClick={() => {
                  setIsSwapOpen(true)
                  handleButtonClick()
                }}
                className={`${jost.className} ${navItems[0].className} text-sm sm:text-base px-3 sm:px-4 whitespace-nowrap`}
              >
                {navItems[0].label}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <GoldBorderDrawer open={isGoldBorderOpen} onOpenChange={setIsGoldBorderOpen} />
      <SwapDrawer open={isSwapOpen} onOpenChange={setIsSwapOpen} />
      <AudioDialog isOpen={isAudioOpen} onOpenChange={setIsAudioOpen} />
      <FloatingAudioPlayer onExpand={() => setIsAudioOpen(true)} isDialogOpen={isAudioOpen} />
    </>
  )
}

export default NavigationBar

