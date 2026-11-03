import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    wishlistDrawerOpen,
    setWishlistDrawerOpen,
    toggleWishlist,
    moveToCartFromWishlist,
    setSelectedProduct,
  } = useShop();

  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  if (!wishlistDrawerOpen) return null;

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleMoveToBag = (product: any) => {
    const size = selectedSizes[product.id] || product.sizes[0] || 'M';
    moveToCartFromWishlist(product, size);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setWishlistDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
          <div className="p-4 bg-white border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#4a0515] fill-[#4a0515]" />
              <span className="text-base font-extrabold text-zinc-900 font-display">
                MY WISHLIST
              </span>
              <span className="text-xs bg-zinc-100 text-zinc-700 font-bold px-2 py-0.5 rounded-full tabular-nums">
                {wishlist.length} Items
              </span>
            </div>
            <button
              onClick={() => setWishlistDrawerOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {wishlist.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-zinc-900">Your Wishlist is Empty</h3>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Tap the heart icon on any product card to save your favorite styles for later.
                </p>
                <button
                  onClick={() => setWishlistDrawerOpen(false)}
                  className="px-6 py-2 bg-[#4a0515] text-white text-xs font-bold uppercase rounded-lg shadow-sm hover:bg-[#60081d] transition-colors cursor-pointer"
                >
                  Explore Drops
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {wishlist.map(({ product }) => {
                  const chosenSize = selectedSizes[product.id] || product.sizes[0] || 'M';

                  return (
                    <div
                      key={product.id}
                      className="border border-zinc-200 rounded-xl p-3 flex gap-3 bg-white hover:border-zinc-300 transition-all shadow-xs"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        onClick={() => {
                          setSelectedProduct(product);
                          setWishlistDrawerOpen(false);
                        }}
                        className="w-20 h-26 object-cover rounded-lg bg-zinc-100 shrink-0 cursor-pointer"
                      />

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <p className="text-xs font-bold text-zinc-900 uppercase">
                              {product.brand}
                            </p>
                            <button
                              onClick={() => toggleWishlist(product)}
                              className="text-zinc-400 hover:text-red-600 p-1 cursor-pointer"
                              title="Remove from wishlist"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-zinc-600 line-clamp-1">{product.name}</p>

                          <div className="mt-1 flex items-baseline gap-2">
                            <span className="text-sm font-extrabold text-zinc-900 tabular-nums">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs text-zinc-400 line-through tabular-nums">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs font-bold text-[#4a0515]">
                              ({product.discountPercent}% OFF)
                            </span>
                          </div>
                        </div>

                        {/* Size Picker for Moving to Bag */}
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
                            <span className="text-[10px] text-zinc-500 font-semibold uppercase">
                              Size:
                            </span>
                            {product.sizes.map((s) => (
                              <button
                                key={s}
                                onClick={() => handleSizeSelect(product.id, s)}
                                className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${
                                  chosenSize === s
                                    ? 'bg-[#4a0515] text-white border-[#4a0515]'
                                    : 'bg-zinc-50 text-zinc-700 border-zinc-200'
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>

                          <button
                            onClick={() => handleMoveToBag(product)}
                            className="w-full py-1.5 bg-[#4a0515] hover:bg-[#60081d] text-white text-xs font-bold uppercase tracking-wider rounded-md flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" /> Move to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
