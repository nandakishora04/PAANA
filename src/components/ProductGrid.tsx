import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, X, Grid3X3, LayoutGrid, Check, RotateCcw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const ProductGrid: React.FC = () => {
  const {
    filteredProducts,
    filters,
    updateFilters,
    resetFilters,
    activeCategory,
    setActiveCategory,
    products,
  } = useShop();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [columns, setColumns] = useState<'normal' | 'dense'>('normal');

  // Extract unique brands and subcategories for filter sidebar
  const allBrands = Array.from(new Set(products.map((p) => p.brand)));
  const allSubCategories = Array.from(new Set(products.map((p) => p.subCategory)));

  const handleBrandToggle = (brand: string) => {
    const exists = filters.brands.includes(brand);
    const updated = exists
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    updateFilters({ brands: updated });
  };

  const handlePriceTier = (min: number, max: number) => {
    updateFilters({ priceRange: [min, max] });
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.subCategory !== 'all' ||
    filters.gender !== 'all' ||
    filters.brands.length > 0 ||
    filters.minDiscount > 0 ||
    filters.minRating > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 10000;

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header & Sort Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
            <span
              onClick={resetFilters}
              className="hover:text-[#4a0515] cursor-pointer"
            >
              Home
            </span>
            <span>/</span>
            <span className="capitalize text-zinc-800 font-semibold">
              {activeCategory === 'all' ? 'All Collections' : activeCategory}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 font-display flex items-baseline gap-2">
            <span>
              {activeCategory === 'all'
                ? 'All Fashion & Apparel'
                : activeCategory.toUpperCase()}
            </span>
            <span className="text-sm font-medium text-zinc-500 tabular-nums">
              ({filteredProducts.length} items)
            </span>
          </h2>
        </div>

        {/* Controls: Mobile Filter Toggle + Desktop Sort + View mode */}
        <div className="flex items-center justify-between md:justify-end gap-3 flex-wrap">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-zinc-100 rounded-lg text-xs font-bold text-zinc-800"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters {hasActiveFilters && '•'}
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-zinc-500 hidden sm:inline">
              Sort by:
            </span>
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  updateFilters({ sortBy: e.target.value as any })
                }
                className="appearance-none bg-white border border-zinc-300 hover:border-zinc-400 text-xs font-bold text-zinc-800 py-2 pl-3 pr-8 rounded-lg cursor-pointer focus:outline-hidden focus:border-[#4a0515]"
              >
                <option value="recommended">Recommended</option>
                <option value="newest">What's New</option>
                <option value="rating">Customer Rating</option>
                <option value="discount">Better Discount</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Desktop Grid Layout Switcher */}
          <div className="hidden lg:flex items-center border border-zinc-200 rounded-lg p-0.5 bg-zinc-50">
            <button
              onClick={() => setColumns('normal')}
              aria-label="3 columns grid"
              className={`p-1.5 rounded-md transition-colors ${
                columns === 'normal'
                  ? 'bg-white shadow-xs text-[#4a0515]'
                  : 'text-zinc-400 hover:text-zinc-700'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setColumns('dense')}
              aria-label="4 columns grid"
              className={`p-1.5 rounded-md transition-colors ${
                columns === 'dense'
                  ? 'bg-white shadow-xs text-[#4a0515]'
                  : 'text-zinc-400 hover:text-zinc-700'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips / Pills with clean dismiss */}
      {hasActiveFilters && (
        <div className="pt-3 pb-1 flex items-center gap-2 flex-wrap text-xs">
          <span className="text-zinc-400 font-semibold text-[11px] uppercase tracking-wider">
            Active Filters:
          </span>

          {filters.subCategory !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-md font-medium">
              {filters.subCategory}
              <button
                onClick={() => updateFilters({ subCategory: 'all' })}
                className="hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.brands.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-md font-medium"
            >
              {b}
              <button
                onClick={() => handleBrandToggle(b)}
                className="hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.minDiscount > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-md font-medium">
              {filters.minDiscount}%+ Off
              <button
                onClick={() => updateFilters({ minDiscount: 0 })}
                className="hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.minRating > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-md font-medium">
              {filters.minRating}★ & above
              <button
                onClick={() => updateFilters({ minRating: 0 })}
                className="hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={resetFilters}
            className="text-[11px] font-bold text-[#4a0515] hover:underline flex items-center gap-1 ml-auto"
          >
            <RotateCcw className="w-3 h-3" /> Clear All Filters
          </button>
        </div>
      )}

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* Left Filter Sidebar (Desktop) */}
        <aside className="hidden md:block col-span-1 space-y-6 pr-4 border-r border-zinc-200/80">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#4a0515]" />
              Filters
            </h3>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-[#4a0515] hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              Category
            </h4>
            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
              <label className="flex items-center gap-2 text-xs text-zinc-700 hover:text-[#4a0515] cursor-pointer">
                <input
                  type="radio"
                  name="sidebar-cat"
                  checked={filters.subCategory === 'all'}
                  onChange={() => updateFilters({ subCategory: 'all' })}
                  className="accent-[#4a0515]"
                />
                <span>All Categories</span>
              </label>
              {allSubCategories.map((sub) => (
                <label
                  key={sub}
                  className="flex items-center gap-2 text-xs text-zinc-700 hover:text-[#4a0515] cursor-pointer"
                >
                  <input
                    type="radio"
                    name="sidebar-cat"
                    checked={filters.subCategory === sub}
                    onChange={() => updateFilters({ subCategory: sub })}
                    className="accent-[#4a0515]"
                  />
                  <span>{sub}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands Filter */}
          <div className="space-y-2 pt-4 border-t border-zinc-100">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              Brands
            </h4>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {allBrands.map((brand) => {
                const checked = filters.brands.includes(brand);
                return (
                  <label
                    key={brand}
                    className="flex items-center gap-2 text-xs text-zinc-700 hover:text-[#4a0515] cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleBrandToggle(brand)}
                      className="accent-[#4a0515] rounded-xs"
                    />
                    <span className="truncate">{brand}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2 pt-4 border-t border-zinc-100">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              Price Range
            </h4>
            <div className="space-y-1.5 text-xs text-zinc-700">
              <button
                onClick={() => handlePriceTier(0, 999)}
                className={`w-full text-left py-1 px-2 rounded-md transition-colors ${
                  filters.priceRange[0] === 0 && filters.priceRange[1] === 999
                    ? 'bg-[#fed7e2]/50 font-bold text-[#4a0515]'
                    : 'hover:bg-zinc-100'
                }`}
              >
                Under ₹999
              </button>
              <button
                onClick={() => handlePriceTier(1000, 1999)}
                className={`w-full text-left py-1 px-2 rounded-md transition-colors ${
                  filters.priceRange[0] === 1000 && filters.priceRange[1] === 1999
                    ? 'bg-[#fed7e2]/50 font-bold text-[#4a0515]'
                    : 'hover:bg-zinc-100'
                }`}
              >
                ₹1,000 - ₹1,999
              </button>
              <button
                onClick={() => handlePriceTier(2000, 3999)}
                className={`w-full text-left py-1 px-2 rounded-md transition-colors ${
                  filters.priceRange[0] === 2000 && filters.priceRange[1] === 3999
                    ? 'bg-[#fed7e2]/50 font-bold text-[#4a0515]'
                    : 'hover:bg-zinc-100'
                }`}
              >
                ₹2,000 - ₹3,999
              </button>
              <button
                onClick={() => handlePriceTier(4000, 15000)}
                className={`w-full text-left py-1 px-2 rounded-md transition-colors ${
                  filters.priceRange[0] === 4000
                    ? 'bg-[#fed7e2]/50 font-bold text-[#4a0515]'
                    : 'hover:bg-zinc-100'
                }`}
              >
                ₹4,000 and Above
              </button>
            </div>
          </div>

          {/* Discount Range */}
          <div className="space-y-2 pt-4 border-t border-zinc-100">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              Discount
            </h4>
            <div className="space-y-1.5 text-xs text-zinc-700">
              {[10, 30, 50, 60].map((disc) => (
                <label
                  key={disc}
                  className="flex items-center gap-2 cursor-pointer hover:text-[#4a0515]"
                >
                  <input
                    type="radio"
                    name="discount"
                    checked={filters.minDiscount === disc}
                    onChange={() => updateFilters({ minDiscount: disc })}
                    className="accent-[#4a0515]"
                  />
                  <span>{disc}% and above</span>
                </label>
              ))}
            </div>
          </div>

          {/* Customer Rating */}
          <div className="space-y-2 pt-4 border-t border-zinc-100">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              Customer Rating
            </h4>
            <div className="space-y-1.5 text-xs text-zinc-700">
              {[4.5, 4.0].map((rate) => (
                <label
                  key={rate}
                  className="flex items-center gap-2 cursor-pointer hover:text-[#4a0515]"
                >
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.minRating === rate}
                    onChange={() => updateFilters({ minRating: rate })}
                    className="accent-[#4a0515]"
                  />
                  <span>{rate}★ and above</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Cards Grid Area */}
        <div className="col-span-1 md:col-span-3 lg:col-span-4">
          {filteredProducts.length > 0 ? (
            <div
              className={`grid grid-cols-2 ${
                columns === 'dense'
                  ? 'sm:grid-cols-3 lg:grid-cols-4'
                  : 'sm:grid-cols-3 lg:grid-cols-3'
              } gap-3 sm:gap-6`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-white rounded-2xl border border-zinc-200 p-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-4">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900">
                No styles match your filter selection
              </h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1 mb-6">
                Try widening your price range, clearing specific brand filters, or exploring all Paana categories.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-[#4a0515] hover:bg-[#60081d] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <div className="p-4 bg-zinc-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#fed7e2]" />
                <span className="font-bold text-sm">Filter Catalog</span>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Category */}
              <div>
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                  Category
                </h4>
                <div className="space-y-1.5">
                  {allSubCategories.map((sub) => (
                    <label
                      key={sub}
                      className="flex items-center gap-2 text-xs text-zinc-700"
                    >
                      <input
                        type="radio"
                        name="mob-cat"
                        checked={filters.subCategory === sub}
                        onChange={() => updateFilters({ subCategory: sub })}
                        className="accent-[#4a0515]"
                      />
                      <span>{sub}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="pt-4 border-t border-zinc-100">
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                  Brands
                </h4>
                <div className="space-y-1.5">
                  {allBrands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 text-xs text-zinc-700"
                    >
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        className="accent-[#4a0515]"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-zinc-200 bg-zinc-50 flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-2 text-xs font-bold text-zinc-700 border border-zinc-300 rounded-lg hover:bg-zinc-100"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2 text-xs font-bold text-white bg-[#4a0515] rounded-lg shadow-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
