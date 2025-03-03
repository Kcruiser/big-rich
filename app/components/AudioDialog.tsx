"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import AudioPlayer from "./AudioPlayer"
import { DialogDescription } from "@/components/ui/dialog"

interface AudioDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function AudioDialog({ isOpen, onOpenChange }: AudioDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[calc(100vw-2rem)] sm:w-[1000px] max-h-[90vh] overflow-hidden p-0 bg-black/30 backdrop-blur-md border border-yellow-400/20"
        aria-describedby="audio-dialog-description"
      >
        <DialogDescription id="audio-dialog-description" className="sr-only">
          Audio visualizer and player controls for the Big Rich theme song
        </DialogDescription>
        <div className="p-8 sm:p-12">
          <AudioPlayer />
        </div>
      </DialogContent>
    </Dialog>
  )
}

