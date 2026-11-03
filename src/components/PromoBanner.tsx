import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, ShieldCheck, RefreshCw, Zap, Sparkles, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const PromoBanner: React.FC = () => {
  const { setActiveCategory, updateFilters } = useShop();

  // Countdown timer for Flash Sale
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="w-full">
      {/* Grand Hero Campaign Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#3b020f] via-[#4a0515] to-[#701026] text-white shadow-xl">
          {/* Subtle decorative background glow */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#f472b6]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#fb7185]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#fed7e2] text-xs font-semibold tracking-wide border border-white/10">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                FLASH REVOLUTION · LIMITED TIME DROP
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white font-display text-balance">
                FLAT 50% - 80% OFF
              </h1>

              <p className="text-sm sm:text-base text-zinc-200 font-normal leading-relaxed">
                Elevate your everyday wardrobe with Paana originals, luxury street drops, and festive couture at unbeatable prices.
              </p>

              {/* Countdown & CTA */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-xs px-3.5 py-2 rounded-lg border border-white/10 text-xs font-medium">
                  <Clock className="w-4 h-4 text-[#fed7e2]" />
                  <span className="text-zinc-300">Ends in:</span>
                  <span className="font-mono font-bold text-white tabular-nums tracking-wider text-sm">
                    {formatNum(timeLeft.hours)}h : {formatNum(timeLeft.minutes)}m : {formatNum(timeLeft.seconds)}s
                  </span>
                </div>

                <button
                  onClick={() => {
                    setActiveCategory('all');
                    updateFilters({ minDiscount: 50 });
                  }}
                  className="px-6 py-2.5 bg-white text-[#4a0515] hover:bg-[#fed7e2] font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer group"
                >
                  Explore Flash Steals
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Side Visual Cards Showcase */}
            <div className="grid grid-cols-2 gap-3 w-full sm:w-auto shrink-0">
              <div
                onClick={() => setActiveCategory('genz')}
                className="group relative rounded-xl overflow-hidden shadow-lg cursor-pointer aspect-3/4 w-36 sm:w-44 border border-white/10 hover:border-[#f472b6] transition-all transform hover:-translate-y-1"
              >
                <img
                  src="https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Streetwear Drop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#fed7e2]">Paana Studio</span>
                  <span className="text-xs font-extrabold text-white">GEN-Z DROP</span>
                  <span className="text-[11px] text-amber-300 font-bold">Min 55% Off</span>
                </div>
              </div>

              <div
                onClick={() => setActiveCategory('women')}
                className="group relative rounded-xl overflow-hidden shadow-lg cursor-pointer aspect-3/4 w-36 sm:w-44 border border-white/10 hover:border-[#f472b6] transition-all transform hover:-translate-y-1 mt-4 sm:mt-6"
              >
                <img
                  src="https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Festive Couture"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#fed7e2]">Festive Luxe</span>
                  <span className="text-xs font-extrabold text-white">ANARKALIS & SETS</span>
                  <span className="text-[11px] text-amber-300 font-bold">Min 60% Off</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Strip (Myntra Standard) */}
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-zinc-600 bg-white p-3 rounded-xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center gap-2 justify-center py-1">
            <ShieldCheck className="w-4 h-4 text-[#4a0515] shrink-0" />
            <span className="font-semibold text-zinc-800">100% Original Products</span>
          </div>
          <div className="flex items-center gap-2 justify-center py-1">
            <RefreshCw className="w-4 h-4 text-[#4a0515] shrink-0" />
            <span className="font-semibold text-zinc-800">14 Days Easy Returns</span>
          </div>
          <div className="flex items-center gap-2 justify-center py-1">
            <Truck className="w-4 h-4 text-[#4a0515] shrink-0" />
            <span className="font-semibold text-zinc-800">Express Next-Day Delivery</span>
          </div>
          <div className="flex items-center gap-2 justify-center py-1">
            <Sparkles className="w-4 h-4 text-[#4a0515] shrink-0" />
            <span className="font-semibold text-zinc-800">Cash On Delivery Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};
