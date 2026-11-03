/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { Header } from './components/Header';
import { PromoBanner } from './components/PromoBanner';
import { CategoryBubbles } from './components/CategoryBubbles';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#fdfbf9] text-[#1e1e24] font-sans selection:bg-[#4a0515] selection:text-[#fed7e2]">
        {/* Sticky Header with Brand Wordmark, Mega Menu, Search, Profile, Wishlist & Bag */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 pb-16">
          {/* Flash Sale Banner & Countdown */}
          <PromoBanner />

          {/* Curated Category Bubbles Bar */}
          <CategoryBubbles />

          {/* Product Catalog with Sidebar Filters & Sorting */}
          <ProductGrid />
        </main>

        {/* Modals & Drawers */}
        <ProductDetailModal />
        <CartDrawer />
        <WishlistDrawer />
        <OrderSuccessModal />
        <ToastContainer />

        {/* Myntra-style E-Commerce Footer */}
        <Footer />
      </div>
    </ShopProvider>
  );
}
