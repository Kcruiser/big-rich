"use client"
import { Poiret_One, Montserrat } from "next/font/google"
import Image from "next/image"
import { motion } from "framer-motion"

const poiretOne = Poiret_One({
  weight: ["400"],
  subsets: ["latin"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const images = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-13.jpg-xtV8M4ttH1FbFqjZmihv5cSvdd7sSV.jpeg",
    alt: "Big Rich in a beige patterned suit and top hat with gold jewelry in a luxury vehicle",
  },
]

export default function AboutSection() {
  return (
    <div className="max-w-4xl mx-auto px-4 text-center relative">
      <h2
        className={`${poiretOne.className} text-4xl sm:text-5xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent`}
      >
        How To Tell If You're Rich...
      </h2>
      <div className="h-1 w-20 mx-auto bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 rounded-full mb-8" />
      <div
        className={`${montserrat.className} relative grid grid-cols-1 md:grid-cols-2 gap-8 text-left text-base sm:text-lg md:text-xl leading-relaxed text-white mb-12 p-8 rounded-xl backdrop-blur-[12px]`}
        style={{
          background: "rgba(255, 215, 0, 0.02)",
          border: "1px solid rgba(255, 215, 0, 0.1)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <ol className="list-decimal list-inside space-y-4 relative z-10">
          <li>Deciding which house to sleep in is your hardest decision of the day.</li>
          <li>You own things that require their own security team.</li>
          <li>You once forgot about an entire property you owned.</li>
          <li>Your yacht has a smaller yacht inside it.</li>
          <li>Your pet eats better than most people.</li>
        </ol>
        <ol className="list-decimal list-inside space-y-4 relative z-10" start="6">
          <li>The only time you carry cash is in duffle bags.</li>
          <li>You NEVER ask how much something costs.</li>
          <li>You have a private chef for your pets.</li>
          <li>Hotels? No. Private islands? Yes.</li>
          <li>You've can't remember the last time you "checked" your bank account</li>
        </ol>
      </div>

      <div className="px-4 py-12 relative">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-none">
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="relative w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative w-full aspect-[16/9] p-[15px] rounded-lg group transition-all duration-300">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 opacity-100 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="absolute inset-[15px] rounded-lg bg-black" />
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      boxShadow:
                        "0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.3), 0 0 60px rgba(255, 215, 0, 0.2)",
                    }}
                  />
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-lg"
                    sizes="100vw"
                    loading="lazy"
                    quality={75}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

