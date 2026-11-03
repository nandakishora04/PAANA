export type CategoryType = 'men' | 'women' | 'kids' | 'beauty' | 'footwear' | 'accessories' | 'genz';

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryType;
  subCategory: string; // e.g. "T-Shirts", "Kurtas", "Dresses", "Sneakers", "Cargos"
  gender: 'Men' | 'Women' | 'Kids' | 'Unisex';
  price: number; // Discounted Price in INR (₹)
  originalPrice: number; // MRP in INR (₹)
  discountPercent: number;
  rating: number;
  ratingCount: number;
  images: string[];
  sizes: string[];
  color: string;
  colorHex: string;
  inStock: boolean;
  stockCount: number;
  isTrending?: boolean;
  isFlashDeal?: boolean;
  fastDelivery?: string; // e.g., "Get it by Tomorrow"
  description: string;
  details: string[];
  specifications: Record<string, string>;
  reviews: ProductReview[];
}

export interface CartItem {
  id: string; // unique item cart id (productId_size)
  productId: string;
  product: Product;
  size: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase: number;
}

export interface ShippingAddress {
  fullName: string;
  phoneNumber: string;
  pincode: string;
  addressLine: string;
  city: string;
  state: string;
  addressType: 'Home' | 'Work';
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponDiscount: number;
  total: number;
  address: ShippingAddress;
  paymentMethod: 'COD' | 'UPI' | 'Card';
  status: 'Confirmed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  expectedDelivery: string;
}

export interface FilterState {
  category: CategoryType | 'all';
  subCategory: string | 'all';
  gender: string | 'all';
  priceRange: [number, number];
  brands: string[];
  sizes: string[];
  colors: string[];
  minDiscount: number;
  minRating: number;
  inStockOnly: boolean;
  sortBy: 'recommended' | 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
}
