"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const originalImages = [1, 2, 3, 4, 5, 6];
  const repeatedImages = [...originalImages, ...originalImages, ...originalImages];
  const middleIndexOffset = originalImages.length;

  const cardRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(middleIndexOffset + 2);
  const cardWidth = 300 + 20;

  const touchStartX = useRef(null);
  const autoplayRef = useRef(null);

  const scrollToCenter = (index, smooth = true) => {
    if (cardRef.current) {
      const container = cardRef.current;
      const containerWidth = container.offsetWidth;
      const scrollPos = index * cardWidth - containerWidth / 2 + cardWidth / 2;

      container.scrollTo({
        left: scrollPos,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  const scrollLeft = () => {
    const newIndex = centerIndex - 1;
    setCenterIndex(newIndex);
    scrollToCenter(newIndex);
  };

  const scrollRight = () => {
    const newIndex = centerIndex + 1;
    setCenterIndex(newIndex);
    scrollToCenter(newIndex);
  };

  const handleScroll = () => {
    if (!cardRef.current) return;

    const container = cardRef.current;
    const children = Array.from(container.children);
    let closestIndex = 0;
    let minDistance = Infinity;

    children.forEach((child, index) => {
      const rect = child.getBoundingClientRect();
      const childCenter = rect.left + rect.width / 2;
      const distance = Math.abs(container.offsetWidth / 2 - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setCenterIndex(closestIndex);

    // Infinite loop logic
    const total = repeatedImages.length;
    if (closestIndex <= originalImages.length / 2) {
      const newIndex = closestIndex + originalImages.length;
      setCenterIndex(newIndex);
      scrollToCenter(newIndex, false);
    } else if (closestIndex >= total - originalImages.length / 2) {
      const newIndex = closestIndex - originalImages.length;
      setCenterIndex(newIndex);
      scrollToCenter(newIndex, false);
    }
  };

  
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      scrollRight();
    }, 3000);

    return () => clearInterval(autoplayRef.current);
  }, [centerIndex]);

  // ✅ On mount scroll to center
  useEffect(() => {
    scrollToCenter(centerIndex, false);
  }, []);

  // ✅ Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    clearInterval(autoplayRef.current); // pause autoplay
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - endX;

    if (diff > 50) scrollRight(); // swiped left
    else if (diff < -50) scrollLeft(); // swiped right

    autoplayRef.current = setInterval(scrollRight, 3000); // resume autoplay
  };

  return (
    <section>
      <div className="h-screen bg-[url(/bg-astron.png)] bg-cover relative">
        {/* Title */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-[20%] border border-zinc-600"></div>
          <div className="text-3xl">Hotel Booking</div>
          <div className="w-[20%] border border-zinc-600"></div>
        </div>

        {/* Subtext */}
        <div className="flex items-center justify-center pt-2 hover:text-green-900 hover:cursor-pointer">
          <h2 className="text-xl">
            There's Nothing More Enjoyable Than a Hotel Room View
          </h2>
        </div>

        {/* Card Slider */}
        <div className="relative w-full mt-6 px-10 h-[60%] flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-4 z-10 bg-white p-2 rounded-full shadow hover:bg-zinc-950 hover:text-zinc-200"
          >
            <ChevronLeft size={48} strokeWidth={0.75} />
          </button>

          {/* Cards */}
          <div
            ref={cardRef}
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex gap-5 overflow-x-scroll h-full scroll-smooth no-scrollbar w-full px-6"
          >
            {repeatedImages.map((img, index) => (
              <div
                key={`${img}-${index}`}
                className="min-w-[300px] h-[450px] snap-center rounded overflow-hidden transition-all duration-300"
              >
                <img
                  src={`/img${img}.jpg`}
                  alt={`img${img}`}
                  className={`h-full w-full object-cover transition-all duration-500 ${
                    index === centerIndex ? "grayscale-0" : "grayscale"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-4 z-10 bg-white p-2 rounded-full shadow hover:bg-zinc-950 hover:text-zinc-200"
          >
            <ChevronRight size={48} strokeWidth={0.75} />
          </button>
        </div>
      </div>
       

    </section>
  );
}
