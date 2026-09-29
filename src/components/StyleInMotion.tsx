import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Film, Sparkles, Send, ArrowRight, ArrowLeft, Video, VolumeX, Eye } from "lucide-react";

interface VideoLook {
  id: number;
  image: string;
  caption: string;
  ctaText: string;
  categoryLink: string;
  destination: string;
  details: string;
  panClass: string;
}

interface StyleInMotionProps {
  onShopClick: (category: string, destination?: string) => void;
  onExploreClick: () => void;
  onWhatsAppOrder: (productName: string) => void;
}

export default function StyleInMotion({ onShopClick, onExploreClick, onWhatsAppOrder }: StyleInMotionProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // 10 high quality videos with custom specified destination routes
  const videos: VideoLook[] = [
    {
      id: 1,
      image: "/src/assets/images/sleeveless_black_red_saree_1790687247329.jpg",
      caption: "লাল শাড়িতে আধুনিক আভিজাত্য",
      ctaText: "এই ডিজাইনটি দেখুন",
      categoryLink: "Sleeveless Blouse",
      destination: "/collections/red-designer-blouse",
      details: "Adult Bengali woman wearing a red saree with an elegant black sleeveless blouse in a premium studio set.",
      panClass: "animate-[motion-pan-1_12s_infinite_alternate_ease-in-out]"
    },
    {
      id: 2,
      image: "/src/assets/images/sleeveless_red_white_saree_1790687262956.jpg",
      caption: "বাঙালিয়ানার চিরন্তন সৌন্দর্য",
      ctaText: "কালেকশন দেখুন",
      categoryLink: "Cotton Blouses",
      destination: "/collections/traditional-blouse",
      details: "Adult Bengali woman wearing a traditional white saree with red border and a deep red sleeveless blouse.",
      panClass: "animate-[motion-pan-2_10s_infinite_alternate_ease-in-out]"
    },
    {
      id: 3,
      image: "/src/assets/images/sleeveless_gold_black_saree_1790687279715.jpg",
      caption: "কালো ও সোনালির রাজকীয় সাজ",
      ctaText: "এখনই কিনুন",
      categoryLink: "Designer Blouses",
      destination: "/collections/black-gold-blouse",
      details: "Adult Bengali woman wearing a premium black saree with a golden sleeveless blouse for luxury evening look.",
      panClass: "animate-[motion-pan-3_11s_infinite_alternate_ease-in-out]"
    },
    {
      id: 4,
      image: "/src/assets/images/sleeveless_pink_pastel_saree_1790687293037.jpg",
      caption: "প্যাস্টেল রঙে কোমল সৌন্দর্য",
      ctaText: "এই লুকটি দেখুন",
      categoryLink: "Festive Collection",
      destination: "/collections/pastel-blouse",
      details: "Adult Bengali woman wearing a pastel pink saree with matching embroidered sleeveless blouse.",
      panClass: "animate-[motion-pan-1_13s_infinite_alternate_ease-in-out]"
    },
    {
      id: 5,
      image: "/src/assets/images/sleeveless_contrast_blue_saree_1790687306145.jpg",
      caption: "নীলের ছোঁয়ায় স্টাইলিশ আপনি",
      ctaText: "ব্লাউজটি দেখুন",
      categoryLink: "Sleeveless Blouse",
      destination: "/collections/blue-designer-blouse",
      details: "Adult Bengali woman wearing a royal blue saree with a contrasting sleeveless designer blouse.",
      panClass: "animate-[motion-pan-2_11s_infinite_alternate_ease-in-out]"
    },
    {
      id: 6,
      image: "/src/assets/images/sleeveless_green_silk_saree_1790687318256.jpg",
      caption: "ঐতিহ্যের সঙ্গে আধুনিকতার মেলবন্ধন",
      ctaText: "কালেকশন দেখুন",
      categoryLink: "Silk Blouses",
      destination: "/collections/handloom-blouse",
      details: "Adult Bengali woman wearing a green silk saree with an elegant sleeveless blouse in a heritage room.",
      panClass: "animate-[motion-pan-3_12s_infinite_alternate_ease-in-out]"
    },
    {
      id: 7,
      image: "/src/assets/images/sleeveless_maroon_banarasi_saree_1790687332545.jpg",
      caption: "উৎসবের সাজে রাজকীয় আভা",
      ctaText: "ফেস্টিভ কালেকশন",
      categoryLink: "Wedding Collection",
      destination: "/collections/festive-blouse",
      details: "Adult Bengali woman wearing a maroon Banarasi saree with a premium golden sleeveless blouse.",
      panClass: "animate-[motion-pan-1_14s_infinite_alternate_ease-in-out]"
    },
    {
      id: 8,
      image: "/src/assets/images/sleeveless_organza_pastel_saree_1790687346024.jpg",
      caption: "অর্গানজার সঙ্গে আধুনিক ডিজাইন",
      ctaText: "এই ডিজাইনটি দেখুন",
      categoryLink: "Designer Blouses",
      destination: "/collections/modern-sleeveless-blouse",
      details: "Adult Bengali woman wearing a lightweight organza saree with a modern embroidered sleeveless blouse.",
      panClass: "animate-[motion-pan-2_10s_infinite_alternate_ease-in-out]"
    },
    {
      id: 9,
      image: "/src/assets/images/sleeveless_handloom_saree_1790687358046.jpg",
      caption: "হ্যান্ডলুমে বাংলার নিজস্ব সৌন্দর্য",
      ctaText: "এখনই দেখুন",
      categoryLink: "Traditional Blouses",
      destination: "/collections/bengali-handloom-blouse",
      details: "Adult Bengali woman wearing an elegant handloom saree with a sleeveless designer blouse.",
      panClass: "animate-[motion-pan-3_11s_infinite_alternate_ease-in-out]"
    },
    {
      id: 10,
      image: "/src/assets/images/sleeveless_festive_close_up_saree_1790687371019.jpg",
      caption: "প্রতিটি উৎসবে হোক নতুন সাজ",
      ctaText: "এখনই কিনুন",
      categoryLink: "Sleeveless Blouse",
      destination: "/collections/premium-festive-blouse",
      details: "Adult Bengali woman wearing a premium festive saree with a beautifully detailed sleeveless blouse close-up.",
      panClass: "animate-[motion-pan-1_12s_infinite_alternate_ease-in-out]"
    }
  ];

  // Pause videos when window scroll leaves view
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const offset = direction === "left" ? -320 : 320;
      carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const activePlayState = isPlaying && isInView;

  return (
    <section 
      ref={containerRef}
      className="py-20 bg-[#F7F3E8] border-t border-b border-[#62141C]/10 overflow-hidden relative"
    >
      {/* Decorative Traditional Border Detail */}
      <div className="absolute top-0 left-0 right-0 h-1 shimmer-gold opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Subheading with Bengali values */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#62141C] tracking-[0.25em] uppercase block">
                STYLE IN MOTION
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#62141C] tracking-wide leading-tight">
              স্টাইলে নতুন ছন্দ
            </h2>
            
            <p className="text-sm sm:text-base text-[#2C211E]/85 font-sans">
              আমাদের নতুন ব্লাউজ কালেকশন দেখুন নতুন রূপে — Discover Our Latest Blouse Looks
            </p>
          </div>

          {/* Carousel Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-full bg-[#FCFBF8] border border-[#62141C]/10 text-[#62141C] hover:bg-[#62141C] hover:text-[#F7F3E8] transition-all cursor-pointer shadow-sm text-xs flex items-center gap-1.5 font-medium"
              title={isPlaying ? "Pause All Autoplays" : "Resume All Autoplays"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:inline">
                {isPlaying ? "Pause Video" : "Autoplay"}
              </span>
            </button>

            <button
              onClick={() => scroll("left")}
              className="p-2.5 rounded-full bg-[#FCFBF8] border border-[#62141C]/15 hover:border-[#62141C] text-[#2C211E] hover:text-[#62141C] transition-all cursor-pointer shadow-sm"
              title="Previous Video"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => scroll("right")}
              className="p-2.5 rounded-full bg-[#FCFBF8] border border-[#62141C]/15 hover:border-[#62141C] text-[#2C211E] hover:text-[#62141C] transition-all cursor-pointer shadow-sm"
              title="Next Video"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Swipeable Video Slider / Reel Container */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {videos.map((vid, index) => {
            const isHovered = activeVideoIndex === index;
            return (
              <div
                key={vid.id}
                onMouseEnter={() => setActiveVideoIndex(index)}
                onMouseLeave={() => setActiveVideoIndex(null)}
                onClick={() => onShopClick(vid.categoryLink, vid.destination)}
                className="w-[280px] sm:w-[310px] shrink-0 snap-start bg-black rounded-xl overflow-hidden shadow-lg border border-[#62141C]/10 relative group/reel flex flex-col justify-between aspect-[9/16] transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
                role="link"
                aria-label={`Explore look ${vid.caption}: ${vid.details}`}
              >
                {/* Media representation with slow cinematic keyframes */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={vid.image}
                    alt={vid.caption}
                    className={`w-full h-full object-cover object-top transition-transform duration-[12000ms] ease-in-out ${
                      activePlayState ? vid.panClass : "scale-100"
                    } group-hover/reel:scale-[1.18]`}
                  />

                  {/* Dark warm aesthetic overlay matching Bengali boutique vibe */}
                  <div className="absolute inset-0 bg-[#3A0A0E]/15 mix-blend-color-burn" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/15" />
                </div>

                {/* Top Video Indicator */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="text-[9px] font-mono font-bold tracking-widest text-[#F7F3E8]">
                    REEL 0{vid.id}
                  </span>
                </div>

                {/* Dynamic Equalizer Audio Bars at Top Right */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10 text-[9px] text-white/90">
                  <VolumeX className="w-3 h-3 text-[#C5A059]" />
                  {activePlayState && (
                    <div className="flex items-end gap-0.5 h-3">
                      <div className="w-0.5 bg-[#C5A059] animate-[vis-1_0.5s_infinite_alternate]" />
                      <div className="w-0.5 bg-[#C5A059] animate-[vis-2_0.7s_infinite_alternate]" />
                      <div className="w-0.5 bg-[#C5A059] animate-[vis-3_0.4s_infinite_alternate]" />
                    </div>
                  )}
                  <span className="font-mono font-bold text-[8px]">MUTED</span>
                </div>

                {/* Center Floating Video Play Button (Only visible when hovered/playing) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity duration-300">
                  <div className="p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[#FCFBF8] group-hover/reel:scale-110 group-hover/reel:bg-[#62141C]/80 transition-all duration-300">
                    {activePlayState ? (
                      <Video className="w-6 h-6 text-[#C5A059] animate-pulse" />
                    ) : (
                      <Play className="w-6 h-6 text-white fill-current" />
                    )}
                  </div>
                </div>

                {/* Bottom Overlay Info & Caption & CTA */}
                <div className="mt-auto p-4 z-10 space-y-4 relative">
                  {/* Subtle caption wrapper with legible dark burgundy/black backdrop blur backing */}
                  <div className="space-y-1.5 bg-[#3A0A0E]/85 backdrop-blur-md p-3.5 rounded-lg border border-white/10 shadow-lg">
                    <p className="text-[15px] sm:text-[17px] font-serif font-bold text-[#F7F3E8] tracking-wide leading-snug drop-shadow-md">
                      {vid.caption}
                    </p>
                    <p className="text-[10px] text-white/80 font-sans font-light leading-relaxed line-clamp-2">
                      {vid.details}
                    </p>
                  </div>

                  {/* Simulated video playback progress bar (6 seconds loop) */}
                  {activePlayState && (
                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-[#C5A059] animate-[video-seek_6s_infinite_linear]" />
                    </div>
                  )}

                  {/* Deep maroon action CTA with antique-gold hover and border */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents double click firing from parent
                      onShopClick(vid.categoryLink, vid.destination);
                    }}
                    className="w-full py-2.5 bg-[#62141C] hover:bg-[#3A0A0E] text-[#F7F3E8] hover:text-[#D4AF37] border border-[#C5A059]/40 hover:border-[#D4AF37] text-xs font-semibold tracking-wider rounded transition-all duration-300 shadow-md flex items-center justify-center gap-1.5 cursor-pointer uppercase"
                    aria-label={`${vid.ctaText} - ${vid.caption}`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{vid.ctaText}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* FINAL HERO CALL TO ACTION SEGMENT (Below Video Grid) */}
        <div className="mt-16 bg-[#62141C] text-[#F7F3E8] rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden border border-[#C5A059]/30 shadow-2xl">
          {/* Subtle Decorative Elements */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#C5A059]/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-black/30 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-xs font-semibold text-[#D4AF37] tracking-[0.3em] uppercase block">
              FIND YOUR PERFECT LOOK
            </span>
            
            <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-wide text-white">
              আপনার পছন্দের ব্লাউজটি খুঁজে নিন
            </h3>
            
            <p className="text-xs sm:text-sm text-[#F7F3E8]/90 font-sans font-light leading-relaxed">
              ট্র্যাডিশনাল থেকে মডার্ন—প্রতিটি শাড়ির জন্য বেছে নিন আপনার পছন্দের ডিজাইন। Exquisite styles crafted to complement your personality.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3">
              {/* Primary: Catalog All */}
              <button
                onClick={() => onShopClick("All Blouses", "/shop")}
                className="px-6 py-3 bg-[#C5A059] hover:bg-white text-[#3A0A0E] hover:text-[#62141C] text-xs font-bold uppercase tracking-wider rounded shadow transition-all duration-300 cursor-pointer"
                aria-label="সব ব্লাউজ দেখুন"
              >
                সব ব্লাউজ দেখুন
              </button>

              {/* Secondary: New Arrivals */}
              <button
                onClick={onExploreClick}
                className="px-6 py-3 bg-transparent hover:bg-white/10 text-white border border-[#F7F3E8]/40 hover:border-white text-xs font-bold uppercase tracking-wider rounded transition-all duration-300 cursor-pointer"
                aria-label="নতুন কালেকশন দেখুন"
              >
                নতুন কালেকশন দেখুন
              </button>

              {/* WhatsApp direct order trigger */}
              <button
                onClick={() => onWhatsAppOrder("Style in Motion collection order query")}
                className="px-6 py-3 bg-[#25D366] hover:bg-[#1EBE57] text-white text-xs font-bold uppercase tracking-wider rounded shadow flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer"
                aria-label="WhatsApp-এ অর্ডার করুন"
              >
                <Send className="w-3.5 h-3.5" />
                WhatsApp-এ অর্ডার করুন
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Styled inline pan animation keyframes specific to StyleInMotion */}
      <style>{`
        @keyframes motion-pan-1 {
          0% { transform: scale(1.05) translate(0%, 0%); }
          100% { transform: scale(1.22) translate(-3%, -4%); }
        }
        @keyframes motion-pan-2 {
          0% { transform: scale(1.05) translate(0%, 0%); }
          100% { transform: scale(1.24) translate(4%, -1%); }
        }
        @keyframes motion-pan-3 {
          0% { transform: scale(1.05) translate(0%, 0%); }
          100% { transform: scale(1.26) translate(-2%, 4%); }
        }
        @keyframes video-seek {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes vis-1 { 0% { height: 2px; } 100% { height: 12px; } }
        @keyframes vis-2 { 0% { height: 4px; } 100% { height: 10px; } }
        @keyframes vis-3 { 0% { height: 1px; } 100% { height: 11px; } }
      `}</style>
    </section>
  );
}
