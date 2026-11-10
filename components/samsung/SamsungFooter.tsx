"use client";

import Link from "next/link";
import { MessageCircle, Mail, Globe, Shield, ArrowRight } from "lucide-react";

const AppleLogo = () => (
  <svg viewBox="0 0 14 18" className="w-[13px] h-[16px] fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.887 3.091c.545-.688.913-1.57.813-2.455-.758.031-1.666.525-2.235 1.226-.508.625-.953 1.536-.833 2.404.851.066 1.696-.47 2.255-1.175zM12.015 11.233c-.021 2.215 1.895 2.951 1.916 2.961-.016.052-.295 1.03-.984 2.053-.62.92-1.272 1.83-2.261 1.848-.969.018-1.294-.582-2.391-.582-1.101 0-1.464.564-2.408.6-1.009.035-1.745-.968-2.37-1.879-1.276-1.877-2.256-5.308-1.597-7.669.327-1.17 1.157-1.921 2.072-1.939.952-.018 1.854.653 2.423.653.568 0 1.656-.81 2.781-.69 1.18.047 2.251.583 2.963 1.651-2.49 1.523-2.091 4.966-.144 5.993z" />
  </svg>
);

export default function SamsungFooter() {
  return (
    <footer className="bg-[#111113] text-gray-400 text-xs py-14 border-t border-gray-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Brand Switch Banner */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
              <AppleLogo />
            </div>
            <div>
              <h4 className="text-white text-base font-semibold tracking-tight">
                Looking for Apple iPhone 18 Pro?
              </h4>
              <p className="text-gray-400 text-xs mt-0.5">
                Switch back to our flagship Apple experience anytime.
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-gray-200 transition-colors shadow-sm"
          >
            <span>Explore Apple Store</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Brand & Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gray-800">
          {/* Col 1 */}
          <div className="space-y-3">
            <h5 className="text-white text-sm font-bold tracking-tight">
              JOON STORES Dub-Ind
            </h5>
            <p className="leading-relaxed text-gray-400">
              Premium consumer technology concierge connecting Dubai flagship distributors directly to customers across India.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <img
                src="/samsung-blue-ellipse-logo.png"
                alt="Samsung"
                className="h-3.5 w-auto object-contain opacity-70"
              />
              <span className="text-[11px] text-gray-500 font-medium">Authorized Retail Import</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h5 className="text-white text-sm font-semibold tracking-tight mb-3">
              Direct Concierge
            </h5>
            <p className="flex items-center gap-2 text-gray-300">
              <MessageCircle className="w-4 h-4 text-green-400" />
              <a
                href="https://wa.me/919167868179"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                +91 91678 68179
              </a>
            </p>
            <p className="flex items-center gap-2 text-gray-300">
              <Mail className="w-4 h-4 text-blue-400" />
              <a
                href="mailto:juzer09jawadwala@gmail.com"
                className="hover:text-white transition-colors"
              >
                juzer09jawadwala@gmail.com
              </a>
            </p>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h5 className="text-white text-sm font-semibold tracking-tight mb-3">
              Guarantees
            </h5>
            <p className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#2189ff]" />
              <span>100% Genuine Sealed Units</span>
            </p>
            <p className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#2189ff]" />
              <span>Worldwide Official Warranty</span>
            </p>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <h5 className="text-white text-sm font-semibold tracking-tight mb-3">
              Popular Models
            </h5>
            <p><a href="#models" className="hover:text-white">Galaxy Z Fold8 Ultra</a></p>
            <p><a href="#models" className="hover:text-white">Galaxy Z Fold8</a></p>
            <p><a href="#models" className="hover:text-white">Galaxy Z Flip8</a></p>
          </div>
        </div>

        {/* Legal Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-[11px]">
          <p>© {new Date().getFullYear()} JOON STORES Dub-Ind. All rights reserved. Samsung and Galaxy are registered trademarks of Samsung Electronics Co., Ltd.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#terms" className="hover:text-gray-400">Terms of Sales</a>
            <a href="#legal" className="hover:text-gray-400">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
