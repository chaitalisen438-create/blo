import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, CreditCard, ChevronRight, CheckCircle2 } from "lucide-react";
import { Product } from "../data/products";

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const [checkoutStep, setCheckoutStep] = useState<"cart" | "checkout" | "success">("cart");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "upi">("cod");

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    postalCode: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [orderId, setOrderId] = useState("");

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 1500;
  const deliveryCharge = subtotal > 0 && subtotal < freeShippingThreshold ? 120 : 0;
  const totalAmount = subtotal + deliveryCharge;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Full Name is required";
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = "Valid 10-digit Phone is required";
    if (!formData.address.trim()) errors.address = "Complete Address is required";
    if (!formData.postalCode.trim() || formData.postalCode.length !== 6) errors.postalCode = "Valid 6-digit PIN Code is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const randomId = `SND-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(randomId);
    setCheckoutStep("success");
  };

  const handleFinishSuccess = () => {
    onClearCart();
    setCheckoutStep("cart");
    setFormData({ name: "", phone: "", address: "", postalCode: "", email: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      {/* Click outside backdrop close (only when not success to prevent accidental loss) */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={() => checkoutStep !== "success" && onClose()} 
      />

      {/* Cart Content Drawer Panel */}
      <div className="w-full max-w-md bg-[#FCFBF8] border-l border-[#62141C]/20 shadow-2xl flex flex-col h-full animate-slide-left">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#62141C]/10 bg-[#F7F3E8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#62141C]" />
            <h3 className="text-base font-serif font-bold text-[#62141C] uppercase tracking-wider">
              {checkoutStep === "cart" && `Shopping Bag (${cartItems.length})`}
              {checkoutStep === "checkout" && "Billing & Shipping Details"}
              {checkoutStep === "success" && "Order Verified"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#2C211E]/60 hover:text-[#62141C] hover:bg-[#62141C]/5 transition-colors cursor-pointer"
            title="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Inner Panel Viewports */}
        {checkoutStep === "cart" && (
          <>
            {/* Bag Items list */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag className="w-16 h-16 text-[#62141C]/15 stroke-1" />
                  <div>
                    <h4 className="font-serif font-bold text-[#2C211E]/90 text-base">Your Bag is Empty</h4>
                    <p className="text-xs text-[#2C211E]/60 max-w-[250px] mx-auto mt-1">
                      Browse our designer blouse collections and find your perfect wedding or festive wear match.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-[#62141C] text-[#F7F3E8] hover:bg-[#3A0A0E] text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Free shipping banner */}
                  <div className="bg-[#62141C]/5 border border-[#62141C]/10 p-3 rounded text-xs space-y-1.5">
                    <div className="flex justify-between font-semibold">
                      <span>Free Shipping Progress:</span>
                      <span className="text-[#62141C] font-mono">
                        {subtotal >= freeShippingThreshold
                          ? "Unlocked!"
                          : `Add ₹${(freeShippingThreshold - subtotal).toLocaleString()} more`}
                      </span>
                    </div>
                    <div className="w-full bg-[#62141C]/15 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#C5A059] h-full transition-all duration-500" 
                        style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-[#2C211E]/60 block text-right">
                      Free delivery on luxury cart items above ₹1,500.
                    </span>
                  </div>

                  {/* Cart List */}
                  <div className="divide-y divide-[#62141C]/10">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="py-4 flex gap-3 group">
                        {/* Img */}
                        <div className="w-20 aspect-[3/4] bg-[#F7F3E8] rounded overflow-hidden shrink-0 border border-[#62141C]/5">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        
                        {/* Meta details */}
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between gap-2">
                              <h4 className="text-sm font-serif font-bold text-[#2C211E] line-clamp-1">
                                {item.product.name}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(idx)}
                                className="text-red-500 hover:text-red-700 transition-colors p-1 cursor-pointer"
                                title="Remove Item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <span className="text-[10px] text-[#C5A059] block uppercase tracking-wider font-semibold">
                              {item.product.category}
                            </span>
                            <div className="flex gap-2 text-[11px] text-[#2C211E]/70 mt-1 font-mono">
                              <span>Size: <strong className="text-[#62141C]">{item.size}</strong></span>
                              <span>·</span>
                              <span>Colour: <strong className="text-[#62141C]">{item.color}</strong></span>
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-[#62141C]/20 rounded bg-[#F7F3E8]/50 overflow-hidden">
                              <button
                                onClick={() => onUpdateQuantity(idx, -1)}
                                className="p-1 px-2.5 text-[#2C211E] hover:bg-[#62141C]/5 transition-colors cursor-pointer"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-3 text-xs font-mono font-bold text-[#62141C]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(idx, 1)}
                                className="p-1 px-2.5 text-[#2C211E] hover:bg-[#62141C]/5 transition-colors cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-sm font-bold text-[#62141C] font-mono">
                              ₹{(item.product.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Sticky summary bar at bottom */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-[#62141C]/10 bg-[#F7F3E8] space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#2C211E]/70">
                    <span>Subtotal</span>
                    <span className="font-mono font-semibold">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#2C211E]/70">
                    <span>Delivery Charges</span>
                    <span className="font-mono font-semibold">
                      {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-[#62141C] pt-2 border-t border-[#62141C]/10">
                    <span>Total Amount</span>
                    <span className="font-mono text-lg">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutStep("checkout")}
                  className="w-full py-3 bg-[#62141C] hover:bg-[#3A0A0E] text-[#F7F3E8] text-xs font-bold uppercase tracking-widest rounded flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  Proceed to Secure Checkout
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Viewport 2: Shipping checkout form */}
        {checkoutStep === "checkout" && (
          <form onSubmit={handleCheckoutSubmit} className="flex-grow flex flex-col justify-between overflow-hidden">
            <div className="flex-grow overflow-y-auto p-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] border-b border-[#62141C]/10 pb-1.5">
                Delivery Information
              </h4>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#2C211E]/80 block">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm rounded border border-[#62141C]/25 bg-transparent focus:outline-none focus:border-[#62141C] text-[#2C211E]"
                  placeholder="e.g. Chaitali Sen"
                />
                {formErrors.name && <span className="text-[10px] text-red-500 font-medium block">{formErrors.name}</span>}
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#2C211E]/80 block">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm rounded border border-[#62141C]/25 bg-transparent focus:outline-none focus:border-[#62141C] text-[#2C211E]"
                  placeholder="10-digit mobile number"
                />
                {formErrors.phone && <span className="text-[10px] text-red-500 font-medium block">{formErrors.phone}</span>}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#2C211E]/80 block">Email Address (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm rounded border border-[#62141C]/25 bg-transparent focus:outline-none focus:border-[#62141C] text-[#2C211E]"
                  placeholder="e.g. chaitali@gmail.com"
                />
              </div>

              {/* Address */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#2C211E]/80 block">Shipping Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 text-sm rounded border border-[#62141C]/25 bg-transparent focus:outline-none focus:border-[#62141C] text-[#2C211E] resize-none"
                  placeholder="House No, Street name, City, State"
                />
                {formErrors.address && <span className="text-[10px] text-red-500 font-medium block">{formErrors.address}</span>}
              </div>

              {/* Postal Code */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#2C211E]/80 block">PIN Code (Postal Code) *</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  maxLength={6}
                  className="w-full px-3 py-2 text-sm rounded border border-[#62141C]/25 bg-transparent focus:outline-none focus:border-[#62141C] text-[#2C211E]"
                  placeholder="6-digit postal code (e.g. 700001)"
                />
                {formErrors.postalCode && <span className="text-[10px] text-red-500 font-medium block">{formErrors.postalCode}</span>}
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] border-b border-[#62141C]/10 pb-1.5">
                  Select Payment Option
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-3 rounded border text-left flex flex-col justify-between h-18 transition-all cursor-pointer ${
                      paymentMethod === "cod"
                        ? "border-[#62141C] bg-[#62141C]/5 ring-1 ring-[#62141C]"
                        : "border-[#62141C]/20 hover:border-[#62141C]/40"
                    }`}
                  >
                    <span className="text-xs font-bold text-[#62141C]">Cash On Delivery</span>
                    <span className="text-[10px] text-[#2C211E]/60">Pay cash upon home arrival</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-3 rounded border text-left flex flex-col justify-between h-18 transition-all cursor-pointer ${
                      paymentMethod === "upi"
                        ? "border-[#62141C] bg-[#62141C]/5 ring-1 ring-[#62141C]"
                        : "border-[#62141C]/20 hover:border-[#62141C]/40"
                    }`}
                  >
                    <span className="text-xs font-bold text-[#62141C]">UPI / NetBanking</span>
                    <span className="text-[10px] text-[#2C211E]/60">Safe instant online transfer</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Billing CTA Row */}
            <div className="p-5 border-t border-[#62141C]/10 bg-[#F7F3E8] space-y-3">
              <div className="flex justify-between items-baseline text-xs text-[#2C211E]/70">
                <span>Total Payable:</span>
                <span className="text-base font-bold text-[#62141C] font-mono">
                  ₹{totalAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep("cart")}
                  className="px-4 py-3 bg-transparent hover:bg-[#62141C]/5 border border-[#62141C]/30 text-[#62141C] text-xs font-bold uppercase rounded cursor-pointer"
                >
                  Back to Bag
                </button>
                <button
                  type="submit"
                  className="flex-grow py-3 bg-[#62141C] hover:bg-[#3A0A0E] text-[#F7F3E8] text-xs font-bold uppercase tracking-wider rounded transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Confirm & Place Order
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Viewport 3: Success Invoice Page */}
        {checkoutStep === "success" && (
          <div className="flex-grow overflow-y-auto p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-6 text-center pt-8">
              <div className="inline-flex p-3 rounded-full bg-green-50 text-green-600 border border-green-200">
                <CheckCircle2 className="w-12 h-12 stroke-2" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xl font-serif font-bold text-[#62141C]">
                  Order Successfully Verified!
                </h4>
                <p className="text-xs text-green-700 font-medium">
                  We are preparing your exquisite Bengal blouse package.
                </p>
              </div>

              {/* Digital Invoice Box */}
              <div className="border border-[#62141C]/10 rounded-lg p-4 bg-[#F7F3E8]/50 text-left space-y-3 text-xs shadow-inner">
                <div className="flex justify-between font-mono font-bold text-[#62141C] border-b border-[#62141C]/10 pb-2">
                  <span>Invoice Receipt</span>
                  <span>{orderId}</span>
                </div>

                <div className="space-y-1 font-sans text-[#2C211E]/80">
                  <p><span className="font-semibold">Customer:</span> {formData.name}</p>
                  <p><span className="font-semibold">Phone:</span> {formData.phone}</p>
                  <p className="line-clamp-2"><span className="font-semibold">Address:</span> {formData.address}</p>
                  <p><span className="font-semibold">Status:</span> Preparing Shipment · Cash on Delivery</p>
                </div>

                <div className="border-t border-dashed border-[#62141C]/15 pt-2 space-y-1.5 font-mono">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-[11px] text-[#2C211E]">
                      <span>{item.product.name} (Size {item.size}) x{item.quantity}</span>
                      <span>₹{(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-[#62141C] pt-1.5 border-t border-[#62141C]/10 text-sm">
                    <span>Total Bill:</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#C5A059]/10 rounded border border-[#C5A059]/25 text-left space-y-1">
                <p className="text-[10px] uppercase font-bold text-[#C5A059] tracking-wider">Estimated Delivery</p>
                <p className="text-xs font-medium text-[#2C211E]">Arriving within 3–5 working days with secure tracker.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleFinishSuccess}
              className="w-full py-3.5 bg-[#62141C] hover:bg-[#3A0A0E] text-[#F7F3E8] text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer shadow"
            >
              Back to Catalog Showcase
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
