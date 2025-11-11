import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";

const slides = [
  {
    title: "Find Your Perfect Study Partner",
    description:
      "Connect with students who share your academic goals and learning style. Build meaningful study relationships.",
    cta: "Get Started",
    link: "/register",
    bg: "/hero3.jpg",
  },
  {
    title: "Collaborate & Excel Together",
    description:
      "Join study groups, share resources, and achieve academic excellence through collaborative learning.",
    cta: "Find Partners",
    link: "/findPartners",
    bg: "/hero2.jpg",
  },
  {
    title: "Build Your Academic Network",
    description:
      "Create your profile, showcase your achievements, and connect with like-minded students worldwide.",
    cta: "Create Profile",
    link: "/createProfile",
    bg: "/hero.jpg",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-screen h-[500px] md:h-[650px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-screen h-full bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${slides[current].bg})` }}
        >
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />

          {/* Slide Content */}
          <div className="relative h-full flex items-center justify-center px-6">
            <motion.div
              key={current + "-content"}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="max-w-4xl text-center space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.7)]">
                {slides[current].title}
              </h1>
              <p className="text-lg md:text-2xl text-white/90 drop-shadow-[0_0_15px_rgba(0,0,0,0.6)] max-w-2xl mx-auto">
                {slides[current].description}
              </p>

              <Link
                to={slides[current].link}
                className="inline-block px-8 py-4 mt-4 rounded-lg text-lg font-semibold text-white bg-[#f27e58] border-2 border-[#f27e58] hover:bg-transparent hover:text-[#f27e58] transition-all duration-300 drop-shadow-lg"
              >
                {slides[current].cta}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${
              index === current ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
