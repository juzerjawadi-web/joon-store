"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Truck, MessageCircle } from "lucide-react";

interface ModelData {
  id: string;
  name: string;
  tagline: string;
  price: string;
  specs: {
    display: string;
    camera: string;
    chip: string;
    battery: string;
  };
  colors: { name: string; hex: string }[];
}

const models: ModelData[] = [
  {
    id: "fold8-ultra",
    name: "Galaxy Z Fold8 Ultra",
    tagline: "The definitive foldable powerhouse with titanium build & 200MP camera.",
    price: "₹1,84,999",
    specs: {
      display: "7.6\" Dynamic AMOLED 2X + 6.3\" Cover",
      camera: "200MP Quad Camera with AI Engine",
      chip: "Snapdragon® 8 Elite for Galaxy",
      battery: "5,000 mAh All-Day Intelligent Battery",
    },
    colors: [
      { name: "Titanium Black", hex: "#1f1f23" },
      { name: "Silver Shadow", hex: "#d5d7db" },
      { name: "Titanium Gray", hex: "#5b5e65" },
    ],
  },
  {
    id: "fold8",
    name: "Galaxy Z Fold8",
    tagline: "Ultra-thin engineering meets full tablet multitasking anywhere.",
    price: "₹1,64,999",
    specs: {
      display: "7.6\" Main Screen + 6.3\" 120Hz Cover",
      camera: "50MP Triple Camera with 30x Space Zoom",
      chip: "Snapdragon® 8 Elite for Galaxy",
      battery: "4,600 mAh Fast Wireless Charging 2.0",
    },
    colors: [
      { name: "Navy Blue", hex: "#1a2c4e" },
      { name: "Silver Shadow", hex: "#d5d7db" },
      { name: "Pink", hex: "#e7b4b4" },
    ],
  },
  {
    id: "flip8",
    name: "Galaxy Z Flip8",
    tagline: "Pocket-sized elegance with 3.4\" full interactive FlexWindow.",
    price: "₹1,09,999",
    specs: {
      display: "6.7\" Dynamic AMOLED 2X + 3.4\" FlexWindow",
      camera: "50MP Dual Camera with FlexCam Auto Zoom",
      chip: "Snapdragon® 8 Elite for Galaxy",
      battery: "4,000 mAh Dual Battery Architecture",
    },
    colors: [
      { name: "Mint", hex: "#a8d5c4" },
      { name: "Pink", hex: "#f0c2c2" },
      { name: "Silver Shadow", hex: "#d5d7db" },
      { name: "Yellow", hex: "#f2e49c" },
    ],
  },
];

export default function SamsungModelComparison() {
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({
    "fold8-ultra": models[0].colors[0].name,
    "fold8": models[1].colors[0].name,
    "flip8": models[2].colors[0].name,
  });

  const getWhatsAppLink = (modelName: string, price: string) => {
    const color = selectedColors[models.find((m) => m.name === modelName)?.id || ""] || "";
    const text = encodeURIComponent(
      `Hello JOON STORES! I would like to order the Samsung ${modelName} in ${color} (${price}). Please assist with availability and express dispatch.`
    );
    return `https://wa.me/919167868179?text=${text}`;
  };

  return (
    <section id="models" className="py-20 md:py-28 bg-white border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2189ff] mb-3">
            Choose Your Galaxy
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black">
            Which foldable fits your lifestyle?
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-3">
            Direct Dubai import • 100% factory sealed • Worldwide manufacturer warranty.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {models.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-gray-200 p-8 flex flex-col justify-between hover:border-black/40 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div>
                {/* Model Title */}
                <h3 className="text-2xl font-bold text-black tracking-tight mb-2">
                  {m.name}
                </h3>
                <p className="text-sm text-gray-500 min-h-[40px] mb-6 leading-relaxed">
                  {m.tagline}
                </p>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <span className="text-xs uppercase font-bold tracking-wider text-gray-400 block mb-1">
                    Direct Store Price
                  </span>
                  <span className="text-3xl font-extrabold text-black tracking-tight">
                    {m.price}
                  </span>
                </div>

                {/* Color Selector */}
                <div className="mb-8">
                  <span className="text-xs font-semibold text-gray-500 block mb-3">
                    Color: <strong className="text-black">{selectedColors[m.id]}</strong>
                  </span>
                  <div className="flex items-center gap-3">
                    {m.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() =>
                          setSelectedColors((prev) => ({ ...prev, [m.id]: c.name }))
                        }
                        aria-label={c.name}
                        title={c.name}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          selectedColors[m.id] === c.name
                            ? "scale-110 border-black ring-2 ring-black/10"
                            : "border-gray-200 hover:scale-105"
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Specs List */}
                <div className="space-y-4 mb-8 text-sm">
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#2189ff] shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{m.specs.display}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#2189ff] shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{m.specs.camera}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#2189ff] shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{m.specs.chip}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#2189ff] shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{m.specs.battery}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <a
                  href={getWhatsAppLink(m.name, m.price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-black hover:bg-[#2189ff] text-white font-bold text-sm transition-colors duration-200 shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </a>

                <div className="flex items-center justify-center gap-4 text-[11px] text-gray-500 pt-2 font-medium">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Express Dispatch
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Worldwide Warranty
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
