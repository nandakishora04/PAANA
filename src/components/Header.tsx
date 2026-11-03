import React, { useState, useRef, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, X, ChevronDown, Menu, Sparkles, Tag, ShieldCheck, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { MegaMenu } from './MegaMenu';
import { TRENDING_SEARCHES } from '../data/mockData';

export const Header: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    cartSummary,
    wishlist,
    setCartDrawerOpen,
    setWishlistDrawerOpen,
    resetFilters,
    products,
    setSelectedProduct,
    orders,
  } = useShop();

  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTopTicker, setShowTopTicker] = useState(true);

  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navCategories = [
    { id: 'men', label: 'MEN' },
    { id: 'women', label: 'WOMEN' },
    { id: 'kids', label: 'KIDS' },
    { id: 'beauty', label: 'BEAUTY' },
    { id: 'genz', label: 'PAANA STUDIO' },
    { id: 'footwear', label: 'FOOTWEAR' },
  ];

  // Search quick suggestions
  const searchSuggestions = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-zinc-200/80 shadow-xs">
      {/* Top Banner Ticker */}
      {showTopTicker && (
        <div className="bg-[#4a0515] text-[#fed7e2] text-xs font-medium py-1.5 px-4 flex items-center justify-between transition-all">
          <div className="flex-1 flex items-center justify-center gap-2 text-center overflow-hidden">
            <span className="flex items-center gap-1 font-semibold text-white">
              <Sparkles className="w-3.5 h-3.5 text-[#f472b6]" />
              PAANA FLASH FEST:
            </span>
            <span className="truncate">Use code <strong className="text-white underline tracking-wider">PAANANEW</strong> for flat ₹500 off on ₹1,499+</span>
            <span className="hidden md:inline text-zinc-300">·</span>
            <span className="hidden md:flex items-center gap-1 text-zinc-200">
              <Truck className="w-3 h-3 text-[#f472b6]" /> Free Express Shipping on Orders ₹799+
            </span>
          </div>
          <button
            onClick={() => setShowTopTicker(false)}
            aria-label="Dismiss banner"
            className="text-zinc-300 hover:text-white p-0.5 ml-2 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 md:gap-8">
        {/* Left: Mobile Menu Trigger & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-700 hover:text-[#4a0515] rounded-md transition-colors"
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Paana Logo using uploaded asset */}
          <button
            onClick={() => {
              resetFilters();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group focus:outline-hidden"
          >
            <div className="h-10 md:h-11 rounded-lg overflow-hidden border border-[#4a0515]/20 shadow-xs flex items-center justify-center bg-[#4a0515] px-1 hover:opacity-95 transition-opacity">
              <img
                src="/assets/aistudio/image_c7229e1b.png"
                alt="Paana Brand Logo"
                referrerPolicy="no-referrer"
                className="h-8 md:h-9 object-contain"
              />
            </div>
          </button>
        </div>

        {/* Center-Left: Desktop Mega Menu Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 h-full text-xs lg:text-[13px] font-bold tracking-wider text-zinc-800">
          <button
            onClick={() => {
              resetFilters();
            }}
            className={`h-full px-3 flex items-center border-b-2 transition-all ${
              activeCategory === 'all' && !searchQuery
                ? 'border-[#4a0515] text-[#4a0515]'
                : 'border-transparent text-zinc-700 hover:text-[#4a0515] hover:border-zinc-300'
            }`}
          >
            ALL
          </button>

          {navCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <div
                key={cat.id}
                className="h-full flex items-center"
                onMouseEnter={() => setHoveredCategory(cat.id)}
              >
                <button
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setHoveredCategory(null);
                  }}
                  className={`h-full px-3 flex items-center border-b-2 transition-all cursor-pointer ${
                    isActive
                      ? 'border-[#4a0515] text-[#4a0515]'
                      : 'border-transparent text-zinc-700 hover:text-[#4a0515] hover:border-zinc-300'
                  }`}
                >
                  {cat.label}
                  {cat.id === 'genz' && (
                    <span className="ml-1 text-[9px] font-extrabold uppercase px-1 py-0.2 bg-[#4a0515] text-[#fed7e2] rounded-xs">
                      HOT
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </nav>

        {/* Center: Search Bar with Autocomplete Dropdown */}
        <div ref={searchRef} className="flex-1 max-w-md relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search for clothes, sneakers, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              className="w-full pl-10 pr-9 py-2 bg-zinc-100/80 hover:bg-zinc-100 focus:bg-white text-xs md:text-sm text-zinc-900 placeholder:text-zinc-400 rounded-lg border border-transparent focus:border-[#4a0515] focus:ring-1 focus:ring-[#4a0515] transition-all outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-0.5 text-zinc-400 hover:text-zinc-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete / Trending searches panel */}
          {searchFocused && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-lg shadow-xl border border-zinc-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              {searchQuery.trim() ? (
                <div>
                  <div className="px-3.5 py-2 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider bg-zinc-50 border-b border-zinc-100">
                    Matching Products
                  </div>
                  {searchSuggestions.length > 0 ? (
                    <div className="divide-y divide-zinc-100">
                      {searchSuggestions.map((prod) => (
                        <button
                          key={prod.id}
                          onClick={() => {
                            setSelectedProduct(prod);
                            setSearchFocused(false);
                          }}
                          className="w-full px-3.5 py-2.5 flex items-center gap-3 hover:bg-zinc-50 text-left transition-colors"
                        >
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-9 h-12 object-cover rounded bg-zinc-100 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-zinc-900 truncate">
                              {prod.brand}
                            </p>
                            <p className="text-xs text-zinc-600 truncate">{prod.name}</p>
                            <p className="text-xs font-semibold text-[#4a0515] tabular-nums">
                              ₹{prod.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-zinc-500">
                      No exact matches found for "{searchQuery}". Try "T-Shirts" or "Kurtas".
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#4a0515]" />
                    Trending on Paana
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {TRENDING_SEARCHES.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchQuery(item);
                          setSearchFocused(false);
                        }}
                        className="text-xs px-2.5 py-1 bg-zinc-100 hover:bg-[#4a0515] hover:text-white rounded-md text-zinc-700 transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: User Actions (Profile, Wishlist, Bag) */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          {/* User Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex flex-col items-center justify-center text-zinc-700 hover:text-[#4a0515] group py-1"
              aria-label="User account"
            >
              <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold tracking-wider mt-0.5 hidden sm:block">
                PROFILE
              </span>
            </button>

            {/* Profile Popover */}
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-zinc-200 p-4 z-50 animate-in fade-in duration-150">
                <div className="pb-3 border-b border-zinc-100">
                  <p className="text-xs font-semibold text-zinc-500">Welcome to Paana</p>
                  <p className="text-sm font-bold text-zinc-900">Fashion Explorer</p>
                  <div className="mt-2 text-[11px] bg-[#fed7e2]/60 text-[#4a0515] font-semibold px-2 py-1 rounded-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#4a0515]" /> Paana Insider Silver Tier
                  </div>
                </div>

                <div className="py-2 space-y-1">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      setCartDrawerOpen(true);
                    }}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-700 hover:text-[#4a0515] hover:bg-zinc-50 rounded-md font-medium"
                  >
                    My Bag ({cartSummary.itemCount})
                  </button>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      setWishlistDrawerOpen(true);
                    }}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-700 hover:text-[#4a0515] hover:bg-zinc-50 rounded-md font-medium"
                  >
                    Wishlist ({wishlist.length})
                  </button>
                  <div className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-700 hover:text-[#4a0515] hover:bg-zinc-50 rounded-md font-medium">
                    Orders Placed ({orders.length})
                  </div>
                  <div className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-700 hover:text-[#4a0515] hover:bg-zinc-50 rounded-md font-medium">
                    Saved Addresses & Cards
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-100 text-[11px] text-zinc-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Secure Checkout
                </div>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={() => setWishlistDrawerOpen(true)}
            className="flex flex-col items-center justify-center text-zinc-700 hover:text-[#4a0515] relative group py-1"
            aria-label="Wishlist"
          >
            <div className="relative">
              <Heart className="w-5 h-5 group-hover:scale-110 group-hover:fill-[#4a0515] group-hover:text-[#4a0515] transition-all" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#4a0515] text-[#fed7e2] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold tracking-wider mt-0.5 hidden sm:block">
              WISHLIST
            </span>
          </button>

          {/* Shopping Bag / Cart */}
          <button
            onClick={() => setCartDrawerOpen(true)}
            className="flex flex-col items-center justify-center text-zinc-700 hover:text-[#4a0515] relative group py-1"
            aria-label="Shopping Bag"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartSummary.itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#4a0515] text-[#fed7e2] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {cartSummary.itemCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold tracking-wider mt-0.5 hidden sm:block">
              BAG
            </span>
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Floating Dropdown */}
      {hoveredCategory && (
        <MegaMenu
          category={hoveredCategory}
          onClose={() => setHoveredCategory(null)}
        />
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <div className="p-4 bg-[#4a0515] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/aistudio/image_c7229e1b.png"
                  alt="Paana"
                  className="h-8 object-contain rounded"
                />
                <span className="text-xs text-[#fed7e2] font-semibold">Fashion for All</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-zinc-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-2 divide-y divide-zinc-100">
              <div className="py-2">
                <button
                  onClick={() => {
                    resetFilters();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm font-bold text-zinc-900 hover:bg-zinc-50"
                >
                  All Collections
                </button>
                {navCategories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveCategory(c.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm font-semibold flex items-center justify-between hover:bg-zinc-50 ${
                      activeCategory === c.id ? 'text-[#4a0515] font-bold bg-[#fed7e2]/20' : 'text-zinc-700'
                    }`}
                  >
                    <span>{c.label}</span>
                    {c.id === 'genz' && (
                      <span className="text-[10px] bg-[#4a0515] text-white px-1.5 py-0.5 rounded-sm">HOT</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="p-4 space-y-2">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Quick Links</p>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setWishlistDrawerOpen(true);
                  }}
                  className="flex items-center gap-2 text-sm text-zinc-700 hover:text-[#4a0515] py-1"
                >
                  <Heart className="w-4 h-4 text-[#4a0515]" /> My Wishlist ({wishlist.length})
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCartDrawerOpen(true);
                  }}
                  className="flex items-center gap-2 text-sm text-zinc-700 hover:text-[#4a0515] py-1"
                >
                  <ShoppingBag className="w-4 h-4 text-[#4a0515]" /> Shopping Bag ({cartSummary.itemCount})
                </button>
              </div>
            </div>

            <div className="p-4 border-t border-zinc-200 text-xs text-zinc-500">
              <p className="font-semibold text-zinc-800">Paana Fashion Store</p>
              <p className="text-[11px] text-zinc-400">100% Original Products Guaranteed</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
