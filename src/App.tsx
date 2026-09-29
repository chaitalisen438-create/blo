import React, { useState, useRef, useMemo } from "react";
import { 
  Heart, 
  ShoppingBag, 
  TrendingUp, 
  Star, 
  Send, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Sparkles, 
  PhoneCall, 
  ChevronLeft, 
  ChevronRight,
  Sparkle,
  BookmarkCheck,
  Check,
  X
} from "lucide-react";

import { PRODUCTS, CATEGORIES, CATEGORIES_WITH_IMAGES, Product } from "./data/products";
import Header from "./components/Header";
import HeroCarousel from "./components/HeroCarousel";
import ProductCard from "./components/ProductCard";
import SizeGuideModal from "./components/SizeGuideModal";
import ProductDetailModal from "./components/ProductDetailModal";
import CartDrawer, { CartItem } from "./components/CartDrawer";
import CinematicVideos from "./components/CinematicVideos";
import StyleInMotion from "./components/StyleInMotion";
import FashionPhotoshootCampaign from "./components/FashionPhotoshootCampaign";
import PulseFitHeroDemo from "./components/ui/demo";

export default function App() {
  // Navigation & States
  const [viewMode, setViewMode] = useState<"sindaram" | "pulsefit">("sindaram");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Blouses");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [activeQuickView, setActiveQuickView] = useState<Product | null>(null);
  
  // UI drawers / Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Notifications
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  // New review state
  const [reviews, setReviews] = useState([
    {
      name: "Sarmistha Ganguly",
      location: "Kolkata, WB",
      rating: 5,
      comment: "Absolutely in love with the Shyama embroidered silk blouse! The fit is incredibly precise, and the gold zari embroidery looks even more beautiful in hand. Truly a boutique feel.",
      design: "Shyama Embroidered Silk",
      date: "Sep 15, 2026"
    },
    {
      name: "Pooja Banerjee",
      location: "Mumbai",
      rating: 5,
      comment: "I ordered the Alpona puff-sleeve blouse for my cotton sarees. It has a beautiful vintage style that reminds me of traditional Bengali celebrations. Highly recommended!",
      design: "Alpona Puff-Sleeve Handloom",
      date: "Sep 22, 2026"
    },
    {
      name: "Ananya Sen",
      location: "Delhi NCR",
      rating: 5,
      comment: "The Rajkumari Velvet blouse is a masterpiece. The zardozi cuffs are extremely rich, perfect for festive weddings. Thank you Sindaram Blouse!",
      design: "Rajkumari Velvet Zardozi",
      date: "Sep 28, 2026"
    }
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
    design: "Shyama Embroidered Silk"
  });

  // Slider Refs for horizontal scrolling
  const newArrivalsRef = useRef<HTMLDivElement>(null);

  // Toast trigger
  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Scroll targets helper
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Category Filtering
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "All Blouses" || 
        product.category === selectedCategory ||
        (selectedCategory === "Embroidered Blouses" && product.pattern.toLowerCase().includes("embroid"));

      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.bengaliName.includes(searchTerm) ||
        product.fabric.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.neckDesign.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  // New Arrivals List
  const newArrivals = useMemo(() => {
    return PRODUCTS.filter((p) => p.isNewArrival);
  }, []);

  // Best Sellers List
  const bestSellers = useMemo(() => {
    return PRODUCTS.filter((p) => p.isBestSeller);
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, size: string, color: string) => {
    setCart((prev) => {
      const existsIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      );
      if (existsIdx > -1) {
        const copy = [...prev];
        copy[existsIdx].quantity += 1;
        return copy;
      }
      return [...prev, { product, size, color, quantity: 1 }];
    });
    showToast(`Added ${product.name} (Size ${size}) to shopping bag!`);
  };

  const handleUpdateCartQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const copy = [...prev];
      const newQty = copy[index].quantity + delta;
      if (newQty < 1) return prev;
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    const item = cart[index];
    setCart((prev) => prev.filter((_, i) => i !== index));
    showToast(`Removed ${item.product.name} from your bag.`, "info");
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleBuyNow = (product: Product, size: string = "M", color: string = "") => {
    const finalColor = color || product.colours[0].name;
    // Add item first
    setCart((prev) => {
      const existsIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === finalColor
      );
      if (existsIdx > -1) {
        const copy = [...prev];
        return copy;
      }
      return [...prev, { product, size, color: finalColor, quantity: 1 }];
    });
    // Open cart & start checkout instantly
    setIsCartOpen(true);
    if (activeQuickView) setActiveQuickView(null);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed "${product.name}" from your wishlist.`, "info");
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Added "${product.name}" to your wishlist!`, "success");
    }
  };

  // Scroll Slider actions
  const scrollNewArrivals = (direction: "left" | "right") => {
    if (newArrivalsRef.current) {
      const offset = direction === "left" ? -300 : 300;
      newArrivalsRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  // Review submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      showToast("Please fill out both Name and Comment field", "info");
      return;
    }

    setReviews((prev) => [
      {
        name: newReview.name,
        location: "Verified Buyer",
        rating: newReview.rating,
        comment: newReview.comment,
        design: newReview.design,
        date: "Today"
      },
      ...prev
    ]);

    setNewReview({ name: "", rating: 5, comment: "", design: PRODUCTS[0].name });
    showToast("Thank you! Your testimonial has been posted successfully.");
  };

  const handleFloatingWhatsApp = () => {
    const msg = "Namaste! I am visiting SINDARAM BLOUSE. I have a general custom size or design query.";
    window.open(`https://wa.me/919163888706?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF8] text-[#2C211E]">
      
      {/* Component Switcher for Reviewing both SINDARAM and PulseFit Components */}
      <div className="bg-[#201715] text-[#F7F3E8] border-b border-[#C5A059]/30 py-2.5 px-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs tracking-wider font-sans font-medium relative z-50">
        <div className="flex items-center gap-2 text-[11px] sm:text-xs">
          <Sparkle className="w-3.5 h-3.5 text-[#C5A059] animate-spin" />
          <span>ATELIER COMPONENT HUB & PREVIEW SUITE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-neutral-400 mr-1 uppercase">Switch Component View:</span>
          <button
            onClick={() => setViewMode("sindaram")}
            className={`px-3 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
              viewMode === "sindaram" 
                ? "bg-[#C5A059] text-[#3A0A0E] shadow" 
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            SINDARAM BLOUSE Boutique (সিন্দারাম ব্লাউজ)
          </button>
          <button
            onClick={() => setViewMode("pulsefit")}
            className={`px-3 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
              viewMode === "pulsefit" 
                ? "bg-blue-600 text-white shadow-sm" 
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            PulseFit Hero component
          </button>
        </div>
      </div>

      {viewMode === "pulsefit" ? (
        <div className="animate-fade-in flex-grow flex flex-col bg-white">
          <div className="bg-blue-50 border-b border-blue-100 p-4 text-center">
            <p className="text-xs text-blue-800 font-medium font-sans">
              Currently displaying the integrated <strong>PulseFit Hero Component</strong> inside <code>/src/components/ui/pulse-fit-hero.tsx</code>. Use the top switcher to return to SINDARAM BLOUSE.
            </p>
          </div>
          <PulseFitHeroDemo />
        </div>
      ) : (
        <>
          {/* Sticky Premium Header */}
          <Header
            cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
            wishlistCount={wishlist.length}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenWishlist={() => setIsWishlistOpen(true)}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              handleScrollToSection("catalog-showcase");
            }}
            onScrollToSection={handleScrollToSection}
            searchTerm={searchTerm}
            onSearchChange={(term) => {
              setSearchTerm(term);
              handleScrollToSection("catalog-showcase");
            }}
          />

      {/* Hero Interactive Carousel with simulated videos */}
      <div id="home">
        <HeroCarousel
          onShopClick={() => handleScrollToSection("catalog-showcase")}
          onExploreClick={() => {
            setSelectedCategory("Designer Blouses");
            handleScrollToSection("catalog-showcase");
          }}
        />
      </div>

      {/* Category Card Grid Section */}
      <section className="py-16 bg-[#F7F3E8]/40 border-b border-[#62141C]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-semibold text-[#C5A059] tracking-widest uppercase block">
              Curated Masterpieces
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#62141C] tracking-wide">
              Shop Blouse Collections
            </h2>
            <p className="text-xs sm:text-sm text-[#2C211E]/70 font-sans">
              Hand-guided embroidery, pure silk textures, and classic handlooms woven to fit you perfectly.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES_WITH_IMAGES.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  handleScrollToSection("catalog-showcase");
                }}
                className="group cursor-pointer bg-[#FCFBF8] rounded-lg border border-[#62141C]/5 overflow-hidden shadow-sm hover:shadow-lg transition-all text-center pb-4 flex flex-col h-full"
              >
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Content */}
                <div className="p-2.5 flex-grow flex flex-col justify-between">
                  <h3 className="font-serif font-bold text-sm text-[#2C211E] group-hover:text-[#62141C] transition-colors leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-[#2C211E]/50 mt-1 line-clamp-2">
                    {cat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS (Elegant Horizontal Slider) */}
      <section id="new-arrivals" className="py-16 bg-[#FCFBF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row */}
          <div className="flex items-end justify-between mb-8">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#C5A059] tracking-widest uppercase block">
                Fresh From Our Loom
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#62141C] tracking-wide">
                The New Arrivals Edit
              </h2>
            </div>

            {/* Slider Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => scrollNewArrivals("left")}
                className="p-2 rounded-full bg-[#F7F3E8] hover:bg-[#62141C] text-[#2C211E] hover:text-[#F7F3E8] transition-all cursor-pointer border border-[#62141C]/10"
                title="Slide Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollNewArrivals("right")}
                className="p-2 rounded-full bg-[#F7F3E8] hover:bg-[#62141C] text-[#2C211E] hover:text-[#F7F3E8] transition-all cursor-pointer border border-[#62141C]/10"
                title="Slide Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal scroll container */}
          <div
            ref={newArrivalsRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {newArrivals.map((product) => (
              <div key={product.id} className="w-[280px] sm:w-[320px] shrink-0 snap-start">
                <ProductCard
                  product={product}
                  isWishlisted={wishlist.some((item) => item.id === product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={(p) => setActiveQuickView(p)}
                  onAddToCart={(p, sz, col) => handleAddToCart(p, sz, col)}
                  onBuyNow={(p) => handleBuyNow(p, p.sizes[0])}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CINEMATIC VIDEO INTERACTION MODULE (Autoplaying films) */}
      <CinematicVideos />

      {/* MAIN CATALOG CATALOGUE SHOWCASE (Search + Categories Filter + Grid) */}
      <section id="catalog-showcase" className="py-16 bg-[#F7F3E8]/20 border-t border-b border-[#62141C]/5 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-semibold text-[#C5A059] tracking-widest uppercase block">
              Sindaram Atelier
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#62141C] tracking-wide">
              Explore Our Signature Catalog
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto" />
          </div>

          {/* Filters Bar */}
          <div className="space-y-6 mb-10">
            {/* Category selection pill row */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#62141C] text-[#F7F3E8] shadow"
                      : "bg-[#FCFBF8] border border-[#62141C]/15 text-[#2C211E]/80 hover:border-[#62141C]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Custom search notification alert */}
            {searchTerm && (
              <div className="bg-[#62141C]/5 border border-[#62141C]/10 text-xs px-4 py-3 rounded text-center text-[#62141C]">
                Showing results matching search phrase &ldquo;<strong className="font-mono">{searchTerm}</strong>&rdquo;. 
                <button 
                  onClick={() => setSearchTerm("")}
                  className="underline ml-2 font-bold cursor-pointer"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Product grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center text-neutral-500 max-w-md mx-auto space-y-4">
              <Sparkle className="w-12 h-12 text-[#C5A059] mx-auto animate-spin" />
              <p className="font-serif font-semibold text-[#2C211E] text-base">No Matching Blouses Found</p>
              <p className="text-xs text-neutral-400">
                We couldn&apos;t find any designs fitting your filters. Please try checking another category or clear your search criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All Blouses");
                  setSearchTerm("");
                }}
                className="px-6 py-2.5 bg-[#62141C] text-[#F7F3E8] rounded uppercase text-xs tracking-wider font-semibold cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.some((item) => item.id === product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={(p) => setActiveQuickView(p)}
                  onAddToCart={(p, sz, col) => handleAddToCart(p, sz, col)}
                  onBuyNow={(p) => handleBuyNow(p, p.sizes[0])}
                />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* BEST SELLERS QUICK GRID */}
      <section className="py-16 bg-[#FCFBF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left promo column */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-bold text-[#C5A059] tracking-widest uppercase block">
                The Heritage Edit
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#62141C] leading-tight tracking-wide">
                Our Celebrated Best Sellers
              </h2>
              <div className="w-12 h-0.5 bg-[#62141C]" />
              <p className="text-sm text-[#2C211E]/75 leading-relaxed">
                These magnificent blouse styles represent the heart of Sindaram’s design DNA. Adored by buyers across Kolkata, Mumbai, and Delhi for festive occasions.
              </p>
              <button
                onClick={() => handleScrollToSection("catalog-showcase")}
                className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#62141C] hover:text-[#C5A059] transition-colors cursor-pointer"
              >
                Explore Complete Range
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Right best sellers card row */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {bestSellers.slice(0, 2).map((product) => (
                <div key={product.id} className="flex gap-4 p-4 rounded-xl bg-[#F7F3E8]/40 border border-[#62141C]/5 hover:border-[#62141C]/15 transition-all">
                  <div className="w-24 aspect-[3/4] bg-[#F7F3E8] rounded overflow-hidden shrink-0 border border-[#62141C]/5">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-bold text-[#C5A059] uppercase tracking-wider">{product.category}</span>
                      <h4 className="font-serif font-bold text-sm text-[#2C211E] line-clamp-1 mt-0.5">{product.name}</h4>
                      <p className="text-[10px] text-neutral-400 italic line-clamp-1">{product.bengaliName}</p>
                      
                      <div className="flex items-center gap-1 text-[#D4AF37] mt-1.5">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-[11px] font-mono font-bold text-[#2C211E]">{product.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-[#62141C]/5">
                      <span className="text-sm font-bold text-[#62141C] font-mono">₹{product.price.toLocaleString()}</span>
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="px-3 py-1.5 bg-[#62141C] hover:bg-[#3A0A0E] text-[#F7F3E8] text-[10px] font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* SPECIAL PROMOTIONAL BANNER SECTION */}
      <section id="special-offers" className="py-20 bg-[#62141C] text-[#F7F3E8] relative overflow-hidden">
        {/* Scrims */}
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
        
        {/* Absolute Pattern Decoration */}
        <div className="absolute -bottom-12 -right-12 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="text-xs font-semibold text-[#D4AF37] tracking-[0.4em] uppercase block">
            LIMITED AUTUMN EDITION
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-wide">
            Festive Blouse Collection
          </h2>
          <p className="text-sm sm:text-lg text-[#F7F3E8]/95 font-light max-w-2xl mx-auto leading-relaxed">
            Beautiful handcrafts styled for every saree and celebration. Purchase 2 or more designer blouses and get an automatic <strong className="text-[#D4AF37]">extra 10% discount</strong> with free courier delivery.
          </p>
          <div className="inline-block px-6 py-2.5 bg-white/10 border border-[#D4AF37]/30 text-base font-serif font-bold tracking-wider rounded">
            Up to <span className="text-[#D4AF37] text-xl font-bold">30% OFF</span> on Premium Wedding Silk Weaves
          </div>
          <div className="pt-4">
            <button
              onClick={() => {
                setSelectedCategory("Wedding Collection");
                handleScrollToSection("catalog-showcase");
              }}
              className="px-8 py-3.5 bg-[#C5A059] hover:bg-white text-[#3A0A0E] hover:text-[#62141C] font-bold text-xs uppercase tracking-widest rounded shadow-xl transition-all duration-300 cursor-pointer"
            >
              Shop the Collection
            </button>
          </div>
        </div>
      </section>

      {/* REVIEWS & SUBMISSION FORM */}
      <section className="py-16 bg-[#F7F3E8]/40 border-t border-b border-[#62141C]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Column 1: Testimonials list (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-1 mb-8">
                <span className="text-xs font-semibold text-[#C5A059] tracking-widest uppercase block">
                  Customer Stories
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#62141C] tracking-wide">
                  What Our Customers Say
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {reviews.map((rev, idx) => (
                  <div key={idx} className="p-5 rounded-lg bg-[#FCFBF8] border border-[#62141C]/5 shadow-xs space-y-3 flex flex-col justify-between">
                    <div>
                      {/* Rating */}
                      <div className="flex text-[#D4AF37] gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-[#2C211E]/80 font-sans italic leading-relaxed mt-2.5">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#62141C]/5 mt-4 flex items-center justify-between text-[11px] text-[#2C211E]/60">
                      <div>
                        <strong className="text-[#2C211E] font-semibold">{rev.name}</strong>
                        <span className="block">{rev.location}</span>
                      </div>
                      <span className="font-mono text-[10px] bg-[#62141C]/5 px-2 py-0.5 text-[#62141C] rounded-sm">
                        {rev.design}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Testimonial submission (4 cols) */}
            <div className="lg:col-span-4 bg-[#FCFBF8] border border-[#62141C]/15 p-6 rounded-xl shadow-sm space-y-4">
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-lg text-[#62141C] uppercase tracking-wide">
                  Share Your Experience
                </h4>
                <p className="text-xs text-neutral-400">
                  Your feedback helps our Kolkata artisans maintain top quality designs.
                </p>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-3.5 text-xs">
                {/* Name */}
                <div className="space-y-1">
                  <label className="font-semibold text-[#2C211E]/80">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="e.g. Priyadarshini Dey"
                    className="w-full px-3 py-2 rounded border border-[#62141C]/20 bg-transparent text-sm text-[#2C211E] focus:outline-none focus:border-[#62141C]"
                  />
                </div>

                {/* Rating select */}
                <div className="space-y-1">
                  <label className="font-semibold text-[#2C211E]/80 block">Rating Stars</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded border border-[#62141C]/20 bg-[#FCFBF8] text-sm text-[#2C211E] focus:outline-none"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>

                {/* Blouse bought */}
                <div className="space-y-1">
                  <label className="font-semibold text-[#2C211E]/80 block">Blouse Purchased</label>
                  <select
                    value={newReview.design}
                    onChange={(e) => setNewReview({ ...newReview, design: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-[#62141C]/20 bg-[#FCFBF8] text-sm text-[#2C211E] focus:outline-none"
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>

                {/* Review */}
                <div className="space-y-1">
                  <label className="font-semibold text-[#2C211E]/80 block">Review Comment</label>
                  <textarea
                    required
                    rows={3}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Describe styling fit, material texture, and matching sarees..."
                    className="w-full px-3 py-2 rounded border border-[#62141C]/20 bg-transparent text-sm text-[#2C211E] resize-none focus:outline-none focus:border-[#62141C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#62141C] hover:bg-[#3A0A0E] text-white font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Feedback
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>

      {/* WHY CHOOSE US BENEFITS BAR */}
      <section className="py-12 bg-[#FCFBF8] border-b border-[#62141C]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded bg-[#62141C]/5 text-[#62141C] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-serif font-bold text-[#62141C] uppercase tracking-wider">Premium Quality</h4>
                <p className="text-[11px] text-neutral-400">Authentic Mulberry Silks & Khadi.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded bg-[#62141C]/5 text-[#62141C] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-serif font-bold text-[#62141C] uppercase tracking-wider">Comfortable Fit</h4>
                <p className="text-[11px] text-neutral-400">Tailored with 2-inch alteration margins.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded bg-[#62141C]/5 text-[#62141C] shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-serif font-bold text-[#62141C] uppercase tracking-wider">Fast Courier Delivery</h4>
                <p className="text-[11px] text-neutral-400">Insured express logistics nationwide.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded bg-[#62141C]/5 text-[#62141C] shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-serif font-bold text-[#62141C] uppercase tracking-wider">Easy Exchange</h4>
                <p className="text-[11px] text-neutral-400">7-day doorstep size replacement.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT US TEXT SECTION */}
      <section id="about-us" className="py-16 bg-[#F7F3E8]/30">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs font-bold text-[#C5A059] tracking-widest uppercase block">THE SINDARAM STORY</span>
          <h2 className="text-3xl font-serif font-bold text-[#62141C]">সিন্দারাম ব্লাউজ — Crafting Bengali Heritage</h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto" />
          <p className="text-sm text-neutral-600 leading-relaxed max-w-3xl mx-auto">
            SINDARAM BLOUSE is a high-end luxury Bengali fashion boutique born out of the heart of Kolkata. 
            Our main business is designing exquisite blouses that tell a story of sheer elegance, intricate artistry, 
            and rich handcrafts. Every design is engineered with professional multi-stitch backing, comfortable breathable 
            lining, and double margins to adapt beautifully to your silhouette. We believe every magnificent saree 
            deserves a matching masterpiece.
          </p>
          <div className="pt-2 text-xs font-bold text-[#62141C] tracking-wide">
            Designed in Kolkata · Shipped Worldwide
          </div>
        </div>
      </section>

      {/* PREMIUM CINEMATIC FASHION PHOTOSHOOT CAMPAIGN VIDEO SECTION */}
      <FashionPhotoshootCampaign onExploreClick={() => handleScrollToSection("new-arrivals")} />

      {/* STYLE IN MOTION VIDEO EDITORIAL GALLERY */}
      <StyleInMotion
        onShopClick={(category, destination) => {
          if (destination) {
            // High-fidelity local routing simulation
            if (destination === "/collections/red-designer-blouse") {
              const prod = PRODUCTS.find(p => p.id === "sleeveless-black-red");
              if (prod) setActiveQuickView(prod);
              return;
            }
            if (destination === "/collections/black-gold-blouse") {
              const prod = PRODUCTS.find(p => p.id === "sondhya-organza-designer");
              if (prod) setActiveQuickView(prod);
              return;
            }
            if (destination === "/collections/pastel-blouse") {
              const prod = PRODUCTS.find(p => p.id === "shefali-sleeveless-floral");
              if (prod) setActiveQuickView(prod);
              return;
            }
            if (destination === "/collections/blue-designer-blouse") {
              const prod = PRODUCTS.find(p => p.id === "banalata-jamdani-border");
              if (prod) setActiveQuickView(prod);
              return;
            }
            if (destination === "/collections/bengali-handloom-blouse") {
              const prod = PRODUCTS.find(p => p.id === "alpona-handloom-cotton");
              if (prod) setActiveQuickView(prod);
              return;
            }
            if (destination === "/collections/premium-festive-blouse") {
              const prod = PRODUCTS.find(p => p.id === "kolkata-heritage-banarasi");
              if (prod) setActiveQuickView(prod);
              return;
            }
            if (destination === "/collections/traditional-blouse") {
              setSelectedCategory("Traditional Blouses");
              handleScrollToSection("catalog-showcase");
              return;
            }
            if (destination === "/collections/handloom-blouse") {
              setSelectedCategory("Cotton Blouses");
              handleScrollToSection("catalog-showcase");
              return;
            }
            if (destination === "/collections/festive-blouse") {
              setSelectedCategory("Festive Collection");
              handleScrollToSection("catalog-showcase");
              return;
            }
            if (destination === "/collections/modern-sleeveless-blouse") {
              setSelectedCategory("Sleeveless Blouse");
              handleScrollToSection("catalog-showcase");
              return;
            }
            if (destination === "/shop") {
              setSelectedCategory("All Blouses");
              handleScrollToSection("catalog-showcase");
              return;
            }
          }
          if (category) {
            setSelectedCategory(category);
          }
          handleScrollToSection("catalog-showcase");
        }}
        onExploreClick={() => handleScrollToSection("new-arrivals")}
        onWhatsAppOrder={(msg) => {
          window.open(`https://wa.me/919163888706?text=${encodeURIComponent(msg)}`, "_blank");
        }}
      />

      {/* WIDE FOOTER */}
      <footer className="bg-[#201715] text-[#F7F3E8] pt-16 pb-8 border-t border-[#C5A059]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Logo brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-[#C5A059] tracking-wider leading-none">
              SINDARAM BLOUSE
            </h3>
            <p className="text-[11px] font-serif tracking-widest text-[#F7F3E8]/60">
              সিন্দারাম ব্লাউজ · EXQUISITE ATELIER
            </p>
            <p className="text-xs text-[#F7F3E8]/70 leading-relaxed">
              We create premium women’s designer and ready-made blouses that merge traditional heritage textures with contemporary silhouettes. Crafted in Kolkata, loved globally.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-sans font-bold text-[#C5A059] uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs text-[#F7F3E8]/80">
              <li><button onClick={() => handleScrollToSection("catalog-showcase")} className="hover:text-[#C5A059] transition-colors cursor-pointer">Shop Blouses</button></li>
              <li><button onClick={() => handleScrollToSection("new-arrivals")} className="hover:text-[#C5A059] transition-colors cursor-pointer">New Arrivals Edit</button></li>
              <li><button onClick={() => { setSelectedCategory("Designer Blouses"); handleScrollToSection("catalog-showcase"); }} className="hover:text-[#C5A059] transition-colors cursor-pointer">Designer Blouse Showcase</button></li>
              <li><button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-[#C5A059] transition-colors cursor-pointer flex items-center gap-1.5"><BookmarkCheck className="w-3.5 h-3.5 text-[#C5A059]" /> Size Guide & Margin Table</button></li>
              <li><button onClick={() => handleScrollToSection("about-us")} className="hover:text-[#C5A059] transition-colors cursor-pointer">Our Heritage Story</button></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-sans font-bold text-[#C5A059] uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-2 text-xs text-[#F7F3E8]/80">
              <li><a href="#about-us" className="hover:text-[#C5A059] transition-colors">Shipping & COD Policy</a></li>
              <li><a href="#about-us" className="hover:text-[#C5A059] transition-colors">Returns & Exchange Guarantee</a></li>
              <li><a href="#about-us" className="hover:text-[#C5A059] transition-colors">Privacy, Terms & Security</a></li>
              <li><button onClick={handleFloatingWhatsApp} className="hover:text-[#C5A059] transition-colors cursor-pointer">Order Custom Tailoring Enquiries</button></li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-sans font-bold text-[#C5A059] uppercase tracking-wider">The Boutique Atelier</h4>
            <p className="text-xs text-[#F7F3E8]/80 leading-relaxed">
              49/6 Tatul Road,<br />
              Kolkata, West Bengal - 700012
            </p>
            <p className="text-xs text-[#F7F3E8]/80 font-mono">
              Phone: +91 91638 88706
            </p>
            <div className="pt-2">
              <button
                onClick={handleFloatingWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#25D366] hover:bg-[#1EBE57] text-white text-xs font-bold uppercase transition-colors cursor-pointer shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Live Chat Support
              </button>
            </div>
          </div>

        </div>

        {/* Footer Base bottom */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-[#F7F3E8]/10 text-center text-[11px] text-[#F7F3E8]/50 space-y-2">
          <p>© {new Date().getFullYear()} SINDARAM BLOUSE (সিন্দারাম ব্লাউজ). All rights reserved.</p>
          <p>Handcrafted under pure ethical trade agreements with Kolkata&apos;s weaving guilds.</p>
        </div>
      </footer>

      {/* FLOATING ACTION WHATSAPP CHAT/ORDER INITIATOR */}
      <button
        onClick={handleFloatingWhatsApp}
        className="fixed bottom-6 right-6 z-30 p-4 rounded-full bg-[#25D366] text-white hover:scale-110 active:scale-95 transition-all shadow-xl hover:shadow-[#25D366]/20 cursor-pointer flex items-center justify-center group"
        title="Enquire on WhatsApp"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-36 transition-all duration-300 text-xs font-semibold uppercase tracking-wider block whitespace-nowrap mr-0 group-hover:mr-2">
          Enquire on WhatsApp
        </span>
        <Send className="w-5 h-5" />
      </button>

      {/* TOAST SYSTEM ALERTS */}
      {toast && (
        <div className="fixed bottom-6 left-6 z-50 p-4 rounded-lg bg-[#201715] text-[#F7F3E8] border border-[#C5A059]/40 shadow-2xl flex items-center gap-3 animate-slide-right text-xs sm:text-sm">
          <div className="p-1 rounded-full bg-[#C5A059]/10 text-[#C5A059]">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <p className="font-medium text-white">{toast.message}</p>
          </div>
          <button onClick={() => setToast(null)} className="p-1 text-white/50 hover:text-white cursor-pointer ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* SIZE GUIDE DIALOG MODAL */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* PRODUCT QUICK DETAIL VIEW DIALOG MODAL */}
      <ProductDetailModal
        product={activeQuickView}
        isOpen={activeQuickView !== null}
        onClose={() => setActiveQuickView(null)}
        onAddToCart={(p, sz, col) => handleAddToCart(p, sz, col)}
        onBuyNow={(p, sz, col) => handleBuyNow(p, sz, col)}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={activeQuickView ? wishlist.some((item) => item.id === activeQuickView.id) : false}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* WISHLIST OVERLAY DRAWER PANEL */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="absolute inset-0 -z-10" onClick={() => setIsWishlistOpen(false)} />
          <div className="w-full max-w-md bg-[#FCFBF8] border-l border-[#62141C]/20 shadow-2xl flex flex-col h-full animate-slide-left">
            {/* Header */}
            <div className="p-5 border-b border-[#62141C]/10 bg-[#F7F3E8] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-600 fill-current" />
                <h3 className="text-base font-serif font-bold text-[#62141C] uppercase tracking-wider">
                  Saved Wishlist ({wishlist.length})
                </h3>
              </div>
              <button onClick={() => setIsWishlistOpen(false)} className="p-1 rounded-full text-[#2C211E]/60 hover:text-[#62141C] hover:bg-[#62141C]/5 transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <Heart className="w-16 h-16 text-neutral-200 stroke-1" />
                  <div>
                    <h4 className="font-serif font-bold text-[#2C211E]/90 text-sm">Your Wishlist is Empty</h4>
                    <p className="text-xs text-neutral-400 max-w-[250px] mx-auto mt-1">
                      Save your favorite boutique blouse designs here to revisit or purchase later.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsWishlistOpen(false);
                      handleScrollToSection("catalog-showcase");
                    }}
                    className="px-6 py-2 bg-[#62141C] text-[#F7F3E8] rounded text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    View Catalog
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-[#62141C]/10">
                  {wishlist.map((product) => (
                    <div key={product.id} className="py-4 flex gap-3">
                      <div className="w-16 aspect-[3/4] bg-[#F7F3E8] rounded overflow-hidden shrink-0 border border-[#62141C]/5">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover object-top" />
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-serif font-bold text-[#2C211E] line-clamp-1">{product.name}</h4>
                          <span className="text-[10px] text-[#C5A059] block uppercase tracking-wider font-semibold">{product.category}</span>
                          <span className="text-[11px] font-mono text-[#62141C] font-bold block mt-1">₹{product.price.toLocaleString()}</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => {
                              handleBuyNow(product);
                              setIsWishlistOpen(false);
                            }}
                            className="px-3 py-1.5 bg-[#62141C] text-[#F7F3E8] hover:bg-[#3A0A0E] text-[10px] font-bold uppercase rounded cursor-pointer"
                          >
                            Buy Now
                          </button>
                          <button
                            onClick={() => handleToggleWishlist(product)}
                            className="px-3 py-1.5 bg-transparent border border-[#62141C]/30 text-[#62141C] hover:bg-[#62141C]/5 text-[10px] font-bold uppercase rounded cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CART OVERLAY DRAWER PANEL */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

        </>
      )}

    </div>
  );
}
