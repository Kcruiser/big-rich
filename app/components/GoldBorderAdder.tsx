"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Upload, Download, X } from "lucide-react"
import { Poiret_One } from "next/font/google"
import { Slider } from "@/components/ui/slider"

const poiretOne = Poiret_One({
  weight: ["400"],
  subsets: ["latin"],
})

interface Position {
  x: number
  y: number
}

interface DragState {
  isDragging: boolean
  startX: number
  startY: number
  startImageX: number
  startImageY: number
}

interface Touch {
  distance: number
  scale: number
}

const BORDER_WIDTH = 30
const MIN_SCALE = 0.5 // Will be multiplied by baseScale
const MAX_SCALE = 3 // Will be multiplied by baseScale

interface GoldBorderAdderProps {
  onClose?: () => void
}

export default function GoldBorderAdder({ onClose }: GoldBorderAdderProps) {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [imagePosition, setImagePosition] = useState<Position>({ x: 0, y: 0 })
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    startImageX: 0,
    startImageY: 0,
  })
  const [scale, setScale] = useState(1)
  const [baseScale, setBaseScale] = useState(1)
  const [touchState, setTouchState] = useState<Touch>({ distance: 0, scale: 1 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        // Calculate scale to fit image within 400x400 circle
        const maxDimension = Math.max(img.width, img.height)
        const initialScale = maxDimension > 400 ? 380 / maxDimension : 1
        setBaseScale(initialScale)
        setScale(initialScale)

        // Set image and position in a single update
        setImage(img)
        setImagePosition({
          x: (400 - img.width * initialScale) / 2,
          y: (400 - img.height * initialScale) / 2,
        })
      }
      const objectUrl = URL.createObjectURL(file)
      img.src = objectUrl

      // Clean up object URL when component unmounts
      return () => URL.revokeObjectURL(objectUrl)
    }
  }

  const handleScaleChange = (value: number[]) => {
    setScale(baseScale * value[0])
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    setDragState({
      isDragging: true,
      startX: e.clientX - rect.left,
      startY: e.clientY - rect.top,
      startImageX: imagePosition.x,
      startImageY: imagePosition.y,
    })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragState.isDragging || !canvasRef.current) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setImagePosition({
      x: dragState.startImageX + (x - dragState.startX),
      y: dragState.startImageY + (y - dragState.startY),
    })
  }

  const handleMouseUp = () => {
    setDragState((prev) => ({ ...prev, isDragging: false }))
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches)
      setTouchState({
        distance,
        scale: scale,
      })
    } else if (e.touches.length === 1) {
      const touch = e.touches[0]
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      setDragState({
        isDragging: true,
        startX: touch.clientX - rect.left,
        startY: touch.clientY - rect.top,
        startImageX: imagePosition.x,
        startImageY: imagePosition.y,
      })
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.touches.length === 2) {
      const newDistance = getTouchDistance(e.touches)
      const scaleFactor = newDistance / touchState.distance
      const newScale = Math.min(Math.max(touchState.scale * scaleFactor, MIN_SCALE * baseScale), MAX_SCALE * baseScale)
      setScale(newScale)
    } else if (e.touches.length === 1 && dragState.isDragging) {
      const touch = e.touches[0]
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top

      setImagePosition({
        x: dragState.startImageX + (x - dragState.startX),
        y: dragState.startImageY + (y - dragState.startY),
      })
    }
  }

  const handleTouchEnd = () => {
    setDragState((prev) => ({ ...prev, isDragging: false }))
  }

  const getTouchDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const delta = e.deltaY * -0.01
    const newScale = Math.min(Math.max(scale + delta, MIN_SCALE * baseScale), MAX_SCALE * baseScale)
    setScale(newScale)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !image) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Create circular clip for image
    ctx.save()
    ctx.beginPath()
    ctx.arc(200, 200, 200 - BORDER_WIDTH, 0, Math.PI * 2)
    ctx.clip()

    // Draw image
    ctx.drawImage(image, imagePosition.x, imagePosition.y, image.width * scale, image.height * scale)
    ctx.restore()

    // Draw gold border with gradient
    const gradient = ctx.createLinearGradient(0, 0, 400, 400)
    gradient.addColorStop(0, "#FFD700")
    gradient.addColorStop(0.5, "#FFF8DC")
    gradient.addColorStop(1, "#FFD700")

    ctx.beginPath()
    ctx.arc(200, 200, 200 - BORDER_WIDTH / 2, 0, Math.PI * 2)
    ctx.strokeStyle = gradient
    ctx.lineWidth = BORDER_WIDTH
    ctx.stroke()
  }, [image, imagePosition, scale])

  const downloadImage = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve) => canvas.toBlob((blob) => resolve(blob!), "image/png"))

    // Check if running on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    if (isMobile && navigator.share) {
      // Use Web Share API for mobile
      try {
        const file = new File([blob], "gold-bordered-image.png", { type: "image/png" })
        await navigator.share({
          files: [file],
          title: "Gold Bordered Image",
        })
      } catch (error) {
        // Fallback to traditional download if sharing fails
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.download = "gold-bordered-image.png"
        link.href = url
        link.click()
        URL.revokeObjectURL(url)
      }
    } else {
      // Traditional download for desktop
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.download = "gold-bordered-image.png"
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <section className="py-4 sm:py-16 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto text-center relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute -right-2 top-0 p-2 text-yellow-400/80 hover:text-yellow-400 transition-colors"
            aria-label="Close window"
          >
            <X className="h-6 w-6" />
          </button>
        )}
        <h2
          className={`${poiretOne.className} text-4xl sm:text-5xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent`}
        >
          Create Your Gold Border
        </h2>
        <div className="h-1 w-20 mx-auto bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 rounded-full mb-8" />

        <div className="flex flex-col items-center gap-8">
          <div className="relative overflow-visible max-w-[320px] sm:max-w-none mx-auto pb-16" ref={containerRef}>
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
              className="border border-yellow-400/50 rounded-full bg-black/15 backdrop-blur-sm touch-none select-none w-[320px] h-[320px] sm:w-[400px] sm:h-[400px]"
            />
            {image && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-12 flex items-center justify-center px-4 py-2 bg-black/5 backdrop-blur-sm rounded-full border border-yellow-400/20">
                <Slider
                  defaultValue={[1]}
                  value={[scale / baseScale]}
                  min={MIN_SCALE}
                  max={MAX_SCALE}
                  step={0.1}
                  onValueChange={handleScaleChange}
                  className="w-full"
                />
              </div>
            )}
            {!image && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer active:bg-white/5 transition-colors"
                onClick={triggerFileInput}
              >
                <p className="text-yellow-400 mb-4">Upload an image to begin</p>
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <Upload className="w-8 h-8 text-yellow-400" />
                </motion.div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleImageUpload}
              className="hidden"
            />

            {image && (
              <button
                onClick={downloadImage}
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-colors duration-200 mt-5"
              >
                <Download className="w-4 h-4" />
                {/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? "Share" : "Download"}
              </button>
            )}
          </div>

          {image && <p className="text-yellow-400/80 text-sm">Tip: Drag to position • Pinch/Scroll to zoom</p>}
        </div>
      </div>
    </section>
  )
}

