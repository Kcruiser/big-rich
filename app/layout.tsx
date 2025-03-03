import "@/styles/globals.css"
import { Inter, Quicksand, Mr_Bedfort, Comfortaa } from "next/font/google"
import type React from "react"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })
const quicksand = Quicksand({ subsets: ["latin"] })
const mrBedfort = Mr_Bedfort({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

const comfortaa = Comfortaa({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

