"use client"

import { useAudioService } from "@/lib/audio-service"
import { motion, AnimatePresence } from "framer-motion"
import { Pause, Play, Maximize2, Loader2 } from "lucide-react"

interface FloatingAudioPlayerProps {
  onExpand: () => void
  isDialogOpen: boolean
}

export default function FloatingAudioPlayer({ onExpand, isDialogOpen }: FloatingAudioPlayerProps) {
  const { isPlaying, isLoading, togglePlay } = useAudioService()

  if (isDialogOpen) return null

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-yellow-400/20 rounded-full p-2 shadow-lg">
            <button
              onClick={togglePlay}
              disabled={isLoading}
              className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center hover:bg-yellow-500 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 text-black animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4 text-black" />
              ) : (
                <Play className="w-4 h-4 text-black ml-0.5" />
              )}
            </button>
            <button
              onClick={onExpand}
              className="w-8 h-8 rounded-full border border-yellow-400/50 flex items-center justify-center hover:bg-yellow-400/10 transition-colors"
            >
              <Maximize2 className="w-4 h-4 text-yellow-400" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

