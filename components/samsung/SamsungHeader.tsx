"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AppleLogo = () => (
  <svg viewBox="0 0 14 18" className="w-[14px] h-[17px] fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.887 3.091c.545-.688.913-1.57.813-2.455-.758.031-1.666.525-2.235 1.226-.508.625-.953 1.536-.833 2.404.851.066 1.696-.47 2.255-1.175zM12.015 11.233c-.021 2.215 1.895 2.951 1.916 2.961-.016.052-.295 1.03-.984 2.053-.62.92-1.272 1.83-2.261 1.848-.969.018-1.294-.582-2.391-.582-1.101 0-1.464.564-2.408.6-1.009.035-1.745-.968-2.37-1.879-1.276-1.877-2.256-5.308-1.597-7.669.327-1.17 1.157-1.921 2.072-1.939.952-.018 1.854.653 2.423.653.568 0 1.656-.81 2.781-.69 1.18.047 2.251.583 2.963 1.651-2.49 1.523-2.091 4.966-.144 5.993z" />
  </svg>
);

const samsungNavItems = [
  { label: "Shop", href: "#models" },
  { label: "Phones & Tablets", href: "#hero" },
  { label: "Wearables", href: "#wearables" },
  { label: "TV & AV", href: "#tv-av" },
  { label: "Appliances", href: "#appliances" },
  { label: "Audio", href: "#audio" },
  { label: "PC & Monitors", href: "#monitors" },
];

export default function SamsungHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-colors duration-300">
        {/* Top utility sub-nav from Samsung reference */}
        <div className="hidden md:flex max-w-[1440px] mx-auto px-6 lg:px-12 pt-2.5 pb-1 justify-end items-center gap-6 text-[12px] font-semibold text-black tracking-tight">
          <a
            href="#support"
            className="hover:text-[#2189ff] transition-colors duration-200"
          >
            Support
          </a>
          <a
            href="#business"
            className="inline-flex items-center gap-1 hover:text-[#2189ff] transition-colors duration-200"
          >
            <span>For Business</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2]" />
          </a>
        </div>

        {/* Main Navigation Row */}
        <div className="max-w-[1440px] mx-auto h-[58px] md:h-[62px] flex items-center justify-between px-4 sm:px-6 lg:px-12">
          {/* Left: Brand Switcher + Samsung Wordmark + Nav Links */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            {/* Integrated Brand Switcher: Apple & Samsung */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.08] hover:border-black/20 transition-all shadow-sm">
              {/* Apple Switcher (Return to Apple) */}
              <Link
                href="/"
                title="Switch to Apple Experience"
                aria-label="Switch to Apple Experience"
                className="text-black/45 hover:text-black hover:scale-110 active:scale-95 transition-all p-0.5 rounded focus:outline-none focus:ring-1 focus:ring-black/30"
              >
                <AppleLogo />
              </Link>

              <span className="w-px h-3.5 bg-black/20" aria-hidden="true" />

              {/* Samsung Blue Ellipse (Active) */}
              <Link
                href="/samsung"
                title="Samsung Experience (Active)"
                aria-label="Samsung Experience"
                className="opacity-100 scale-100 flex items-center p-0.5 rounded focus:outline-none"
              >
                <img
                  src="/samsung-blue-ellipse-logo.png"
                  alt="Samsung"
                  className="h-[14px] w-auto object-contain drop-shadow-sm"
                />
              </Link>
            </div>

            {/* Samsung Wordmark from reference */}
            <Link
              href="/samsung"
              className="text-[20px] sm:text-[22px] font-black tracking-[-0.035em] text-black font-sans select-none hover:opacity-85 transition-opacity"
            >
              SAMSUNG
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6 lg:gap-7 ml-2">
              {samsungNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[13.5px] font-bold text-black tracking-tight hover:text-[#2189ff] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Icons & Mobile Hamburger */}
          <div className="flex items-center gap-5 sm:gap-6">
            {/* Search */}
            <button
              aria-label="Search Samsung"
              className="text-black hover:text-[#2189ff] transition-colors duration-200 p-1 rounded-full focus:outline-none focus:ring-1 focus:ring-[#2189ff]"
            >
              <Search className="w-[19px] h-[19px] stroke-[1.8]" />
            </button>

            {/* Shopping Cart */}
            <button
              aria-label="Shopping Cart"
              className="text-black hover:text-[#2189ff] transition-colors duration-200 p-1 rounded-full focus:outline-none focus:ring-1 focus:ring-[#2189ff] relative"
            >
              <ShoppingCart className="w-[19px] h-[19px] stroke-[1.8]" />
            </button>

            {/* User Profile */}
            <Link
              href="/login"
              aria-label="User Account"
              className="text-black hover:text-[#2189ff] transition-colors duration-200 p-1 rounded-full focus:outline-none focus:ring-1 focus:ring-[#2189ff]"
            >
              <User className="w-[19px] h-[19px] stroke-[1.8]" />
            </Link>

            {/* Hamburger Menu (Mobile & Tablet) */}
            <button
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-black hover:text-[#2189ff] transition-colors xl:hidden p-1 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[1.8]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[1.8]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-white pt-20 px-6 xl:hidden overflow-y-auto"
          >
            {/* Brand Switcher inside Drawer */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
              <span className="text-xs uppercase font-bold tracking-wider text-gray-500">
                Experience
              </span>
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-black text-xs font-semibold transition-colors"
                >
                  <AppleLogo />
                  <span>Apple</span>
                </Link>
                <Link
                  href="/samsung"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#000f8d] text-white text-xs font-semibold shadow-sm"
                >
                  <img
                    src="/samsung-blue-ellipse-logo.png"
                    alt="Samsung"
                    className="h-3 w-auto object-contain brightness-0 invert"
                  />
                  <span>Samsung</span>
                </Link>
              </div>
            </div>

            {/* Samsung Mobile Nav Links */}
            <nav className="flex flex-col gap-4">
              {samsungNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-bold text-black tracking-tight py-2 border-b border-gray-100 hover:text-[#2189ff] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3 text-sm font-semibold text-gray-600">
                <a href="#support" className="hover:text-black">Support</a>
                <a href="#business" className="flex items-center gap-1 hover:text-black">
                  <span>For Business</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
