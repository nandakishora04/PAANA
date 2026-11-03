import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, WishlistItem, Coupon, Order, FilterState, ShippingAddress } from '../types';
import { PRODUCTS, COUPONS } from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface ShopContextType {
  products: Product[];
  filteredProducts: Product[];
  cart: CartItem[];
  wishlist: WishlistItem[];
  cartDrawerOpen: boolean;
  wishlistDrawerOpen: boolean;
  selectedProduct: Product | null;
  activeCategory: string;
  searchQuery: string;
  appliedCoupon: Coupon | null;
  filters: FilterState;
  orders: Order[];
  lastOrder: Order | null;
  toasts: Toast[];

  // Actions
  setCartDrawerOpen: (open: boolean) => void;
  setWishlistDrawerOpen: (open: boolean) => void;
  setSelectedProduct: (product: Product | null) => void;
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  updateFilters: (updates: Partial<FilterState>) => void;
  resetFilters: () => void;
  
  // Cart Actions
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // Wishlist Actions
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product, size: string) => void;
  
  // Checkout & Orders
  checkout: (address: ShippingAddress, paymentMethod: 'COD' | 'UPI' | 'Card') => Order;
  closeOrderModal: () => void;
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Pricing calculations
  cartSummary: {
    totalMRP: number;
    discountOnMRP: number;
    couponDiscount: number;
    shippingFee: number;
    totalAmount: number;
    itemCount: number;
  };
}

const initialFilters: FilterState = {
  category: 'all',
  subCategory: 'all',
  gender: 'all',
  priceRange: [0, 10000],
  brands: [],
  sizes: [],
  colors: [],
  minDiscount: 0,
  minRating: 0,
  inStockOnly: false,
  sortBy: 'recommended',
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('paana_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('paana_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('paana_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('paana_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('paana_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('paana_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateFilters = (updates: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setActiveCategory('all');
    setSearchQuery('');
  };

  // Cart operations
  const addToCart = (product: Product, size: string, quantity = 1) => {
    const cartItemId = `${product.id}_${size}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: cartItemId, productId: product.id, product, size, quantity }];
    });
    addToast(`Added "${product.name.slice(0, 24)}..." (Size: ${size}) to Bag!`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    addToast('Item removed from Bag', 'info');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Wishlist operations
  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.productId === productId);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      setWishlist((prev) => prev.filter((item) => item.productId !== product.id));
      addToast('Removed from Wishlist', 'info');
    } else {
      setWishlist((prev) => [
        ...prev,
        { productId: product.id, product, addedAt: new Date().toISOString() },
      ]);
      addToast('Saved to Wishlist ❤️');
    }
  };

  const moveToCartFromWishlist = (product: Product, size: string) => {
    addToCart(product, size, 1);
    setWishlist((prev) => prev.filter((item) => item.productId !== product.id));
  };

  // Coupon handling
  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = COUPONS.find((c) => c.code === cleanCode);
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code. Try PAANANEW or FLASH25' };
    }

    const currentSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    if (currentSubtotal < coupon.minPurchase) {
      return {
        success: false,
        message: `Min order value for ${coupon.code} is ₹${coupon.minPurchase}. Add more items!`,
      };
    }

    setAppliedCoupon(coupon);
    addToast(`Coupon "${coupon.code}" applied successfully!`);
    return { success: true, message: `Coupon ${coupon.code} applied!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  // Cart Price Summary calculation
  const totalMRP = cart.reduce((sum, item) => sum + item.product.originalPrice * item.quantity, 0);
  const currentSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountOnMRP = totalMRP - currentSubtotal;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  let couponDiscount = 0;
  if (appliedCoupon && currentSubtotal >= appliedCoupon.minPurchase) {
    if (appliedCoupon.discountType === 'percentage') {
      couponDiscount = Math.round((currentSubtotal * appliedCoupon.discountValue) / 100);
      if (appliedCoupon.code === 'FLASH25' && couponDiscount > 800) {
        couponDiscount = 800;
      }
    } else {
      couponDiscount = appliedCoupon.discountValue;
    }
  }

  const shippingFee = currentSubtotal > 799 || appliedCoupon?.code === 'FREESHIP' ? 0 : 79;
  const totalAmount = Math.max(0, currentSubtotal - couponDiscount + shippingFee);

  const cartSummary = {
    totalMRP,
    discountOnMRP,
    couponDiscount,
    shippingFee,
    totalAmount,
    itemCount,
  };

  // Checkout handling
  const checkout = (address: ShippingAddress, paymentMethod: 'COD' | 'UPI' | 'Card'): Order => {
    const newOrder: Order = {
      id: `PAANA-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      items: [...cart],
      subtotal: currentSubtotal,
      discount: discountOnMRP,
      couponDiscount,
      total: totalAmount,
      address,
      paymentMethod,
      status: 'Confirmed',
      expectedDelivery: 'Tomorrow, by 8:00 PM',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    setCart([]);
    setAppliedCoupon(null);
    setCartDrawerOpen(false);
    addToast('Order Placed Successfully! 🎉');
    return newOrder;
  };

  const closeOrderModal = () => {
    setLastOrder(null);
  };

  // Filtered and Sorted products
  const filteredProducts = products.filter((p) => {
    // Category check
    if (activeCategory !== 'all' && p.category !== activeCategory) {
      return false;
    }
    if (filters.category !== 'all' && p.category !== filters.category) {
      return false;
    }
    // Subcategory check
    if (filters.subCategory !== 'all' && p.subCategory !== filters.subCategory) {
      return false;
    }
    // Gender check
    if (filters.gender !== 'all' && p.gender !== filters.gender && p.gender !== 'Unisex') {
      return false;
    }
    // Search query check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q);
      if (!match) return false;
    }
    // Price range
    if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) {
      return false;
    }
    // Brand
    if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) {
      return false;
    }
    // Sizes
    if (filters.sizes.length > 0 && !filters.sizes.some((s) => p.sizes.includes(s))) {
      return false;
    }
    // Min discount
    if (filters.minDiscount > 0 && p.discountPercent < filters.minDiscount) {
      return false;
    }
    // Min rating
    if (filters.minRating > 0 && p.rating < filters.minRating) {
      return false;
    }
    // In stock
    if (filters.inStockOnly && !p.inStock) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'discount':
        return b.discountPercent - a.discountPercent;
      case 'newest':
        return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
      case 'recommended':
      default:
        return (b.rating * b.ratingCount) - (a.rating * a.ratingCount);
    }
  });

  return (
    <ShopContext.Provider
      value={{
        products,
        filteredProducts,
        cart,
        wishlist,
        cartDrawerOpen,
        wishlistDrawerOpen,
        selectedProduct,
        activeCategory,
        searchQuery,
        appliedCoupon,
        filters,
        orders,
        lastOrder,
        toasts,
        setCartDrawerOpen,
        setWishlistDrawerOpen,
        setSelectedProduct,
        setActiveCategory,
        setSearchQuery,
        updateFilters,
        resetFilters,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        applyCoupon,
        removeCoupon,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        checkout,
        closeOrderModal,
        addToast,
        removeToast,
        cartSummary,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
