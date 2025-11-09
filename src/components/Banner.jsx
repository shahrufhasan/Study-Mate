import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import banner1 from "/banner1.MOV";
import banner2 from "/banner2.MOV";
import banner3 from "/banner3.MOV";

const banners = [banner1, banner2, banner3];

const BannerCarousel = () => {
  const [current, setCurrent] = useState(0);

  // Automatic slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Single video element with fade animation */}
      <motion.video
        key={current} // triggers Framer Motion animation
        autoPlay
        loop
        muted
        playsInline
        className="w-full object-cover brightness-90 h-[50vh] sm:h-[60vh] md:h-[85vh]"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <source src={banners[current]} type="video/mp4" />
      </motion.video>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2
                   text-xl sm:text-2xl md:text-3xl
                   bg-black/30 rounded-full p-1 sm:p-2 md:p-3
                   z-10 hover:bg-black/50 transition"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2
                   text-xl sm:text-2xl md:text-3xl
                   bg-black/30 rounded-full p-1 sm:p-2 md:p-3
                   z-10 hover:bg-black/50 transition"
      >
        &#10095;
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
