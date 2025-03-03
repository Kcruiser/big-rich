"use client"

import { Drawer, DrawerContent } from "@/components/ui/drawer"

interface SwapDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SwapDrawer({ open, onOpenChange }: SwapDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-black/60 backdrop-blur-md border-t border-yellow-400/20">
        <div className="mx-auto w-full max-w-[624px] p-6">
          <div className="relative w-full h-[600px] sm:h-[720px]">
            <iframe
              src="https://widget.piteas.io/#/swap?inputCurrency=PLS&outputCurrency=0x33779a40987F729a7DF6cc08B1dAD1a21b58A220&theme=dark&exactField=input&exactAmount=1000000"
              className="w-full h-full"
              style={{
                margin: "0 auto",
                display: "block",
                minWidth: "300px",
                border: "5px solid transparent",
                borderImage: "linear-gradient(to right, #FFD700, #FFF8DC, #FFD700) 1",
                boxShadow: "0 0 10px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)",
              }}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

