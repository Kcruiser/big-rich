"use client"

import { createContext, useContext, useRef, useState, useEffect, useCallback, type ReactNode } from "react"

interface AudioServiceContextType {
  isPlaying: boolean
  isLoading: boolean
  error: string | null
  togglePlay: () => Promise<void>
  analyzer: AnalyserNode | null
}

const AudioServiceContext = createContext<AudioServiceContextType | undefined>(undefined)

export function AudioServiceProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyzerRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)

  const initializeAudio = useCallback(async () => {
    try {
      console.log("Initializing audio...")
      setIsLoading(true)
      setError(null)

      // Create audio element if it doesn't exist
      if (!audioRef.current) {
        audioRef.current = new Audio()
        audioRef.current.src =
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Big%20Rich-2-5HwMDxDmfdowkeGeoZF9rComEVLX46.mp3"

        // Wait for audio to be loaded
        await new Promise((resolve, reject) => {
          if (!audioRef.current) return reject("No audio element")
          audioRef.current.addEventListener("canplaythrough", resolve, { once: true })
          audioRef.current.addEventListener("error", (e) => reject(e.currentTarget), { once: true })
          audioRef.current.load()
        })

        console.log("Audio loaded successfully")
      }

      // Create audio context if it doesn't exist
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        analyzerRef.current = audioContextRef.current.createAnalyser()
        analyzerRef.current.fftSize = 4096
        analyzerRef.current.smoothingTimeConstant = 0.4

        sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current)
        sourceRef.current.connect(analyzerRef.current)
        analyzerRef.current.connect(audioContextRef.current.destination)

        // Handle audio end
        audioRef.current.addEventListener("ended", () => {
          setIsPlaying(false)
          if (audioRef.current) {
            audioRef.current.currentTime = 0
          }
        })

        console.log("Audio context setup complete")
      }

      await audioContextRef.current.resume()
      setIsInitialized(true)
      setIsLoading(false)
      console.log("Audio initialization complete")
    } catch (err) {
      console.error("Audio initialization error:", err)
      setError(err instanceof Error ? err.message : "Failed to initialize audio")
      setIsLoading(false)
    }
  }, [])

  // Initialize audio on mount
  useEffect(() => {
    initializeAudio()
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [initializeAudio])

  const togglePlay = async () => {
    try {
      if (!audioRef.current || isLoading) return
      if (!isInitialized) {
        await initializeAudio()
      }

      if (isPlaying) {
        console.log("Pausing audio...")
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        console.log("Playing audio...")
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (err) {
      console.error("Toggle play error:", err)
      setError(err instanceof Error ? err.message : "Failed to play audio")
    }
  }

  return (
    <AudioServiceContext.Provider
      value={{
        isPlaying,
        isLoading,
        error,
        togglePlay,
        analyzer: analyzerRef.current,
      }}
    >
      {children}
    </AudioServiceContext.Provider>
  )
}

export function useAudioService() {
  const context = useContext(AudioServiceContext)
  if (context === undefined) {
    throw new Error("useAudioService must be used within an AudioServiceProvider")
  }
  return context
}

