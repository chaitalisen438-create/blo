import React, { useState } from "react";
import { Play, Pause, Film, Layers, Sparkles, ZoomIn } from "lucide-react";

export default function CinematicVideos() {
  const [activeVideo, setActiveVideo] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const videos = [
    {
      id: 1,
      title: "Hero Fashion Editorial",
      subtitle: "Slow cinematic flow highlighting absolute poise and detailed embroidery.",
      image: "/src/assets/images/hero_bengali_model_1_1790685682423.jpg",
      badge: "VIDEO 1 · HERO CAMPAIGN",
      effect: "animate-[pan_20s_infinite_alternate_ease-in-out]",
      description: "An elegant adult Bengali woman styled in a luxury crimson silk saree. Slow camera movement starts wide, then gently focuses on intricate gold zari embroidery and elegant neckline patterns."
    },
    {
      id: 2,
      title: "The Blouse Collection Loop",
      subtitle: "Dynamic cross-fades tracing modern and traditional master craftsmanship.",
      image: "/src/assets/images/hero_bengali_model_2_1790685696791.jpg",
      badge: "VIDEO 2 · COLLECTION REEL",
      effect: "animate-[zoom-pulse_15s_infinite_alternate_ease-in-out]",
      description: "A continuous looping luxury lookbook traversing Designer Back-designs, Traditional Silks, Party Wear Velvet, and breathable summer-ready Puff Sleeves."
    },
    {
      id: 3,
      title: "Festive Bengali Splendor",
      subtitle: "Traditional heritage setting drenched in warm, golden autumn lighting.",
      image: "/src/assets/images/wedding_collection_1790685754130.jpg",
      badge: "VIDEO 3 · FESTIVE EDITORIAL",
      effect: "animate-[slow-drift_18s_infinite_alternate_ease-in-out]",
      description: "Celebrating Durga Puja and sacred Bengali rituals. An elegant adult model presents a traditional white and red-bordered Banarasi saree matched with heavy gold-thread zardozi cuffs."
    },
    {
      id: 4,
      title: "Embroidery Detail Focus",
      subtitle: "Macro zoom on premium fabrics, zari stitching, and secure seams.",
      image: "/src/assets/images/boutique_embroidery_1790685710547.jpg",
      badge: "VIDEO 4 · MACRO CRAFT DETAIL",
      effect: "animate-[macro-pan_12s_infinite_alternate_linear]",
      description: "An extreme close-up of premium raw mulberry silk fabric. Observe the hand-guided thread work, secure stitching, and luxury gold bead tassels that define Sindaram's perfection."
    }
  ];

  const currentVideo = videos[activeVideo];

  return (
    <section className="py-16 bg-[#3A0A0E] text-[#F7F3E8] relative overflow-hidden">
      {/* Absolute Decorative Motif */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-radial-gradient from-maroon/20 to-transparent pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-sans font-bold text-[#D4AF37] tracking-[0.3em] uppercase block">
            CINEMATIC EDITORIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-wide">
            Sindaram Boutique Films
          </h2>
          <div className="w-24 h-0.5 bg-[#C5A059] mx-auto my-3" />
          <p className="text-sm text-[#F7F3E8]/80 font-sans leading-relaxed">
            Experience our designer collections through luxurious, slow-motion cinematic video campaigns. Turn on autoplay to see the fine details of Kolkata’s finest craftsmanship.
          </p>
        </div>

        {/* Cinematic Player Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Cinematic Screen (7 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-black/40 rounded-xl border border-[#C5A059]/20 overflow-hidden relative group/player shadow-2xl">
            
            {/* Aspect Ratio Screen */}
            <div className="relative aspect-video w-full overflow-hidden bg-neutral-900 flex items-center justify-center">
              {/* Cinematic Letterboxing Bars */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-black z-20 opacity-90 transition-all duration-300 group-hover/player:h-4" />
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-black z-20 opacity-90 transition-all duration-300 group-hover/player:h-4" />

              {/* Looping Panned/Zoomed Image Film simulation */}
              <img
                src={currentVideo.image}
                alt={currentVideo.title}
                className={`w-full h-full object-cover object-top transition-all duration-1000 ${
                  isPlaying ? currentVideo.effect : "scale-100 filter brightness-90"
                }`}
              />

              {/* Classic Cinematic Warm Golden Overlay */}
              <div className="absolute inset-0 bg-[#C5A059]/5 mix-blend-color-burn pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

              {/* Video Badges */}
              <div className="absolute top-10 left-6 z-20 flex items-center gap-2">
                <span className="bg-[#62141C] text-[#F7F3E8] text-[9px] font-bold px-2.5 py-1 tracking-widest uppercase rounded">
                  {currentVideo.badge}
                </span>
                <span className="bg-[#C5A059] text-black text-[9px] font-bold px-2 py-1 tracking-widest uppercase rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                  HD AUTOPLAY
                </span>
              </div>

              {/* Video Play / Pause Controls Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-5 rounded-full bg-[#62141C]/90 text-[#F7F3E8] hover:bg-[#C5A059] hover:text-black hover:scale-110 transition-all duration-300 shadow-xl cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-current" />}
                </button>
              </div>

              {/* Bottom Video Metadata */}
              <div className="absolute bottom-8 left-6 right-6 z-20 flex items-end justify-between gap-4 pointer-events-none">
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-wide">
                    {currentVideo.title}
                  </h3>
                  <p className="text-xs text-white/90 font-light max-w-md hidden sm:block">
                    {currentVideo.subtitle}
                  </p>
                </div>
                
                {/* Visualizer bars */}
                {isPlaying && (
                  <div className="flex items-end gap-0.5 h-5 pb-0.5 shrink-0">
                    <div className="w-1 bg-[#C5A059] animate-[vis-1_0.6s_infinite_alternate]" />
                    <div className="w-1 bg-[#C5A059] animate-[vis-2_0.8s_infinite_alternate]" />
                    <div className="w-1 bg-[#C5A059] animate-[vis-3_0.5s_infinite_alternate]" />
                    <div className="w-1 bg-[#C5A059] animate-[vis-4_0.7s_infinite_alternate]" />
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Panel Description */}
            <div className="p-5 bg-black/50 border-t border-[#C5A059]/10 text-xs sm:text-sm text-[#F7F3E8]/90 leading-relaxed font-sans">
              <span className="font-bold text-[#C5A059] block mb-1">SCENE ANALYSIS:</span>
              {currentVideo.description}
            </div>

          </div>

          {/* Playlist Controls (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] border-b border-[#C5A059]/20 pb-2">
              Select Film Scene
            </span>

            <div className="space-y-3 flex-grow overflow-y-auto">
              {videos.map((vid, idx) => {
                const isSelected = idx === activeVideo;
                return (
                  <button
                    key={vid.id}
                    onClick={() => {
                      setActiveVideo(idx);
                      setIsPlaying(true);
                    }}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-[#62141C] border-[#C5A059] text-white shadow-lg"
                        : "bg-black/20 border-[#C5A059]/15 hover:border-[#C5A059]/40 text-[#F7F3E8]/80 hover:bg-black/30"
                    }`}
                  >
                    {/* Thumbnail representation */}
                    <div className="w-16 aspect-video rounded overflow-hidden shrink-0 bg-neutral-900 border border-[#C5A059]/20">
                      <img src={vid.image} alt="thumb" className="w-full h-full object-cover object-top" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-mono font-bold tracking-wider opacity-70">SCENE 0{vid.id}</span>
                        {isSelected && <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />}
                      </div>
                      <h4 className="text-xs sm:text-sm font-serif font-bold leading-tight">
                        {vid.title}
                      </h4>
                      <p className="text-[10px] leading-snug line-clamp-1 opacity-70">
                        {vid.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick feature callouts */}
            <div className="p-4 bg-black/40 rounded-lg border border-[#C5A059]/10 text-[11px] space-y-2 text-[#F7F3E8]/70">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Cinematic light filters capture silk thread weave authenticity.</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Autoplay streams alternate angles seamlessly.</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Styled inline animations for custom cinematic effects */}
      <style>{`
        @keyframes pan {
          0% { transform: scale(1.05) translate(0%, 0%); }
          100% { transform: scale(1.15) translate(-1.5%, -2%); }
        }
        @keyframes zoom-pulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes slow-drift {
          0% { transform: scale(1.05) translate(0%, 0%); }
          100% { transform: scale(1.12) translate(1.5%, -1%); }
        }
        @keyframes macro-pan {
          0% { transform: scale(1.2) translate(-2%, 0%); }
          100% { transform: scale(1.2) translate(2%, 0%); }
        }
        @keyframes vis-1 { 0% { height: 4px; } 100% { height: 18px; } }
        @keyframes vis-2 { 0% { height: 6px; } 100% { height: 14px; } }
        @keyframes vis-3 { 0% { height: 2px; } 100% { height: 20px; } }
        @keyframes vis-4 { 0% { height: 5px; } 100% { height: 15px; } }
      `}</style>
    </section>
  );
}
