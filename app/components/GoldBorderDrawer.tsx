"use client"

import { Drawer, DrawerContent } from "@/components/ui/drawer"
import GoldBorderAdder from "./GoldBorderAdder"

interface GoldBorderDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function GoldBorderDrawer({ open, onOpenChange }: GoldBorderDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-black/5 backdrop-blur-md border-t border-yellow-400/20">
        <div className="mx-auto w-full max-w-4xl p-6">
          <GoldBorderAdder onClose={() => onOpenChange(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

