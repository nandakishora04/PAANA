import React from 'react';
import { useShop } from '../context/ShopContext';

interface MegaMenuProps {
  category: string;
  onClose: () => void;
}

interface MenuColumn {
  title: string;
  items: string[];
}

export const MEGA_MENU_DATA: Record<string, MenuColumn[]> = {
  men: [
    {
      title: 'Topwear',
      items: ['T-Shirts', 'Casual Shirts', 'Formal Shirts', 'Sweatshirts', 'Jackets', 'Suits'],
    },
    {
      title: 'Bottomwear',
      items: ['Jeans', 'Cargos', 'Casual Trousers', 'Formal Trousers', 'Shorts', 'Track Pants'],
    },
    {
      title: 'Footwear',
      items: ['Casual Shoes', 'Sneakers', 'Sports Shoes', 'Formal Shoes', 'Sandals & Floaters'],
    },
    {
      title: 'Featured Brands',
      items: ['Paana Studio', 'Roadster', 'Highlander', 'HRX by Hrithik', 'Urban Monkey'],
    },
  ],
  women: [
    {
      title: 'Indian & Fusion Wear',
      items: ['Kurtas & Suits', 'Kurtis & Tunics', 'Sarees', 'Ethnic Wear', 'Leggings & Salwars'],
    },
    {
      title: 'Western Wear',
      items: ['Dresses', 'Tops & Tees', 'Trousers & Capris', 'Jeans & Jeggings', 'Co-ords', 'Skirts'],
    },
    {
      title: 'Footwear',
      items: ['Flats', 'Casual Shoes', 'Heels', 'Boots', 'Sports Shoes'],
    },
    {
      title: 'Beauty & Accessories',
      items: ['Lipsticks & Makeup', 'Handbags & Clutches', 'Jewellery', 'Sunglasses', 'Fragrances'],
    },
  ],
  kids: [
    {
      title: "Boys' Clothing",
      items: ['T-Shirts & Polos', 'Shirts', 'Shorts & Jeans', 'Track Pants', 'Ethnic Sets'],
    },
    {
      title: "Girls' Clothing",
      items: ['Dresses & Frocks', 'Tops & Tees', 'Clothing Sets', 'Ethnic Wear', 'Dungarees'],
    },
    {
      title: 'Footwear & Baby Care',
      items: ['Casual Shoes', 'Sandals', 'School Shoes', 'Baby Rompers', 'Accessories'],
    },
    {
      title: 'Top Character Merch',
      items: ['Marvel Avengers', 'Disney Princess', 'Batman', 'PAW Patrol', 'Looney Tunes'],
    },
  ],
  beauty: [
    {
      title: 'Skincare',
      items: ['Face Moisturizer', 'Cleanser & Face Wash', 'Sunscreen SPF 50', 'Serums & Essences', 'Eye Creams'],
    },
    {
      title: 'Makeup Essentials',
      items: ['Lipstick & Gloss', 'Mascara & Eyeliner', 'Foundation & BB Cream', 'Blush & Highlighters'],
    },
    {
      title: 'Haircare & Body',
      items: ['Shampoo & Conditioner', 'Hair Oils & Serums', 'Body Wash & Lotions', 'Perfumes & Deos'],
    },
    {
      title: 'Trending Brands',
      items: ['Paana Glow Lab', 'Minimalist', 'The Derma Co', 'Maybelline', 'Plum Goodness'],
    },
  ],
  genz: [
    {
      title: 'Cyber & Streetwear',
      items: ['Heavyweight Boxy Tees', 'Parachute Pants', 'Drop Shoulder Hoodies', 'Oversized Flannels'],
    },
    {
      title: 'Aesthetic Fits',
      items: ['Y2K Grunge', 'Minimalist Chic', 'Gorpcore Utility', 'Skater Vibe', 'Old Money Luxe'],
    },
    {
      title: 'Sneakers & Drip',
      items: ['Chunky Platform Kicks', 'Retro Court Lows', 'Tote Bags', 'Silver Statement Chains'],
    },
    {
      title: 'Drop Radar',
      items: ['Limited Drops', 'Collabs', 'Under ₹999 Picks', 'Trending on Paana Studio'],
    },
  ],
};

export const MegaMenu: React.FC<MegaMenuProps> = ({ category, onClose }) => {
  const { setActiveCategory, updateFilters, setSearchQuery } = useShop();
  const columns = MEGA_MENU_DATA[category];

  if (!columns) return null;

  const handleItemClick = (item: string) => {
    setActiveCategory(category);
    // If the item matches a subcategory or search
    if (['T-Shirts', 'Kurtas', 'Dresses', 'Sneakers', 'Cargos', 'Watches', 'Shirts', 'Jackets'].some(c => item.includes(c))) {
      updateFilters({ subCategory: item });
    } else {
      setSearchQuery(item);
    }
    onClose();
  };

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white border-b border-zinc-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150"
    >
      <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-4 gap-8">
        {columns.map((col, idx) => (
          <div key={idx} className="space-y-3">
            <h4 className="text-xs font-bold text-[#4a0515] uppercase tracking-wider pb-1 border-b border-zinc-100">
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <button
                    onClick={() => handleItemClick(item)}
                    className="text-xs text-zinc-600 hover:text-[#4a0515] hover:font-semibold transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
