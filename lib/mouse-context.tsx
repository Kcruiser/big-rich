"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface MousePosition {
  x: number
  y: number
}

const MouseContext = createContext<MousePosition>({ x: 0, y: 0 })

export const useMousePosition = () => useContext(MouseContext)

export const MouseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <MouseContext.Provider value={mousePosition}>{children}</MouseContext.Provider>
}

