import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface HeroCarouselProps {
  onShopClick: () => void;
  onExploreClick: () => void;
}

export default function HeroCarousel({ onShopClick, onExploreClick }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      type: "image",
      src: "/src/assets/images/hero_bengali_model_1_1790685682423.jpg",
      title: "Elegance in Every Stitch",
      sub: "সিন্দারাম ব্লাউজ — Handcrafted designer luxury designed to elevate your Banarasis and Jamdanis.",
      tag: "BRIDAL & WEAVE EDIT",
      ctaText: "Shop Blouses",
    },
    {
      type: "video_sim", // Dynamic CSS panning representation for "VIDEO 1 - HERO FASHION VIDEO"
      src: "/src/assets/images/hero_bengali_model_2_1790685696791.jpg",
      title: "Cinematic Back Designs",
      sub: "Explore gorgeous boat necks, keyhole details, and authentic handmade tassels that command attention.",
      tag: "FASHION REEL SHOWCASE",
      ctaText: "Explore New Collection",
    },
    {
      type: "image",
      src: "/src/assets/images/boutique_interior_scenic_1790685874137.jpg",
      title: "The Kolkata Heritage Boutique",
      sub: "Visit us for custom tailored fits or explore our premium ready-to-wear collections online.",
      tag: "OUR BOUTIQUE",
      ctaText: "Explore Collection",
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[85vh] bg-neutral-900 overflow-hidden">
      {slides.map((slide, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105 pointer-events-none"
            }`}
          >
            {/* Background Image / Video Simulation */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={slide.src}
                alt={slide.title}
                className={`w-full h-full object-cover object-center ${
                  isActive && slide.type === "video_sim"
                    ? "animate-[pan_25s_infinite_alternate_ease-in-out]"
                    : "scale-100"
                }`}
                style={{
                  transformOrigin: "center center"
                }}
              />
              {/* Media Overlay Scrim for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/30" />
            </div>

            {/* Video Watermark indicator for loop simulation */}
            {slide.type === "video_sim" && (
              <div className="absolute top-24 right-6 sm:right-12 z-20 flex items-center gap-2 bg-[#FCFBF8]/15 border border-[#FCFBF8]/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <span className="text-[10px] text-[#FCFBF8] tracking-widest font-mono font-bold">CINEMATIC FILM ON LOOP</span>
              </div>
            )}

            {/* Content Container */}
            <div className="absolute inset-0 flex items-center z-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl space-y-3 sm:space-y-4">
                  <span className="text-xs sm:text-sm font-sans font-semibold text-[#D4AF37] tracking-[0.2em] block uppercase">
                    {slide.tag}
                  </span>
                  
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FCFBF8] tracking-wide leading-tight text-wrap balance">
                    {slide.title}
                  </h2>
                  
                  <p className="text-sm sm:text-lg text-[#FCFBF8]/90 font-sans font-light leading-relaxed max-w-2xl">
                    {slide.sub}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-4 sm:pt-6">
                    <button
                      onClick={onShopClick}
                      className="bg-[#62141C] text-[#F7F3E8] border border-[#62141C] hover:bg-transparent hover:border-[#F7F3E8] hover:text-[#F7F3E8] transition-all duration-300 px-6 sm:px-8 py-3 text-xs sm:text-sm font-medium tracking-wider uppercase shadow-md flex items-center gap-2 rounded cursor-pointer"
                    >
                      {slide.ctaText}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={onExploreClick}
                      className="bg-transparent text-[#F7F3E8] border border-[#F7F3E8]/40 hover:border-[#F7F3E8] hover:bg-[#F7F3E8]/10 transition-all duration-300 px-6 sm:px-8 py-3 text-xs sm:text-sm font-medium tracking-wider uppercase rounded cursor-pointer"
                    >
                      Explore New Collection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Slide Navigation Controls */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2 sm:p-3 rounded-full border border-[#FCFBF8]/20 bg-black/30 hover:bg-black/60 text-[#FCFBF8] hover:border-[#FCFBF8]/60 transition-all cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 sm:p-3 rounded-full border border-[#FCFBF8]/20 bg-black/30 hover:bg-black/60 text-[#FCFBF8] hover:border-[#FCFBF8]/60 transition-all cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel indicators */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 text-[#FCFBF8]/60 hover:text-[#FCFBF8] transition-colors cursor-pointer mr-2"
            title={isPlaying ? "Pause Autoplay" : "Play Autoplay"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx ? "w-8 bg-[#D4AF37]" : "w-2 bg-[#FCFBF8]/30"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Styled animation values in a custom inline tag for pan animation */}
      <style>{`
        @keyframes pan {
          0% { transform: scale(1.05) translate(0%, 0%); }
          50% { transform: scale(1.12) translate(-1%, -1.5%); }
          100% { transform: scale(1.05) translate(1%, 0.5%); }
        }
      `}</style>
    </section>
  );
}
