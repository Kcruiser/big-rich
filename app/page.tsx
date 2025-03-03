"use client"

import { useScroll } from "framer-motion"
import { useState } from "react"
import Hero from "./components/hero"
import ScrollingTextSection from "./components/ScrollingTextSection"
import FAQ from "./components/faq"
import Footer from "./components/footer"
import NavigationBar from "./components/NavigationBar"
import ConversationalWidget from "./components/ConversationalWidget"
import { MouseProvider, useMousePosition } from "@/lib/mouse-context"
import { AudioServiceProvider } from "@/lib/audio-service"

function GradientBackground() {
  const mousePosition = useMousePosition()

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(255, 215, 0, 0.15) 0%,
            rgba(218, 165, 32, 0.1) 30%,
            rgba(0, 0, 0, 0.85) 70%)
          `,
        }}
      />
    </>
  )
}

function BackgroundGrid() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(45deg, transparent 49%, rgba(255, 215, 0, 0.1) 49% 51%, transparent 51%),
          linear-gradient(-45deg, transparent 49%, rgba(255, 215, 0, 0.1) 49% 51%, transparent 51%)
        `,
        backgroundSize: "30px 30px",
        backgroundAttachment: "fixed",
      }}
    />
  )
}

function PageContent() {
  const { scrollYProgress } = useScroll()
  const [isWidgetVisible, setIsWidgetVisible] = useState(true)

  return (
    <div className="relative min-h-screen bg-black">
      <BackgroundGrid />
      <GradientBackground />
      <div className="relative">
        <NavigationBar onButtonClick={() => setIsWidgetVisible(false)} />
        <Hero />
        <FAQ />
        <ScrollingTextSection />
        <Footer />
      </div>
      <ConversationalWidget isVisible={isWidgetVisible} />
    </div>
  )
}

export default function Page() {
  return (
    <MouseProvider>
      <AudioServiceProvider>
        <PageContent />
      </AudioServiceProvider>
    </MouseProvider>
  )
}

