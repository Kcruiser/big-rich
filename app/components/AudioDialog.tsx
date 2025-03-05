"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Jost } from "next/font/google"
import AudioPlayer from "./AudioPlayer"
import { useAudioService } from "@/lib/audio-service" // Updated import

const jost = Jost({
  weight: ["400"],
  subsets: ["latin"],
})

interface AudioDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function AudioDialog({ isOpen, onOpenChange }: AudioDialogProps) {
  const { isPlaying } = useAudioService() // Updated hook usage

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] sm:w-[600px] p-0 bg-black/30 backdrop-blur-md border border-yellow-400/20">
        <div className="p-6">
          <AudioPlayer />
        </div>
      </DialogContent>
    </Dialog>
  )
}

