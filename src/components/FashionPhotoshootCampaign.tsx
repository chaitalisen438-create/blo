import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Camera, Eye, Zap, RefreshCw, Layers, Sliders, ArrowRight } from "lucide-react";

interface CampaignScene {
  id: number;
  title: string;
  image: string;
  desc: string;
  cameraSettings: string;
  duration: number; // in seconds
}

interface FashionPhotoshootCampaignProps {
  onExploreClick: () => void;
}

export default function FashionPhotoshootCampaign({ onExploreClick }: FashionPhotoshootCampaignProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [sceneProgress, setSceneProgress] = useState<number>(0);
  const [flashActive, setFlashActive] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState<boolean>(true);

  // 7 cinematic scenes depicting the premium Kolkata studio photoshoot campaign
  const scenes: CampaignScene[] = [
    {
      id: 1,
      title: "The Kolkata Studio Set",
      image: "/src/assets/images/sleeveless_black_red_saree_1790687247329.jpg",
      desc: "Wide cinematic look of the SINDARAM luxury fashion studio with softbox lights, professional cameras, and backdrops.",
      cameraSettings: "50mm · F/1.8 · ISO 100",
      duration: 3
    },
    {
      id: 2,
      title: "Model 01 - The Red & Black Statement",
      image: "/src/assets/images/sleeveless_black_red_saree_1790687247329.jpg",
      desc: "Adult Bengali model (22 yrs) walks onto the set wearing a vibrant red silk saree and elegant black sleeveless designer blouse.",
      cameraSettings: "85mm · F/1.4 · ISO 160",
      duration: 3.5
    },
    {
      id: 3,
      title: "Model 02 - Traditional Reverie",
      image: "/src/assets/images/sleeveless_red_white_saree_1790687262956.jpg",
      desc: "Flash capture of Traditional Garad white saree with red border, paired with deep maroon sleeveless velvet blouse.",
      cameraSettings: "85mm · F/1.2 · ISO 200",
      duration: 3
    },
    {
      id: 4,
      title: "Close-up Micro Detailing",
      image: "/src/assets/images/sleeveless_festive_close_up_saree_1790687371019.jpg",
      desc: "Macro close-up capturing professional embroidery, flawless neckline stitching, and premium zari thread texture.",
      cameraSettings: "100mm Macro · F/2.8 · ISO 100",
      duration: 3
    },
    {
      id: 5,
      title: "Model 03 & 04 - Contemporary Gold & Pastel",
      image: "/src/assets/images/sleeveless_gold_black_saree_1790687279715.jpg",
      desc: "Elegant poses of Model 03 in black saree with antique gold sleeveless blouse, followed by pastel pink embroidered looks.",
      cameraSettings: "50mm · F/2.0 · ISO 100",
      duration: 3.5
    },
    {
      id: 6,
      title: "Behind The Scenes Moments",
      image: "/src/assets/images/sleeveless_contrast_blue_saree_1790687306145.jpg",
      desc: "Photographer adjusting large studio softbox lights. Shutter flashes and candid posture alterations of Model 05 in royal blue & pink.",
      cameraSettings: "35mm · F/1.8 · ISO 400",
      duration: 3
    },
    {
      id: 7,
      title: "The Masterpiece Campaign",
      image: "/src/assets/images/sleeveless_organza_pastel_saree_1790687346024.jpg",
      desc: "Beautiful group campaign shot of SINDARAM BLOUSE collection. Exquisite embroidery and modern sleeveless silhouettes.",
      cameraSettings: "50mm · F/2.8 · ISO 100",
      duration: 4
    }
  ];

  // Monitor visibility in viewport for play/pause
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

  // Scene slider ticker interval
  useEffect(() => {
    if (!isPlaying || !isInView) return;

    const currentScene = scenes[currentSceneIndex];
    const totalSteps = currentScene.duration * 20; // 50ms intervals
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = (currentStep / totalSteps) * 100;
      setSceneProgress(progress);

      // Trigger realistic camera shutter flash midway through each scene!
      if (currentStep === Math.floor(totalSteps / 2)) {
        setFlashActive(true);
        setTimeout(() => setFlashActive(false), 150);
      }

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setCurrentSceneIndex((prev) => (prev + 1) % scenes.length);
        setSceneProgress(0);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, currentSceneIndex, isInView]);

  const handleSceneClick = (index: number) => {
    setCurrentSceneIndex(index);
    setSceneProgress(0);
  };

  return (
    <section 
      id="fashion-campaign-studio"
      ref={containerRef}
      className="py-24 bg-[#FCFBF8] border-b border-[#62141C]/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Aesthetic campaign header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#62141C] animate-pulse" />
            <span className="text-xs font-bold text-[#62141C] tracking-[0.3em] uppercase block">
              SINDARAM ATELIER DIRECTORS EDIT
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#62141C] tracking-wide leading-tight">
            আমাদের ডিজাইনের নেপথ্যে
          </h2>
          <p className="text-sm sm:text-base text-[#2C211E]/80 font-sans max-w-2xl mx-auto">
            প্রতিটি ব্লাউজে সৌন্দর্য, কারুকার্য ও আধুনিকতার ছোঁয়া — A Behind-The-Scenes Look at Our Kolkata Luxury Studio Campaign
          </p>
          <div className="w-12 h-0.5 bg-[#C5A059] mx-auto" />
        </div>

         {/* Cinematic Video Player Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Simulated Video Frame (9 Cols) */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-video bg-black shadow-2xl border border-[#62141C]/10 group">
            
            {/* Shutter Shimmer Flash Overlay */}
            {flashActive && (
              <div className="absolute inset-0 bg-white z-40 animate-fade-out" style={{ mixBlendMode: "overlay" }} />
            )}

            {/* Media Canvas */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={scenes[currentSceneIndex].image}
                alt={scenes[currentSceneIndex].title}
                className="w-full h-full object-cover object-top transition-transform duration-[4000ms] ease-out scale-105"
                style={{
                  transform: isPlaying && isInView ? "scale(1.15) translateY(1%)" : "scale(1.05) translateY(0%)"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 z-10" />
              <div className="absolute inset-0 bg-[#3A0A0E]/5 mix-blend-color-burn z-10" />
            </div>

            {/* Camera Viewfinder Overlays (Focus lines, Rec Indicator, Grid) */}
            <div className="absolute inset-0 pointer-events-none border-4 sm:border-[12px] border-black/35 z-20 flex flex-col justify-between p-3 sm:p-4">
              
              {/* Top Bar: Rec Dot & Battery */}
              <div className="flex justify-between items-center text-[9px] sm:text-[10px] text-white/90 font-mono tracking-widest">
                <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping shrink-0" />
                  <span>REC LIVE</span>
                </div>
                <div className="bg-black/40 px-2.5 py-1 rounded hidden sm:block">
                  {scenes[currentSceneIndex].cameraSettings}
                </div>
              </div>

              {/* Center Crosshairs */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <div className="w-6 h-0.5 bg-white" />
                <div className="w-0.5 h-6 bg-white" />
                <div className="absolute w-12 h-12 border border-white rounded-full" />
              </div>

              {/* Bottom Bar: Scene info */}
              <div className="flex justify-between items-end text-[9px] sm:text-[10px] text-white/90 font-mono z-30 gap-2">
                <div className="max-w-full sm:max-w-[70%] space-y-0.5 sm:space-y-1 bg-black/60 p-2 sm:p-2.5 rounded backdrop-blur-sm border border-white/5">
                  <span className="text-[#D4AF37] font-bold block text-[11px] sm:text-xs tracking-wider">
                    {scenes[currentSceneIndex].title}
                  </span>
                  <p className="font-sans text-[10px] sm:text-[11px] text-white/80 leading-relaxed font-light line-clamp-1 sm:line-clamp-2 hidden xs:block">
                    {scenes[currentSceneIndex].desc}
                  </p>
                </div>

                {/* Simulated video playback progress timestamp */}
                <div className="bg-black/40 px-2 py-1 sm:px-3 sm:py-1.5 rounded font-mono text-[10px] sm:text-xs flex items-center gap-1.5 shrink-0">
                  <Camera className="w-3.5 h-3.5 text-[#C5A059] animate-[spin_5s_infinite_linear] hidden xs:inline" />
                  <span>00:{Math.floor(sceneProgress / 5) < 10 ? `0${Math.floor(sceneProgress / 5)}` : Math.floor(sceneProgress / 5)}</span>
                </div>
              </div>
            </div>

            {/* Live progress indicator under the viewport */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
              <div 
                className="h-full bg-[#C5A059] transition-all duration-50" 
                style={{ width: `${sceneProgress}%` }} 
              />
            </div>

            {/* Play / Pause Toggle Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 p-5 rounded-full bg-black/60 hover:bg-[#62141C]/90 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-lg"
              title={isPlaying ? "Pause Campaign" : "Play Campaign"}
            >
              {isPlaying ? <Pause className="w-6 h-6 text-[#D4AF37]" /> : <Play className="w-6 h-6 fill-current text-white" />}
            </button>
          </div>

          {/* Campaign Overview & Playlist Navigation (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#F7F3E8] border border-[#62141C]/10 p-5 rounded-xl space-y-4 shadow-sm">
              <div className="flex items-center gap-2 border-b border-[#62141C]/5 pb-3">
                <Sliders className="w-4 h-4 text-[#62141C]" />
                <span className="text-xs font-bold text-[#62141C] tracking-widest uppercase">
                  PHOTOSHOOT TIMELINE
                </span>
              </div>

              {/* List of scenes acting as video selection index */}
              <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
                {scenes.map((sc, idx) => {
                  const isActive = currentSceneIndex === idx;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => handleSceneClick(idx)}
                      className={`w-full text-left p-2.5 rounded border transition-all flex gap-3 cursor-pointer items-center ${
                        isActive 
                          ? "bg-[#62141C] text-[#F7F3E8] border-[#62141C] shadow" 
                          : "bg-white text-[#2C211E]/80 border-black/5 hover:border-[#62141C]/20"
                      }`}
                    >
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isActive ? "bg-[#C5A059] text-white" : "bg-neutral-100 text-neutral-400"
                      }`}>
                        0{sc.id}
                      </span>
                      <div className="space-y-0.5 text-xs">
                        <span className="font-serif font-bold block line-clamp-1">{sc.title}</span>
                        <span className={`text-[10px] font-mono block ${isActive ? "text-white/70" : "text-neutral-400"}`}>
                          Duration: {sc.duration}s
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Campaign action call to action */}
              <div className="pt-2 border-t border-[#62141C]/5">
                <button
                  onClick={onExploreClick}
                  className="w-full py-3 bg-[#62141C] hover:bg-[#3A0A0E] text-white text-xs font-semibold uppercase tracking-wider rounded transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center gap-2 border border-[#C5A059]/40 hover:border-[#D4AF37]"
                >
                  <span>কালেকশন দেখুন</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Small camera credit label */}
            <div className="text-[11px] text-neutral-400 italic text-center font-sans">
              *Filmed at SINDARAM Atelier, Elgin Road, Kolkata in ultra high-definition.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
