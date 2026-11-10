"use client";

import Link from "next/link";
import { Search, ShoppingBag, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AppleLogo = () => (
  <svg viewBox="0 0 14 18" className="w-[14px] h-[18px] fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.887 3.091c.545-.688.913-1.57.813-2.455-.758.031-1.666.525-2.235 1.226-.508.625-.953 1.536-.833 2.404.851.066 1.696-.47 2.255-1.175zM12.015 11.233c-.021 2.215 1.895 2.951 1.916 2.961-.016.052-.295 1.03-.984 2.053-.62.92-1.272 1.83-2.261 1.848-.969.018-1.294-.582-2.391-.582-1.101 0-1.464.564-2.408.6-1.009.035-1.745-.968-2.37-1.879-1.276-1.877-2.256-5.308-1.597-7.669.327-1.17 1.157-1.921 2.072-1.939.952-.018 1.854.653 2.423.653.568 0 1.656-.81 2.781-.69 1.18.047 2.251.583 2.963 1.651-2.49 1.523-2.091 4.966-.144 5.993z" />
  </svg>
);

const navItems = [
  "Store",
  "Mac",
  "iPad",
  "iPhone",
  "Watch",
  "AirPods",
  "TV & Home",
  "Entertainment",
  "Accessories",
  "Support"
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-[rgba(0,0,0,0.8)] backdrop-blur-md">
        <div className="max-w-[1024px] mx-auto h-[44px] flex items-center justify-between px-4">
          
          {/* Brand Selector: Apple & Samsung */}
          <div className="flex items-center gap-3 z-[60]">
            <Link 
              href="/" 
              title="Apple Experience" 
              aria-label="Apple Experience (Active)"
              className="text-white flex items-center justify-center p-0.5 transition-transform hover:scale-105 focus:outline-none focus:ring-1 focus:ring-white/40 rounded"
            >
              <AppleLogo />
            </Link>

            <span className="w-[1px] h-3.5 bg-white/25" aria-hidden="true" />

            <Link 
              href="/samsung" 
              title="Switch to Samsung Experience" 
              aria-label="Switch to Samsung Experience"
              className="opacity-75 hover:opacity-100 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center p-0.5 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
            >
              <img 
                src="/samsung-blue-ellipse-logo.png" 
                alt="Samsung" 
                className="h-[13px] w-auto object-contain drop-shadow-sm" 
              />
            </Link>
          </div>

          {/* Links (Desktop) */}
          {navItems.map((item) => (
            <Link 
              key={item} 
              href="#" 
              className="text-xs font-normal text-[#f5f5f7]/80 hover:text-white transition-colors duration-300 hidden md:block"
              style={{ WebkitFontSmoothing: "antialiased" }}
            >
              {item}
            </Link>
          ))}

          <div className="flex items-center gap-6 md:gap-0 z-[60]">
            {/* Search */}
            <button className="text-[#f5f5f7]/80 hover:text-white transition-colors duration-300 flex items-center justify-center md:hidden">
              <Search className="w-[15px] h-[15px] stroke-[1.5]" />
            </button>

            {/* Bag */}
            <button className="text-[#f5f5f7]/80 hover:text-white transition-colors duration-300 flex items-center justify-center ml-0 md:ml-6">
              <ShoppingBag className="w-[15px] h-[15px] stroke-[1.5]" />
            </button>

            {/* User Profile */}
            <Link href="/login" className="text-[#f5f5f7]/80 hover:text-white transition-colors duration-300 flex items-center justify-center ml-6">
              <User className="w-[15px] h-[15px] stroke-[1.5]" />
            </Link>

            {/* Hamburger (Mobile) */}
            <button 
              className="text-[#f5f5f7]/80 hover:text-white transition-colors duration-300 flex items-center justify-center md:hidden ml-6"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-[18px] h-[18px] stroke-[1.5]" />
              ) : (
                <Menu className="w-[18px] h-[18px] stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-16 px-6 md:hidden overflow-y-auto"
          >
            {/* Mobile Brand Switcher */}
            <div className="flex items-center justify-between py-3 mb-6 border-b border-white/10">
              <span className="text-xs uppercase tracking-wider text-white/50 font-medium">Select Brand</span>
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-white text-xs font-medium border border-white/20"
                >
                  <AppleLogo />
                  <span>Apple</span>
                </Link>
                <Link
                  href="/samsung"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-medium transition-colors"
                >
                  <img src="/samsung-blue-ellipse-logo.png" alt="Samsung" className="h-3 w-auto object-contain" />
                  <span>Samsung</span>
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-6 mt-2">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-semibold text-white tracking-tight border-b border-white/10 pb-4"
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
