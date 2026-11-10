"use client";

import { motion } from "framer-motion";
import { Sparkles, Shield, Cpu, Sun, Layers, Camera } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    badge: "Intelligence",
    title: "Galaxy AI is Built In",
    desc: "Real-time voice interpretation, Circle to Search with Google, and Generative Edit transform your foldable into an effortless productivity superpower.",
  },
  {
    icon: Layers,
    badge: "Engineering",
    title: "Ultra Flex Hinge",
    desc: "Redesigned dual-rail mechanism folds completely flat with zero screen gap, aerospace-grade Armor Aluminum, and IP48 water resistance.",
  },
  {
    icon: Sun,
    badge: "Display",
    title: "2,600 Nits AMOLED 2X",
    desc: "Expansive 120Hz LTPO display equipped with Vision Booster for brilliant, glare-free outdoor brightness in direct Indian sunlight.",
  },
  {
    icon: Cpu,
    badge: "Performance",
    title: "Snapdragon® 8 Elite",
    desc: "Custom-tuned for Galaxy with 1.6x larger vapor chamber cooling, hardware ray-tracing, and all-day power efficiency.",
  },
  {
    icon: Camera,
    badge: "Optics",
    title: "200MP ProVisual Engine",
    desc: "Ultra-high resolution sensor coupled with AI-powered multi-frame processing captures vivid nightography and studio portraits.",
  },
  {
    icon: Shield,
    badge: "Assurance",
    title: "JOON Worldwide Warranty",
    desc: "100% factory-sealed Dubai units with worldwide official Samsung Care coverage and direct doorstep concierge across India.",
  },
];

export default function SamsungHighlights() {
  return (
    <section id="features" className="py-20 md:py-28 bg-[#f8f9fa] border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-[800px] mb-14 md:mb-20">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2189ff] mb-3">
            Next-Generation Foldables
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black leading-tight">
            Designed for the future. <br className="hidden sm:inline" />
            <span className="text-gray-400">Folded for today.</span>
          </h2>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2189ff] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    {f.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-black mt-2 mb-3 tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
