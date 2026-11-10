"use client";

import { useState, useEffect } from "react";

export default function SamsungFloatingBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 550);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between gap-6 bg-white/95 backdrop-blur-xl border border-gray-200/80 rounded-full px-6 py-2.5 shadow-2xl shadow-black/15 min-w-[320px] md:min-w-[480px]">
        {/* Product Brand & Model */}
        <div className="flex items-center gap-2.5">
          <img
            src="/samsung-blue-ellipse-logo.png"
            alt="Samsung"
            className="h-3.5 w-auto object-contain"
          />
          <span className="text-black text-sm md:text-base font-bold tracking-tight whitespace-nowrap font-sans">
            Galaxy Z Fold8 Ultra
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="#features"
            className="px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold text-black bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            Explore
          </a>
          <a
            href="#models"
            className="px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold text-white bg-black hover:bg-[#2189ff] transition-colors duration-200"
          >
            Buy
          </a>
        </div>
      </div>
    </div>
  );
}
