import React, { useState } from "react";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSelectCategory: (category: string) => void;
  onScrollToSection: (sectionId: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function Header({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSelectCategory,
  onScrollToSection,
  searchTerm,
  onSearchChange,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const menuItems = [
    { label: "Home", action: () => onScrollToSection("home") },
    { label: "New Arrivals", action: () => onScrollToSection("new-arrivals") },
    { label: "Designer Blouses", action: () => onSelectCategory("Designer Blouses") },
    { label: "Traditional Blouses", action: () => onSelectCategory("Traditional Blouses") },
    { label: "Wedding Collection", action: () => onSelectCategory("Wedding Collection") },
    { label: "Festive Collection", action: () => onSelectCategory("Festive Collection") },
    { label: "Offers", action: () => onScrollToSection("special-offers") },
    { label: "About Us", action: () => onScrollToSection("about-us") },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FCFBF8]/95 backdrop-blur-md border-b border-[#62141C]/10 transition-all duration-300">
      {/* Promotion bar */}
      <div className="w-full bg-[#62141C] text-[#F7F3E8] text-xs py-1.5 px-4 text-center font-medium tracking-wider">
        FESTIVE CELEBRATION OFFER: UP TO 30% OFF ON LUXURY COLLECTION · USE CODE: <span className="text-[#D4AF37] font-semibold">SINDARAM30</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo Zone */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button 
            onClick={() => onScrollToSection("home")}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-[#62141C] group-hover:text-[#3A0A0E] transition-colors leading-none">
              SINDARAM BLOUSE
            </h1>
            <span className="text-[10px] sm:text-xs font-serif text-[#C5A059] tracking-widest block mt-0.5 font-medium">
              সিন্দারাম ব্লাউজ · LUXURY BOUTIQUE
            </span>
          </button>
        </div>

        {/* Navigation Zone */}
        <nav className="hidden xl:flex items-center gap-6">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                item.action();
                setIsMobileMenuOpen(false);
              }}
              className="text-[13px] font-sans font-medium text-[#2C211E]/80 hover:text-[#62141C] hover:underline hover:underline-offset-4 decoration-[#C5A059] decoration-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls Zone */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Search Bar Input */}
          <div className="relative flex items-center">
            {isSearchVisible && (
              <input
                type="text"
                placeholder="Search blouses..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-36 sm:w-48 px-3 py-1 text-xs rounded-full border border-[#62141C]/20 bg-[#F7F3E8] focus:outline-none focus:border-[#62141C] text-[#2C211E] mr-2 transition-all duration-300"
              />
            )}
            <button
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              className="p-2 text-[#2C211E]/80 hover:text-[#62141C] transition-colors"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="p-2 text-[#2C211E]/80 hover:text-[#62141C] transition-colors relative"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#62141C] text-[#F7F3E8] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="p-2 text-[#2C211E]/80 hover:text-[#62141C] transition-colors relative"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#C5A059] text-[#3A0A0E] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger Menu (Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 text-[#2C211E]/80 hover:text-[#62141C] transition-colors"
            title="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-[#62141C]/10 bg-[#FCFBF8] shadow-lg max-h-[75vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  item.action();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left block px-3 py-2 text-sm font-medium text-[#2C211E]/90 hover:bg-[#62141C]/5 hover:text-[#62141C] rounded-md transition-all"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[#62141C]/5 flex items-center gap-4 px-3">
              <button
                onClick={() => {
                  onOpenWishlist();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm text-[#2C211E]/80 hover:text-[#62141C]"
              >
                <Heart className="w-4 h-4 text-[#62141C]" /> Wishlist ({wishlistCount})
              </button>
              <button
                onClick={() => {
                  onOpenCart();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm text-[#2C211E]/80 hover:text-[#62141C]"
              >
                <ShoppingBag className="w-4 h-4 text-[#C5A059]" /> Cart ({cartCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
