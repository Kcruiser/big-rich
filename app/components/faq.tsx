"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Poiret_One, Montserrat, Lilita_One } from "next/font/google"

const poiretOne = Poiret_One({
  weight: ["400"],
  subsets: ["latin"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const lilitaOne = Lilita_One({
  weight: ["400"],
  subsets: ["latin"],
})

const faqItems = [
  {
    question: "What is Contract Address?",
    answer: "0x33779a40987F729a7DF6cc08B1dAD1a21b58A220",
  },
  {
    question: "What is Total Supply?",
    answer: "1,000,000,000",
  },
  {
    question: "What is the main liquidity pair?",
    answer: "RICH/WPLS on PulseX V2. Address is 0x845cbc3a9cA921724449591810fDeb9856526f3c",
  },
  {
    question: "What is the deployer address?",
    answer: (
      <>
        0x479143834c0ec540e0924923383cdd8839b138a3 (
        <a
          href="https://bafybeicb2hlad6zs4kc4yvn5xbbzti6krjtpoxrysg42d4e5s5oubbipum.ipfs.dweb.link/#/token/0x33779a40987F729a7DF6cc08B1dAD1a21b58A220?tab=holders"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          VIEW ON PULSESCAN
        </a>
        )
      </>
    ),
  },
  {
    question: "How do I buy?",
    answer: (
      <>
        You can buy $RICH directly through{" "}
        <a
          href="https://pulsex.mypinata.cloud/ipfs/bafybeibzu7nje2o2tufb3ifitjrto3n3xcwon7fghq2igtcupulfubnrim/#/?chain=pulsechain"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          PulseX
        </a>{" "}
        or using the swap aggregator through the{" "}
        <a
          href="https://internetmoney.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          Internet Money Wallet
        </a>
        . Connect your wallet, ensure you have enough PLS for the transaction and gas fees, then swap PLS for $RICH.
      </>
    ),
  },
  {
    question: "What Wallet Should I Use?",
    answer:
      "We recommend using Internet Money Wallet or Rabby Wallet. Both can be downloaded from the iOS App Store, Google Play Store, or as a Chrome Extension.",
  },
  {
    question: "When was $RICH Launched?",
    answer: "The $RICH token launched on February 13th, 2025 on the PulseChain network.",
  },
  {
    question: "Is liquidity burnt?",
    answer: (
      <>
        Yes, (
        <a
          href="https://otter-pulsechain.g4mm4.io/tx/0xf54d4bb18ca673f5d32a5b7bd48cb62c1142daf005cf9cf6d2e7a016de5b18dc"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-800 hover:text-blue-700 underline"
        >
          Verify Burn Tx
        </a>
        )
      </>
    ),
  },
  {
    question: "Are There Admin Keys?",
    answer: "No, $RICH was launched on Pump.Ties which uses fully renounced contracts.",
  },
]

interface FAQItemProps {
  question: string
  answer: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <motion.div
      className="mb-4 last:mb-0 overflow-hidden rounded-xl bg-gradient-to-r from-zinc-900/80 to-black/80 backdrop-blur-sm"
      initial={false}
      animate={{ backgroundColor: isOpen ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.2)" }}
      transition={{ duration: 0.3 }}
    >
      <button
        className={`${montserrat.className} relative w-full px-6 py-5 flex items-center justify-center text-center transition-all duration-300 rounded-xl outline-none hover:bg-white/5 border-b border-[#FFD700] shadow-[0_2px_4px_-1px_#FFD700]`}
        onClick={onToggle}
      >
        <span className="flex-grow text-lg font-medium text-[#FFD700]">{question}</span>
        <motion.div
          className="ml-2"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-yellow-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div
              className={`${lilitaOne.className} px-6 pb-5 text-black text-center bg-gradient-to-b from-[#FFD700]/90 to-black`}
            >
              <div className="prose prose-invert max-w-none !text-black text-lg">
                {answer}
                {question === "How do I buy?" && (
                  <p className="mt-4 text-red-400 font-medium border-l-2 border-red-500 pl-4 text-left">
                    IMPORTANT: It is best practice to set gas to HIGH when submitting transaction to reduce chance of
                    getting a stuck transaction. (There is usually a EDIT button next to the estimated gas. this is
                    where you can set to HIGH)
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="relative py-12 px-4 overflow-hidden">
      <motion.div
        className="relative container mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <h2
            className={`${poiretOne.className} text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent`}
          >
            Frequently Asked Questions
          </h2>
          <div className="h-1 w-20 mx-auto bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 rounded-full" />
        </div>

        <div className="grid gap-4 transition-all duration-500 ease-in-out">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

