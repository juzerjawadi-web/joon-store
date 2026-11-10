"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function SamsungHero() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section 
      id="hero"
      className="relative w-full bg-white text-black overflow-hidden pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-20 min-h-[calc(100vh-80px)] flex items-center"
      aria-label="Samsung Galaxy Z Fold8 & Flip8 Hero Showcase"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        {/* Asymmetric Desktop Layout / Clean Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Column: Phone Trio Image (Asset 3: Elegant Foldable Phone Trio) */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 relative flex justify-center lg:justify-end items-end order-2 lg:order-1"
          >
            <div className="relative w-full max-w-[540px] sm:max-w-[620px] lg:max-w-[720px] xl:max-w-[780px]">
              {/* Product Hero Image */}
              <img
                src="/samsung-phone-hero.png"
                alt="Galaxy Z Fold8 Ultra, Fold8, and Flip8 foldable phone trio"
                className="w-full h-auto object-contain max-h-[65vh] sm:max-h-[72vh] lg:max-h-[82vh] select-none pointer-events-none drop-shadow-sm"
                loading="eager"
                draggable={false}
              />

              {/* Interactive Pause/Play Button from Reference (bottom-left) */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? "Pause visual presentation" : "Play visual presentation"}
                className="absolute bottom-2 left-6 sm:left-10 w-6 h-6 rounded-full border border-black/40 flex items-center justify-center text-black/70 hover:text-black hover:border-black transition-colors focus:outline-none focus:ring-1 focus:ring-black"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <span className="flex gap-[2px] items-center justify-center">
                    <span className="w-[1.5px] h-2.5 bg-current rounded-full" />
                    <span className="w-[1.5px] h-2.5 bg-current rounded-full" />
                  </span>
                ) : (
                  <span className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px] border-l-current ml-0.5" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Right Column: Hero Typography & CTA Buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.14, delayChildren: 0.15 }
              }
            }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-1 lg:order-2 lg:pl-6 xl:pl-12"
          >
            {/* Eyebrow: "The all-new" */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="text-[#2189ff] text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-semibold tracking-tight mb-2 sm:mb-3 font-sans"
            >
              The all-new
            </motion.p>

            {/* Headline: "Galaxy Z Fold8 Ultra | Fold8 | Flip8" */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[58px] font-bold tracking-tight leading-[1.12] mb-6 sm:mb-8 font-sans"
            >
              Galaxy Z Fold8 Ultra <span className="font-light text-black/30">|</span> Fold8 <span className="font-light text-black/30">|</span> Flip8
            </motion.h1>

            {/* CTA Buttons: "Learn more" (underline) & "Buy" (outline pill) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="flex items-center gap-6 sm:gap-8"
            >
              {/* Learn More Text Link with underline */}
              <a
                href="#features"
                className="relative text-[15px] sm:text-[16px] font-bold text-black border-b-2 border-black pb-0.5 hover:text-[#2189ff] hover:border-[#2189ff] transition-all duration-200"
              >
                Learn more
              </a>

              {/* Buy Outline Pill Button */}
              <a
                href="#models"
                className="px-6 sm:px-8 py-2 sm:py-2.5 rounded-full border-[1.5px] border-black text-[15px] sm:text-[16px] font-bold text-black hover:bg-black hover:text-white transition-all duration-200 shadow-sm"
              >
                Buy
              </a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
