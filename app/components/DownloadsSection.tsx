"use client"

import { Comfortaa, Poiret_One, Montserrat, Jost } from "next/font/google"
import { motion } from "framer-motion"
import Image from "next/image"
import { Download } from "lucide-react"

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const poiretOne = Poiret_One({
  weight: ["400"],
  subsets: ["latin"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const jost = Jost({
  subsets: ["latin"],
  weight: ["700"],
})

export default function DownloadsSection() {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="text-center mb-12">
        <h2
          className={`${poiretOne.className} text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent`}
        >
          Downloads
        </h2>
        <div className="h-1 w-20 mx-auto bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 rounded-full" />
      </div>
      <p className={`${montserrat.className} text-lg md:text-xl leading-relaxed mb-6 text-white text-center`}>
        <motion.span
          className="font-bold text-[#FFD700] inline-block"
          style={{
            textShadow: "0 0 15px rgba(255, 215, 0, 0.7)",
          }}
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          ↓↓↓ FREE SELF-HELP BOOK ↓↓↓
        </motion.span>
      </p>
      <div className="grid grid-cols-2 gap-8 mt-12 max-w-2xl mx-auto">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow-lg group">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Soaring%20in%20Style%20A%20Serious%20Guide%20to%20Owning%20a%20Solid%20Gold%20Helicopter-iyUVPlHuYW14uvCHQQ9lL6wfWVti6C.png"
            alt="Soaring in Style: A Serious Guide to Owning a Solid Gold Helicopter"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <a
            href="https://os34ii8yvtrvnvk9.public.blob.vercel-storage.com/ebooks/GoldHelicopter-3ihi7ZlsEHpDAVbcZats3OFZXdTJgI.pdf"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] flex items-center justify-center transition-all duration-300"
            download="Soaring-in-Style-Gold-Helicopter-Guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="relative p-4 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400">
              <Download className="w-8 h-8 text-black" />
            </div>
          </a>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow-lg group">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/White%20Freebies%20Download%20Call%20to%20Action%20Blog%20Banner%20%282%29.jpg-FrI31QfzUe2Up7g9SkLbuDRJIGNiyW.jpeg"
            alt="Rich & Reckless: Spend First, Think Later"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <a
            href="https://os34ii8yvtrvnvk9.public.blob.vercel-storage.com/ebooks/rich-and-reckless-spend-first-think-later-gtt1ZwKLxx6yxsSNh45o1Ykd6Zf5br.pdf"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] flex items-center justify-center transition-all duration-300"
            download="Rich-and-Reckless-Spend-First-Think-Later.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="relative p-4 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400">
              <Download className="w-8 h-8 text-black" />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

