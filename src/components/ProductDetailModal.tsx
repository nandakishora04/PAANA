import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw, Check, ArrowRight, Share2, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCartDrawerOpen,
    addToast,
  } = useShop();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [showSizeChart, setShowSizeChart] = useState(false);

  useEffect(() => {
    if (selectedProduct && selectedProduct.sizes.length > 0) {
      setSelectedSize(selectedProduct.sizes[0]);
      setActiveImageIdx(0);
      setPincodeStatus(null);
    }
  }, [selectedProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedProduct]);

  if (!selectedProduct) return null;

  const isWishlisted = isInWishlist(selectedProduct.id);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code.');
      return;
    }
    setPincodeStatus(`Available! Expected delivery to ${pincode} by Tomorrow, 3 PM. Cash on delivery eligible.`);
  };

  const handleAddAndOpenBag = () => {
    if (!selectedSize) {
      addToast('Please select a size first!', 'error');
      return;
    }
    addToCart(selectedProduct, selectedSize, 1);
    setSelectedProduct(null);
    setCartDrawerOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setSelectedProduct(null)}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl text-left overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-zinc-100 rounded-full text-zinc-600 hover:text-zinc-900 shadow-xs transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
            {/* Left: Product Images Gallery */}
            <div className="p-4 sm:p-6 bg-zinc-50 flex flex-col gap-4">
              <div className="relative aspect-3/4 rounded-xl overflow-hidden bg-white shadow-xs">
                <img
                  src={selectedProduct.images[activeImageIdx] || selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />

                <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{selectedProduct.rating} / 5.0</span>
                  <span className="text-zinc-400">·</span>
                  <span>{selectedProduct.ratingCount.toLocaleString()} Verified Ratings</span>
                </div>
              </div>

              {/* Thumbnails */}
              {selectedProduct.images.length > 1 && (
                <div className="flex items-center gap-3">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIdx === idx
                          ? 'border-[#4a0515] ring-2 ring-[#4a0515]/20'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Purchase Module & Information */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                {/* Brand & Title */}
                <div className="border-b border-zinc-100 pb-4">
                  <p className="text-xs font-extrabold tracking-wider text-[#4a0515] uppercase">
                    {selectedProduct.brand}
                  </p>
                  <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1 font-display">
                    {selectedProduct.name}
                  </h1>
                  <p className="text-xs text-zinc-500 mt-1">
                    SKU: {selectedProduct.id} · Gender: {selectedProduct.gender}
                  </p>
                </div>

                {/* Pricing Area */}
                <div className="pt-4 pb-4 border-b border-zinc-100">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tabular-nums">
                      ₹{selectedProduct.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-zinc-400 line-through tabular-nums">
                      MRP ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm font-extrabold text-[#4a0515]">
                      ({selectedProduct.discountPercent}% OFF)
                    </span>
                  </div>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">
                    Inclusive of all taxes. Free delivery on orders above ₹799.
                  </p>
                </div>

                {/* Size Selection */}
                <div className="pt-4 pb-4 border-b border-zinc-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                      Select Size:
                    </span>
                    <button
                      onClick={() => setShowSizeChart(!showSizeChart)}
                      className="text-xs text-[#4a0515] font-semibold hover:underline"
                    >
                      {showSizeChart ? 'Hide Size Chart' : 'Size Chart'}
                    </button>
                  </div>

                  {showSizeChart && (
                    <div className="mb-3 p-3 bg-zinc-50 rounded-lg text-xs border border-zinc-200">
                      <p className="font-bold text-zinc-800 mb-1">Standard Garment Dimensions (Inches):</p>
                      <div className="grid grid-cols-4 gap-1 text-center font-mono">
                        <span className="bg-white p-1 rounded font-bold">Size</span>
                        <span className="bg-white p-1 rounded font-bold">Chest</span>
                        <span className="bg-white p-1 rounded font-bold">Length</span>
                        <span className="bg-white p-1 rounded font-bold">Waist</span>
                        <span className="text-zinc-600">S</span><span>38"</span><span>27"</span><span>30"</span>
                        <span className="text-zinc-600">M</span><span>40"</span><span>28"</span><span>32"</span>
                        <span className="text-zinc-600">L</span><span>42"</span><span>29"</span><span>34"</span>
                        <span className="text-zinc-600">XL</span><span>44"</span><span>30"</span><span>36"</span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-12 py-2 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-[#4a0515] text-white border-[#4a0515] shadow-xs'
                            : 'bg-white text-zinc-800 border-zinc-300 hover:border-zinc-500'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {selectedProduct.stockCount <= 8 && (
                    <p className="text-[11px] text-amber-700 font-semibold mt-2">
                      ⚠️ Hurry! Only {selectedProduct.stockCount} items left in stock.
                    </p>
                  )}
                </div>

                {/* Delivery PIN Code Checker (Myntra Feature) */}
                <div className="pt-4 pb-4 border-b border-zinc-100">
                  <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#4a0515]" />
                    Delivery Options
                  </p>
                  <form onSubmit={handlePincodeCheck} className="flex gap-2 max-w-sm">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-digit Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-zinc-300 rounded-lg text-xs focus:outline-hidden focus:border-[#4a0515]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Check
                    </button>
                  </form>
                  {pincodeStatus && (
                    <p className="text-xs text-emerald-700 font-medium mt-2 bg-emerald-50 p-2 rounded-md border border-emerald-100">
                      {pincodeStatus}
                    </p>
                  )}
                </div>

                {/* Primary CTA Buttons */}
                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={handleAddAndOpenBag}
                    className="flex-1 py-3 px-6 bg-[#4a0515] hover:bg-[#60081d] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Bag
                  </button>

                  <button
                    onClick={() => toggleWishlist(selectedProduct)}
                    className={`py-3 px-5 border rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                      isWishlisted
                        ? 'bg-[#fed7e2] text-[#4a0515] border-[#4a0515]'
                        : 'bg-white hover:bg-zinc-50 text-zinc-800 border-zinc-300'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted ? 'fill-[#4a0515] text-[#4a0515]' : ''
                      }`}
                    />
                    {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                  </button>
                </div>

                {/* Product Details & Specifications */}
                <div className="pt-6 space-y-4">
                  <div>
                    <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1.5">
                      Product Description
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {selectedProduct.details.map((d, i) => (
                        <li key={i} className="text-xs text-zinc-600 flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Specifications */}
                  <div className="pt-3">
                    <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                      Specifications
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-xs border border-zinc-200 rounded-lg p-3 bg-zinc-50/50">
                      {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                        <div key={key}>
                          <span className="text-zinc-400 block text-[10px] uppercase font-semibold">{key}</span>
                          <span className="text-zinc-800 font-medium">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verified Reviews */}
                  {selectedProduct.reviews.length > 0 && (
                    <div className="pt-3">
                      <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                        Customer Reviews ({selectedProduct.reviews.length})
                      </h3>
                      <div className="space-y-2">
                        {selectedProduct.reviews.map((rev) => (
                          <div key={rev.id} className="p-3 bg-zinc-50 rounded-lg text-xs space-y-1 border border-zinc-100">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-zinc-800">{rev.userName}</span>
                              <span className="text-[10px] text-zinc-400">{rev.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-emerald-600 font-bold">
                              <span>{rev.rating}★</span>
                              <span className="text-zinc-500 font-normal">· Verified Purchase</span>
                            </div>
                            <p className="text-zinc-600">{rev.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
