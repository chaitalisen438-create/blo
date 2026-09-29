import React from "react";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onBuyNow: (product: Product) => void;
}

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onBuyNow,
}: ProductCardProps) {
  // Use first image as front and second image as back if available
  const frontImage = product.images[0];
  const backImage = product.images[1] || product.images[0];

  return (
    <div className="group bg-[#FCFBF8] rounded-lg border border-[#62141C]/5 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 select-none flex flex-col h-full">
      {/* Image Container with Hover Reveal */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F7F3E8] cursor-pointer" onClick={() => onQuickView(product)}>
        {/* Front Image */}
        <img
          src={frontImage}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Back / Detail Image shown on Hover */}
        {backImage !== frontImage && (
          <img
            src={backImage}
            alt={`${product.name} back view`}
            className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.isBestSeller && (
            <span className="bg-[#C5A059] text-[#3A0A0E] text-[9px] font-bold tracking-wider px-2.5 py-1 uppercase rounded-sm shadow">
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-[#62141C] text-[#F7F3E8] text-[9px] font-bold tracking-wider px-2.5 py-1 uppercase rounded-sm shadow">
              New Arrival
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-[#15803d] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm shadow">
              -{product.discount}% OFF
            </span>
          )}
        </div>

        {/* Heart Wishlist Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-[#FCFBF8]/80 backdrop-blur-sm border border-[#62141C]/10 text-[#62141C] hover:bg-[#62141C] hover:text-[#F7F3E8] transition-all cursor-pointer shadow-sm"
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-[#62141C]" : ""}`} />
        </button>

        {/* Quick View & Add to Cart Floating Actions */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 w-[90%] justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2.5 bg-[#FCFBF8] text-[#62141C] border border-[#62141C]/10 hover:bg-[#62141C] hover:text-[#F7F3E8] transition-all rounded shadow-sm flex items-center justify-center cursor-pointer"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Default to first size and color
              onAddToCart(product, product.sizes[0], product.colours[0].name);
            }}
            className="flex-1 py-2.5 bg-[#62141C] text-[#F7F3E8] hover:bg-[#3A0A0E] text-xs font-medium uppercase tracking-wider transition-all rounded shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Info Details Panel */}
      <div className="p-4 flex flex-col flex-grow bg-[#FCFBF8]">
        {/* Category Label */}
        <div className="text-[10px] font-semibold text-[#C5A059] tracking-wider uppercase mb-1">
          {product.category}
        </div>

        {/* Product Title */}
        <h3 
          onClick={() => onQuickView(product)}
          className="text-[15px] font-serif font-bold text-[#2C211E] hover:text-[#62141C] transition-colors line-clamp-1 mb-2 cursor-pointer"
        >
          {product.name}
        </h3>

        {/* Bengali Name */}
        <span className="text-[11px] font-serif text-[#2C211E]/60 block mb-3 italic">
          {product.bengaliName}
        </span>

        {/* Size Selection Indicator */}
        <div className="flex items-center gap-1 text-[11px] text-[#2C211E]/70 mb-3 flex-wrap">
          <span className="font-semibold text-[10px] uppercase mr-1">Sizes:</span>
          {product.sizes.map((sz) => (
            <span key={sz} className="px-1.5 py-0.5 bg-[#F7F3E8] rounded-sm text-[10px] font-mono font-medium">
              {sz}
            </span>
          ))}
        </div>

        {/* Color Dot Previews */}
        <div className="flex items-center gap-1.5 mb-4">
          <span className="text-[10px] font-semibold uppercase text-[#2C211E]/70 mr-1">Colours:</span>
          {product.colours.map((col) => (
            <div
              key={col.name}
              className="w-3.5 h-3.5 rounded-full border border-black/10 relative group/col cursor-help"
              style={{ backgroundColor: col.hex }}
              title={col.name}
            >
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-1.5 py-0.5 bg-[#2C211E] text-white text-[8px] rounded opacity-0 group-hover/col:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                {col.name}
              </span>
            </div>
          ))}
        </div>

        {/* Pricing & Primary CTA */}
        <div className="mt-auto pt-3 border-t border-[#62141C]/5 flex items-center justify-between gap-3">
          {/* Price Layout */}
          <div className="flex flex-col">
            <span className="text-xs text-[#2C211E]/50 line-through font-mono">
              ₹{product.originalPrice.toLocaleString()}
            </span>
            <span className="text-base font-bold text-[#62141C] font-mono leading-none">
              ₹{product.price.toLocaleString()}
            </span>
          </div>

          {/* Buy Now Direct Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBuyNow(product);
            }}
            className="px-4 py-2 bg-[#C5A059] text-[#3A0A0E] hover:bg-[#62141C] hover:text-[#F7F3E8] text-xs font-semibold uppercase tracking-wider rounded transition-all duration-300 cursor-pointer shadow-sm shrink-0"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
