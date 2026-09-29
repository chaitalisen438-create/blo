import React, { useState } from "react";
import { X, Heart, ShoppingBag, Send, HelpCircle, Check, Star } from "lucide-react";
import { Product } from "../data/products";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onBuyNow: (product: Product, size: string, color: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onOpenSizeGuide: () => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  onOpenSizeGuide,
}: ProductDetailModalProps) {
  if (!isOpen || !product) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product.colours[0]?.name || "Default");
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  const activeImage = product.images[activeImageIdx] || product.images[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleWhatsAppEnquiry = () => {
    const message = `Namaste, I am interested in purchasing the elegant "${product.name}" (Size: ${selectedSize}, Colour: ${selectedColor}) priced at ₹${product.price.toLocaleString()} from SINDARAM BLOUSE. Please share delivery details.`;
    const whatsappUrl = `https://wa.me/919000000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FCFBF8] border border-[#62141C]/20 max-w-5xl w-full rounded-xl shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Absolute Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-[#FCFBF8]/80 hover:bg-[#62141C] hover:text-[#F7F3E8] border border-[#62141C]/10 text-[#62141C] transition-all cursor-pointer"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Wrapper */}
        <div className="overflow-y-auto flex-grow p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left: Gallery Panel */}
            <div className="space-y-4">
              {/* Main Display with Zoom capability */}
              <div
                className="relative aspect-[3/4] overflow-hidden bg-[#F7F3E8] rounded-lg border border-[#62141C]/5 cursor-crosshair group/zoom"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className={`w-full h-full object-cover object-top transition-transform duration-100 ${
                    isZoomed ? "scale-220" : "scale-100"
                  }`}
                  style={
                    isZoomed
                      ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
                      : undefined
                  }
                />
                
                {/* Visual Indicators */}
                <div className="absolute bottom-3 right-3 bg-black/60 text-[#FCFBF8] text-[10px] px-2.5 py-1 rounded backdrop-blur-sm pointer-events-none tracking-widest font-sans">
                  {isZoomed ? "PANNING ACTIVE" : "HOVER TO ZOOM"}
                </div>
              </div>

              {/* Thumbnail List */}
              <div className="grid grid-cols-3 gap-3">
                {product.images.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`aspect-[3/4] rounded overflow-hidden border bg-[#F7F3E8] transition-all cursor-pointer ${
                      idx === activeImageIdx
                        ? "border-[#62141C] ring-2 ring-[#62141C]/20"
                        : "border-[#62141C]/10 hover:border-[#62141C]/40"
                    }`}
                  >
                    <img src={imgSrc} alt="thumbnail" className="w-full h-full object-cover object-top" />
                    <span className="sr-only">View Angle {idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Content Purchase Module */}
            <div className="space-y-6 flex flex-col justify-between">
              <div>
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs uppercase tracking-wider text-[#C5A059] font-semibold">
                    {product.category}
                  </span>
                  <span className="text-[10px] bg-[#62141C]/5 border border-[#62141C]/20 text-[#62141C] px-2 py-0.5 rounded-sm font-mono">
                    Premium Boutique Original
                  </span>
                </div>

                {/* Name */}
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#62141C] tracking-wide leading-tight">
                  {product.name}
                </h2>
                {/* Bengali name */}
                <p className="text-sm font-serif text-[#C5A059] mt-1 italic tracking-wide">
                  সিন্দারাম কালেকশন: {product.bengaliName}
                </p>

                {/* Rating summary */}
                <div className="flex items-center gap-1.5 mt-3">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#2C211E]/80 font-mono">
                    {product.rating} ({product.reviewCount} customer reviews)
                  </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#62141C]/10 my-4" />

                {/* Prices */}
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-[#62141C] font-mono">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-[#2C211E]/40 line-through font-mono">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-[#15803d] bg-emerald-50 px-2 py-1 rounded">
                    Save {product.discount}% OFF
                  </span>
                </div>

                {/* Product details narrative */}
                <p className="text-xs sm:text-sm text-[#2C211E]/80 leading-relaxed font-sans mt-4">
                  {product.details}
                </p>

                {/* Size Swatches */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2C211E]">
                      Select Size: <span className="text-[#62141C]">{selectedSize}</span>
                    </span>
                    <button
                      onClick={onOpenSizeGuide}
                      className="text-xs font-medium text-[#C5A059] hover:text-[#62141C] underline flex items-center gap-1 cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      Size Guide Table
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-11 h-10 flex items-center justify-center border text-xs font-mono font-bold uppercase rounded transition-all cursor-pointer ${
                          selectedSize === size
                            ? "bg-[#62141C] border-[#62141C] text-[#F7F3E8]"
                            : "border-[#62141C]/20 text-[#2C211E] hover:border-[#62141C]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Swatches */}
                <div className="mt-5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2C211E] block">
                    Select Colour: <span className="text-[#62141C]">{selectedColor}</span>
                  </span>
                  <div className="flex items-center gap-3">
                    {product.colours.map((col) => {
                      const isSelected = selectedColor === col.name;
                      return (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(col.name)}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                            isSelected ? "border-[#62141C] ring-2 ring-[#62141C]/30 scale-105" : "border-black/10"
                          }`}
                          style={{ backgroundColor: col.hex }}
                          title={col.name}
                        >
                          {isSelected && <Check className="w-4 h-4 text-[#FCFBF8] drop-shadow-md" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Product Specs List */}
                <div className="mt-6 border-t border-b border-[#62141C]/10 py-4 space-y-2 text-xs sm:text-sm">
                  <div className="grid grid-cols-2">
                    <span className="font-semibold text-[#2C211E]/70">Fabric Details:</span>
                    <span className="text-[#2C211E] font-medium">{product.fabric}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="font-semibold text-[#2C211E]/70">Neck Design:</span>
                    <span className="text-[#2C211E] font-medium">{product.neckDesign}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="font-semibold text-[#2C211E]/70">Sleeve Type:</span>
                    <span className="text-[#2C211E] font-medium">{product.sleeveStyle}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="font-semibold text-[#2C211E]/70">Pattern / Embroidery:</span>
                    <span className="text-[#2C211E] font-medium">{product.pattern}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="font-semibold text-[#2C211E]/70">Care Instructions:</span>
                    <span className="text-[#2C211E] text-xs italic font-medium">{product.careInstructions}</span>
                  </div>
                </div>
              </div>

              {/* Multi-tier Actions Row */}
              <div className="space-y-3 pt-6 mt-6 border-t border-[#62141C]/5">
                {/* Row 1: Add to Cart & Buy Now */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onAddToCart(product, selectedSize, selectedColor)}
                    className="flex-1 py-3 bg-transparent hover:bg-[#62141C]/5 border-2 border-[#62141C] text-[#62141C] font-semibold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart Bag
                  </button>
                  
                  <button
                    onClick={() => onBuyNow(product, selectedSize, selectedColor)}
                    className="flex-1 py-3 bg-[#62141C] hover:bg-[#3A0A0E] text-[#F7F3E8] font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    Buy It Now
                  </button>
                </div>

                {/* Row 2: Wishlist Toggle & WhatsApp Enquiry */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className="py-2.5 px-4 bg-[#FCFBF8] border border-[#62141C]/20 hover:border-[#62141C] text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-2 text-[#2C211E] transition-all cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 text-[#62141C] ${isWishlisted ? "fill-[#62141C]" : ""}`} />
                    {isWishlisted ? "Remove From Wishlist" : "Save to Wishlist"}
                  </button>

                  <button
                    onClick={handleWhatsAppEnquiry}
                    className="flex-1 py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    WhatsApp Order Enquire
                  </button>
                </div>

                {/* Return policy details inline */}
                <div className="text-[11px] text-[#2C211E]/60 text-center space-y-1 pt-2 leading-tight">
                  <p>🚚 Free courier delivery on orders above ₹1,500.</p>
                  <p>🔄 {product.returnPolicy} · Safe secure digital checkout.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
