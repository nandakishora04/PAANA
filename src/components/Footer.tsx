import React from 'react';
import { ShieldCheck, RefreshCw, Truck, Heart, Mail, Phone, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setActiveCategory, updateFilters, setSearchQuery } = useShop();

  const handleQuickSearch = (keyword: string) => {
    setSearchQuery(keyword);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-900 text-zinc-300 pt-12 pb-8 border-t border-zinc-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top 3 Guarantee Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-zinc-800">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-zinc-800 rounded-xl text-[#fed7e2] shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#fed7e2]" />
            </div>
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-xs">
                100% Genuine Guarantee
              </h4>
              <p className="text-zinc-400 mt-1 leading-relaxed">
                Every single item on Paana is directly sourced from certified luxury brands and authorized manufacturers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-zinc-800 rounded-xl text-[#fed7e2] shrink-0">
              <RefreshCw className="w-6 h-6 text-[#fed7e2]" />
            </div>
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-xs">
                14 Days Hassle-Free Returns
              </h4>
              <p className="text-zinc-400 mt-1 leading-relaxed">
                Enjoy instant doorstep pick-ups and same-day UPI/Bank account refunds on all returned orders.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-zinc-800 rounded-xl text-[#fed7e2] shrink-0">
              <Truck className="w-6 h-6 text-[#fed7e2]" />
            </div>
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-xs">
                Lightning Fast Express Delivery
              </h4>
              <p className="text-zinc-400 mt-1 leading-relaxed">
                Next-day express delivery across metro hubs including Bengaluru, Mumbai, Delhi-NCR, Hyderabad & Pune.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 rounded-lg overflow-hidden bg-[#4a0515] px-1 border border-zinc-700 inline-flex items-center">
                <img
                  src="/assets/aistudio/image_c7229e1b.png"
                  alt="Paana"
                  className="h-8 object-contain"
                />
              </div>
            </div>
            <p className="text-zinc-400 max-w-sm leading-relaxed text-xs">
              Paana is India's premium fashion destination delivering bold streetwear, authentic ethnic couture, and signature aesthetics crafted for every moment.
            </p>
            <div className="pt-1 text-[11px] text-zinc-400 space-y-1">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#fed7e2]" /> support@paana.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#fed7e2]" /> 1800-420-PAANA (Toll Free 24/7)
              </p>
            </div>
          </div>

          {/* Online Shopping */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">
              Online Shopping
            </h5>
            <ul className="space-y-2">
              {['men', 'women', 'kids', 'beauty', 'genz', 'footwear'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setActiveCategory(cat);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="text-zinc-400 hover:text-white capitalize transition-colors"
                  >
                    {cat === 'genz' ? 'Paana Studio' : cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Policies */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">
              Customer Policies
            </h5>
            <ul className="space-y-2 text-zinc-400">
              <li><span className="hover:text-white cursor-pointer">Track Your Order</span></li>
              <li><span className="hover:text-white cursor-pointer">Returns & Exchanges</span></li>
              <li><span className="hover:text-white cursor-pointer">Cancellation Policy</span></li>
              <li><span className="hover:text-white cursor-pointer">Shipping FAQs</span></li>
              <li><span className="hover:text-white cursor-pointer">Terms & Conditions</span></li>
              <li><span className="hover:text-white cursor-pointer">Privacy Charter</span></li>
            </ul>
          </div>

          {/* Experience Paana App */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">
              Experience Paana
            </h5>
            <p className="text-zinc-400 text-xs">
              Download the Paana App for exclusive 15-minute flash sales and member-only coupons.
            </p>
            <div className="space-y-2">
              <div className="p-2.5 bg-zinc-800 rounded-lg border border-zinc-700 flex items-center gap-2 cursor-pointer hover:bg-zinc-750">
                <div className="text-left">
                  <p className="text-[10px] text-zinc-400 uppercase">Available on</p>
                  <p className="text-xs font-bold text-white">Google Play Store</p>
                </div>
              </div>
              <div className="p-2.5 bg-zinc-800 rounded-lg border border-zinc-700 flex items-center gap-2 cursor-pointer hover:bg-zinc-750">
                <div className="text-left">
                  <p className="text-[10px] text-zinc-400 uppercase">Download on the</p>
                  <p className="text-xs font-bold text-white">Apple App Store</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Searches Cloud (Myntra standard footer section) */}
        <div className="pt-8 border-t border-zinc-800 space-y-2">
          <p className="font-bold text-zinc-300 uppercase tracking-wider text-[11px]">
            Popular Searches
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-zinc-400">
            {[
              'Oversized Graphic Tees',
              'Parachute Pants',
              'Festive Silk Anarkali Sets',
              'Retro Low Sneakers',
              'Denim Trucker Jackets',
              'Cowl Neck Slip Dresses',
              'Niacinamide Glass Serums',
              'Bauhaus Leather Watches',
              'French Linen Shirts',
              'Korean Pleated Trousers',
              'Kids Organic Sets',
              'Flash Deals Under ₹999',
            ].map((kw, i) => (
              <React.Fragment key={i}>
                <button
                  onClick={() => handleQuickSearch(kw)}
                  className="hover:text-white transition-colors"
                >
                  {kw}
                </button>
                {i < 11 && <span className="text-zinc-600">|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <p>© 2026 www.paana.com. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-[#f472b6] fill-[#f472b6]" /> for the ultimate fashion shopping experience.
          </p>
        </div>
      </div>
    </footer>
  );
};
