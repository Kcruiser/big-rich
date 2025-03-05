"use client"

import { createContext, useContext, useRef, useEffect, useState, type ReactNode } from "react"

interface AudioServiceContextType {
  isPlaying: boolean
  togglePlay: () => Promise<void>
  audioElement: HTMLAudioElement | null
  audioContext: AudioContext | null
  analyzer: AnalyserNode | null
}

const AudioServiceContext = createContext<AudioServiceContextType | undefined>(undefined)

export function AudioServiceProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [analyzer, setAnalyzer] = useState<AnalyserNode | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create a persistent audio element
    const audio = new Audio()
    audio.src = "/BigRich-2.mp3"
    audio.crossOrigin = "anonymous"
    audio.preload = "auto"
    audioRef.current = audio

    // Initialize Web Audio API context
    const context = new (window.AudioContext || (window as any).webkitAudioContext)()
    const analyzerNode = context.createAnalyser()
    analyzerNode.fftSize = 2048
    analyzerNode.smoothingTimeConstant = 0.6

    // Connect audio element to analyzer
    const source = context.createMediaElementSource(audio)
    source.connect(analyzerNode)
    analyzerNode.connect(context.destination)

    setAudioContext(context)
    setAnalyzer(analyzerNode)

    // Handle audio end
    audio.addEventListener("ended", () => {
      setIsPlaying(false)
      audio.currentTime = 0
    })

    return () => {
      audio.pause()
      audio.src = ""
      context.close()
    }
  }, [])

  const togglePlay = async () => {
    if (!audioRef.current || !audioContext) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      await audioContext.resume()
      await audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <AudioServiceContext.Provider
      value={{
        isPlaying,
        togglePlay,
        audioElement: audioRef.current,
        audioContext,
        analyzer,
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

