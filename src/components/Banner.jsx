/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/refs */
"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&q=80",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1600&q=80",
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1600&q=80",
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=80",
  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600&q=80",
  "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=1600&q=80",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80",
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1600&q=80",
];

export default function BannerSlider() {
  const autoplay = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    /* ব্যাকগ্রাউন্ড পরিবর্তন করে মেইন থিমের bg-[#070708] রাখা হয়েছে */
    <div
      className="relative mt-6 overflow-hidden rounded-2xl border border-zinc-800/60 bg-[#070708] shadow-2xl shadow-black/50"
      ref={emblaRef}
    >
      <div className="flex">
        {banners.map((banner, index) => (
          <div key={index} className="relative flex-[0_0_100%] min-w-0">
            <div className="h-[200px] sm:h-[280px] md:h-[380px] lg:h-[440px] w-full relative">
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="h-full w-full object-cover opacity-85 group-hover:scale-102 transition-transform duration-700"
                loading={index === 0 ? "eager" : "lazy"}
              />
              {/* ডার্ক থিমের সাথে ম্যাচ করার জন্য ওভারলে গ্রেডিয়েন্ট শ্যাডো */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-transparent to-[#070708]/30 mix-blend-multiply opacity-50"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-xl bg-zinc-950/40 p-2.5 text-zinc-400 border border-zinc-800/50 shadow-xl backdrop-blur-md hover:bg-zinc-900/80 hover:text-white transition-all active:scale-90"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Right Button */}
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-xl bg-zinc-950/40 p-2.5 text-zinc-400 border border-zinc-800/50 shadow-xl backdrop-blur-md hover:bg-zinc-900/80 hover:text-white transition-all active:scale-90"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5 bg-zinc-950/40 px-3 py-1.5 rounded-full border border-zinc-800/30 backdrop-blur-sm">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              selectedIndex === index
                ? "w-6 bg-blue-500"
                : "w-1.5 bg-zinc-600 hover:bg-zinc-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
