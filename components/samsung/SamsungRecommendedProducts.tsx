"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface SamsungProduct {
  id: string;
  name: string;
  image: string;
  fallbackImage: string;
  price: string;
  saving: string;
  mrp: string;
  whatsappMessage: string;
}

export const RECOMMENDED_PRODUCTS: SamsungProduct[] = [
  {
    id: "galaxy-s26",
    name: "Galaxy S26",
    image: "/images/samsung-recommended/in-galaxy-s26-s942-sm-s942bzvcins-thumb-550883854.webp",
    fallbackImage: "/images/samsung-recommended/in-galaxy-s26-s942-sm-s942bzvcins-thumb-550883854.png",
    price: "₹ 102999.00",
    saving: "Save ₹ 15000.00",
    mrp: "MRP: ₹ 117999.00 (Incl. of all taxes)",
    whatsappMessage: "Hello JOON STORES, I would like to order the Samsung Galaxy S26 (₹ 102999.00).",
  },
  {
    id: "galaxy-s26-fe",
    name: "Galaxy S26 FE",
    image: "/images/samsung-recommended/in-galaxy-s26-fe-sm-s741-sm-s741bzkcins-thumb-554411467.webp",
    fallbackImage: "/images/samsung-recommended/in-galaxy-s26-fe-sm-s741-sm-s741bzkcins-thumb-554411467.png",
    price: "₹ 79999.00",
    saving: "Save ₹ 30000.00",
    mrp: "MRP: ₹ 109999.00 (Incl. of all taxes)",
    whatsappMessage: "Hello JOON STORES, I would like to order the Samsung Galaxy S26 FE (₹ 79999.00).",
  },
  {
    id: "galaxy-s26-plus",
    name: "Galaxy S26+ (Special Colour)",
    image: "/images/samsung-recommended/in-galaxy-s26-s947-578572-sm-s947bzdbins-thumb-550881375.webp",
    fallbackImage: "/images/samsung-recommended/in-galaxy-s26-s947-578572-sm-s947bzdbins-thumb-550881375.png",
    price: "₹ 134999.00",
    saving: "Save ₹ 15000.00",
    mrp: "MRP: ₹ 149999.00 (Incl. of all taxes)",
    whatsappMessage: "Hello JOON STORES, I would like to order the Samsung Galaxy S26+ Special Colour (₹ 134999.00).",
  },
  {
    id: "galaxy-s26-ultra",
    name: "Galaxy S26 Ultra (Special Colour)",
    image: "/images/samsung-recommended/in-galaxy-s26-ultra-s948-sm-s948bzsbins-thumb-550794208.webp",
    fallbackImage: "/images/samsung-recommended/in-galaxy-s26-ultra-s948-sm-s948bzsbins-thumb-550794208.png",
    price: "₹ 154999.00",
    saving: "Save ₹ 15000.00",
    mrp: "MRP: ₹ 169999.00 (Incl. of all taxes)",
    whatsappMessage: "Hello JOON STORES, I would like to order the Samsung Galaxy S26 Ultra Special Colour (₹ 154999.00).",
  },
  {
    id: "galaxy-z-fold8-ultra",
    name: "Galaxy Z Fold8 Ultra",
    image: "/images/samsung-recommended/in-galaxy-z-fold8-ultra-f976-sm-f976bzvgins-thumb-553719104.webp",
    fallbackImage: "/images/samsung-recommended/in-galaxy-z-fold8-ultra-f976-sm-f976bzvgins-thumb-553719104.png",
    price: "₹ 219999.00",
    saving: "Save ₹ 5000.00",
    mrp: "MRP: ₹ 224999.00 (Incl. of all taxes)",
    whatsappMessage: "Hello JOON STORES, I would like to order the Samsung Galaxy Z Fold8 Ultra (₹ 219999.00).",
  },
  {
    id: "galaxy-tab-s10-lite",
    name: "Galaxy Tab S10 Lite",
    image: "/images/samsung-recommended/in-galaxy-tab-s10-lite-sm-x406-564578-sm-x400nzaainu-thumb-549050050.webp",
    fallbackImage: "/images/samsung-recommended/in-galaxy-tab-s10-lite-sm-x406-564578-sm-x400nzaainu-thumb-549050050.png",
    price: "₹ 49999.00",
    saving: "Save ₹ 10000.00",
    mrp: "MRP: ₹ 59999.00 (Incl. of all taxes)",
    whatsappMessage: "Hello JOON STORES, I would like to order the Samsung Galaxy Tab S10 Lite (₹ 49999.00).",
  },
];

export default function SamsungRecommendedProducts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [indicatorWidthPercent, setIndicatorWidthPercent] = useState(30);

  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < maxScroll - 4);

    if (maxScroll > 0) {
      const progress = Math.min(Math.max(scrollLeft / maxScroll, 0), 1);
      setScrollProgress(progress);
      const visibleRatio = clientWidth / scrollWidth;
      const widthPct = Math.min(Math.max(visibleRatio * 100, 20), 50);
      setIndicatorWidthPercent(widthPct);
    } else {
      setScrollProgress(0);
      setIndicatorWidthPercent(100);
    }
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState, { passive: true });

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;

    // Scroll by roughly 1 to 2 card widths
    const cardWidth = 322; // 312px card + 10px gap
    const scrollAmount = direction === "left" ? -cardWidth * 1.5 : cardWidth * 1.5;

    el.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section 
      id="recommended" 
      className="w-full bg-[#FFFFFF] py-14 sm:py-16 md:py-20 text-black border-t border-gray-100"
      aria-label="Recommended for you product carousel"
    >
      <div className="w-full max-w-[1920px] mx-auto px-5 sm:px-6 md:px-8 xl:px-10">
        
        {/* Section Heading: Exact Reference Alignment */}
        <div className="mb-10 sm:mb-12 md:mb-14">
          <h2 className="text-[32px] sm:text-[36px] md:text-[40px] xl:text-[42px] font-bold text-black tracking-tight leading-tight select-none">
            Recommended for you
          </h2>
        </div>

        {/* Carousel Track Container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex items-start gap-[10px] overflow-x-auto scroll-smooth scrollbar-none pb-4 pt-1 select-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {RECOMMENDED_PRODUCTS.map((product) => {
              const whatsappUrl = `https://wa.me/919167868179?text=${encodeURIComponent(
                product.whatsappMessage
              )}`;

              return (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-[280px] sm:w-[295px] md:w-[312px] group"
                >
                  {/* Product Card Anchor */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Order ${product.name} on WhatsApp`}
                    className="block focus:outline-none focus:ring-2 focus:ring-[#2189ff] rounded-[8px]"
                  >
                    {/* Image Tile: 312px × 312px on desktop, #F7F7F7 background, rounded 8px */}
                    <div className="relative w-full h-[280px] sm:h-[295px] md:h-[312px] bg-[#F7F7F7] rounded-[8px] flex items-center justify-center p-6 sm:p-7 md:p-8 overflow-hidden transition-colors duration-200 group-hover:bg-[#F2F2F2]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain max-h-[220px] transition-transform duration-300 ease-out group-hover:scale-105 pointer-events-none"
                        loading="lazy"
                        draggable={false}
                        onError={(e) => {
                          // Fallback if needed
                          const target = e.currentTarget;
                          if (target.src !== product.fallbackImage) {
                            target.src = product.fallbackImage;
                          }
                        }}
                      />
                    </div>

                    {/* Product Typography & Pricing Below Tile */}
                    <div className="pt-4 text-left">
                      {/* Product Name (wrapped up to 2 lines, fixed min-height for uniform price baseline) */}
                      <h3 className="text-[18px] md:text-[20px] font-semibold text-black leading-snug tracking-tight min-h-[52px] md:min-h-[56px] line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Selling Price & Saving Inline */}
                      <div className="flex items-baseline gap-2.5 mt-2 flex-wrap">
                        <span className="text-[17px] md:text-[18px] font-bold text-black tracking-tight">
                          {product.price}
                        </span>
                        <span className="text-[13px] md:text-[14px] font-semibold text-[#2189ff] tracking-tight whitespace-nowrap">
                          {product.saving}
                        </span>
                      </div>

                      {/* MRP directly beneath price */}
                      <p className="text-[13px] md:text-[14px] font-normal text-[#707072] mt-1 tracking-tight">
                        {product.mrp}
                      </p>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>

          {/* Carousel Progress Line & Navigation Arrows */}
          <div className="flex items-center justify-between mt-10 md:mt-12 px-1">
            {/* Minimalist Progress Indicator */}
            <div className="relative w-[180px] sm:w-[240px] md:w-[280px] h-[2px] bg-[#E5E5E5] rounded-full overflow-hidden">
              <div
                className="absolute top-0 bottom-0 bg-[#000000] rounded-full transition-all duration-150 ease-out"
                style={{
                  width: `${indicatorWidthPercent}%`,
                  transform: `translateX(${
                    scrollProgress * (100 - indicatorWidthPercent) * (100 / indicatorWidthPercent)
                  }%)`,
                }}
              />
            </div>

            {/* Circular Outlined Arrow Controls */}
            <div className="flex items-center gap-3">
              {/* Previous Arrow */}
              <button
                type="button"
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous products"
                className="w-10 h-10 rounded-full border border-[#DCDCDC] bg-white flex items-center justify-center text-black hover:border-black/60 hover:bg-gray-50 transition-all duration-200 shadow-sm disabled:opacity-25 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-black"
              >
                <ChevronLeft className="w-5 h-5 stroke-[1.8]" />
              </button>

              {/* Next Arrow */}
              <button
                type="button"
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                aria-label="Next products"
                className="w-10 h-10 rounded-full border border-[#DCDCDC] bg-white flex items-center justify-center text-black hover:border-black/60 hover:bg-gray-50 transition-all duration-200 shadow-sm disabled:opacity-25 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-black"
              >
                <ChevronRight className="w-5 h-5 stroke-[1.8]" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
