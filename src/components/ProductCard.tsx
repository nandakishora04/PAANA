import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Eye, Zap } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setSelectedProduct(product)}
      className="group relative bg-white rounded-xl border border-zinc-200/80 hover:border-zinc-300 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* 3:4 Aspect Ratio Image Container */}
      <div className="relative aspect-3/4 w-full bg-zinc-100 overflow-hidden">
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges: Flash Deal or Trending */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.isFlashDeal && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-[#4a0515] text-[#fed7e2] px-2 py-0.5 rounded-sm shadow-xs">
              <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
              FLASH
            </span>
          )}
          {product.stockCount <= 8 && (
            <span className="text-[10px] font-semibold tracking-tight bg-amber-500/90 text-white px-2 py-0.5 rounded-sm shadow-xs backdrop-blur-xs">
              Only {product.stockCount} Left!
            </span>
          )}
        </div>

        {/* Top Right: Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all shadow-xs ${
            isWishlisted
              ? 'bg-[#4a0515] text-[#fed7e2] scale-110'
              : 'bg-white/90 hover:bg-white text-zinc-700 hover:text-[#4a0515] backdrop-blur-xs'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#fed7e2] text-[#fed7e2]' : ''
            }`}
          />
        </button>

        {/* Bottom Left: Customer Rating Badge (Myntra Standard) */}
        <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-zinc-800 text-[11px] font-bold px-2 py-0.5 rounded-sm shadow-xs flex items-center gap-1">
          <span>{product.rating}</span>
          <Star className="w-3 h-3 text-emerald-600 fill-emerald-600" />
          <span className="text-zinc-400 font-normal">|</span>
          <span className="text-zinc-500 font-medium">
            {product.ratingCount >= 1000
              ? `${(product.ratingCount / 1000).toFixed(1)}k`
              : product.ratingCount}
          </span>
        </div>

        {/* Hover / Overlay: Quick Size Selector & Add to Bag */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm p-3 border-t border-zinc-200 transition-all duration-200 ${
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-zinc-600 uppercase">Select Size:</span>
            <button
              onClick={() => setSelectedProduct(product)}
              className="text-[11px] text-[#4a0515] font-semibold hover:underline flex items-center gap-0.5"
            >
              <Eye className="w-3 h-3" /> Details
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {product.sizes.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`text-xs font-semibold px-2 py-1 rounded-sm border transition-all ${
                  selectedSize === sz
                    ? 'bg-[#4a0515] text-white border-[#4a0515]'
                    : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-500'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          <button
            onClick={handleQuickAdd}
            className="w-full mt-2 py-1.5 bg-[#4a0515] hover:bg-[#60081d] text-white text-xs font-bold uppercase tracking-wider rounded-md flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Bag
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider">
            {product.brand}
          </p>
          <h3 className="text-xs sm:text-[13px] text-zinc-600 line-clamp-1 mt-0.5 group-hover:text-zinc-900 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Pricing Row */}
        <div className="mt-2.5 pt-2 border-t border-zinc-100">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-sm sm:text-base font-extrabold text-zinc-900 tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-zinc-400 line-through tabular-nums">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-bold text-[#4a0515]">
              ({product.discountPercent}% OFF)
            </span>
          </div>

          {/* Delivery Note */}
          {product.fastDelivery && (
            <p className="text-[11px] text-emerald-700 font-medium mt-1 truncate">
              ⚡ {product.fastDelivery}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
