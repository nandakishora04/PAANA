import React from 'react';
import { useShop } from '../context/ShopContext';

const QUICK_CATEGORIES = [
  {
    id: 'all',
    label: 'All Styles',
    sub: 'Trending',
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'genz',
    label: 'Boxy Tees',
    subCategory: 'T-Shirts',
    sub: 'From ₹899',
    image: 'https://images.pexels.com/photos/8532617/pexels-photo-8532617.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'women',
    label: 'Kurtas & Sets',
    subCategory: 'Kurtas & Sets',
    sub: 'Up to 65% Off',
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'men',
    label: 'Cargos',
    subCategory: 'Cargos',
    sub: 'Streetwear',
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'footwear',
    label: 'Sneakers',
    subCategory: 'Sneakers',
    sub: 'Retro Court',
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'women',
    label: 'Slip Dresses',
    subCategory: 'Dresses',
    sub: 'Party Ready',
    image: 'https://images.pexels.com/photos/1755385/pexels-photo-1755385.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'beauty',
    label: 'Skincare',
    subCategory: 'Skincare',
    sub: 'Glow Lab',
    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'accessories',
    label: 'Watches',
    subCategory: 'Watches',
    sub: 'Timepieces',
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 'kids',
    label: 'Kids Sets',
    subCategory: 'Sets',
    sub: 'Pure Cotton',
    image: 'https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

export const CategoryBubbles: React.FC = () => {
  const { activeCategory, setActiveCategory, updateFilters, filters } = useShop();

  const handleSelect = (item: (typeof QUICK_CATEGORIES)[0]) => {
    setActiveCategory(item.id);
    if (item.subCategory) {
      updateFilters({ subCategory: item.subCategory });
    } else {
      updateFilters({ subCategory: 'all' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-zinc-900 tracking-wide uppercase">
          Curated Category Drops
        </h2>
        <span className="text-xs text-zinc-400 font-medium">Click to filter styles</span>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar">
        {QUICK_CATEGORIES.map((cat, idx) => {
          const isSelected =
            (activeCategory === cat.id && (!cat.subCategory || filters.subCategory === cat.subCategory)) ||
            (cat.id === 'all' && activeCategory === 'all' && filters.subCategory === 'all');

          return (
            <button
              key={idx}
              onClick={() => handleSelect(cat)}
              className="flex flex-col items-center shrink-0 group focus:outline-hidden text-center cursor-pointer"
            >
              <div
                className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full p-0.5 border-2 transition-all ${
                  isSelected
                    ? 'border-[#4a0515] ring-2 ring-[#4a0515]/20 shadow-md scale-105'
                    : 'border-zinc-200 group-hover:border-[#4a0515]/50 group-hover:scale-105'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover rounded-full bg-zinc-100"
                />
              </div>
              <span className={`mt-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                isSelected ? 'text-[#4a0515]' : 'text-zinc-800 group-hover:text-[#4a0515]'
              }`}>
                {cat.label}
              </span>
              <span className="text-[10px] text-zinc-400 whitespace-nowrap">
                {cat.sub}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
