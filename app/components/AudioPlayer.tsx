"use client"

import { useRef, useEffect, useCallback } from "react"
import { Play, Pause, Loader2, AlertCircle } from "lucide-react"
import { useAudioService } from "@/lib/audio-service"

const MAX_BANDS = 240
const LINE_WIDTH = 2
const LINE_SPACING = 1
const GLOW_STRENGTH = 0.15

export default function AudioPlayer() {
  const { isPlaying, isLoading, error, togglePlay, analyzer } = useAudioService()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = (LINE_WIDTH + LINE_SPACING) * MAX_BANDS
    canvas.height = 400

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.shadowBlur = 5
    ctx.shadowColor = "rgba(255, 165, 0, 0.5)"
    ctx.imageSmoothingEnabled = true
  }, [])

  const drawVisualization = useCallback((ctx: CanvasRenderingContext2D, dataArray: Uint8Array) => {
    const { width, height } = ctx.canvas

    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
    ctx.fillRect(0, 0, width, height)

    const gradient = ctx.createLinearGradient(0, height, 0, 0)
    gradient.addColorStop(0, "rgba(255, 87, 34, 0.8)")
    gradient.addColorStop(0.5, "rgba(255, 152, 0, 0.8)")
    gradient.addColorStop(1, "rgba(255, 193, 7, 0.8)")

    for (let i = 0; i < MAX_BANDS; i++) {
      const value = dataArray[i] / 255.0
      const barHeight = value * height
      const x = i * (LINE_WIDTH + LINE_SPACING)

      ctx.beginPath()
      ctx.strokeStyle = gradient
      ctx.lineWidth = LINE_WIDTH
      ctx.moveTo(x, height)
      ctx.lineTo(x, height - barHeight)
      ctx.stroke()

      ctx.beginPath()
      ctx.strokeStyle = `rgba(255, 165, 0, ${GLOW_STRENGTH})`
      ctx.lineWidth = LINE_WIDTH + 2
      ctx.moveTo(x, height)
      ctx.lineTo(x, height - barHeight)
      ctx.stroke()
    }
  }, [])

  const animate = useCallback(() => {
    if (!analyzer || !canvasRef.current || !isPlaying) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const bufferLength = analyzer.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyzer.getByteFrequencyData(dataArray)

    const processedData = new Uint8Array(MAX_BANDS)
    const step = Math.floor(bufferLength / MAX_BANDS)
    for (let i = 0; i < MAX_BANDS; i++) {
      let sum = 0
      for (let j = 0; j < step; j++) {
        sum += dataArray[i * step + j]
      }
      processedData[i] = sum / step
    }

    drawVisualization(ctx, processedData)
    animationRef.current = requestAnimationFrame(animate)
  }, [analyzer, drawVisualization, isPlaying])

  useEffect(() => {
    setupCanvas()
    const handleResize = () => setupCanvas()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [setupCanvas])

  useEffect(() => {
    if (isPlaying) {
      animate()
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }, [isPlaying, animate])

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-full max-w-[1000px] aspect-[2/1] relative mx-auto bg-black rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%)",
          }}
        />
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span>Failed to load audio</span>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={togglePlay}
        disabled={isLoading}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:hover:scale-100"
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

