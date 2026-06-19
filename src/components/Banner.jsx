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
    <div className="relative mt-3 overflow-hidden rounded-3xl" ref={emblaRef}>
      <div className="flex">
        {banners.map((banner, index) => (
          <div key={index} className="relative flex-[0_0_100%] min-w-0">
            <div className="h-[220px] md:h-[350px] lg:h-[450px] w-full">
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Left */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur hover:bg-white"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Right */}
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur hover:bg-white"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              selectedIndex === index ? "w-8 bg-white" : "w-2 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
