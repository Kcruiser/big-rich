"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Loader2 } from "lucide-react"
import { useAudioService } from "@/lib/audio-service"

export default function AudioPlayer() {
  const [isLoading, setIsLoading] = useState(true)
  const { isPlaying, togglePlay, analyzer } = useAudioService()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (isPlaying) {
      animate()
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }, [isPlaying])

  const animate = () => {
    if (!analyzer || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const bufferLength = analyzer.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      const width = canvas.width
      const height = canvas.height

      analyzer.getByteFrequencyData(dataArray)

      ctx.clearRect(0, 0, width, height)

      const gradient = ctx.createLinearGradient(0, height, 0, 0)
      gradient.addColorStop(0, "#FFD700")
      gradient.addColorStop(0.5, "#FFF8DC")
      gradient.addColorStop(1, "#DAA520")

      const barWidth = (width / bufferLength) * 10.5
      let barHeight
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * height * 0.9

        ctx.shadowBlur = 20
        ctx.shadowColor = "rgba(255, 215, 0, 0.6)"

        ctx.fillStyle = gradient

        ctx.beginPath()
        ctx.roundRect(x, height - barHeight, barWidth - 1, barHeight, 1)
        ctx.fill()

        x += barWidth
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio
      canvas.height = canvas.clientHeight * window.devicePixelRatio
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-full max-w-2xl h-32 relative">
        <canvas
          ref={canvasRef}
          className="w-full h-full rounded-xl backdrop-blur-sm"
          style={{
            filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))",
          }}
        />
      </div>
      <button
        onClick={togglePlay}
        disabled={isLoading}
        className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:hover:scale-100"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isLoading ? (
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        ) : isPlaying ? (
          <Pause className="w-8 h-8 text-white" />
        ) : (
          <Play className="w-8 h-8 text-white ml-1" />
        )}
      </button>
    </div>
  )
}

