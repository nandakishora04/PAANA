import { Product, Coupon } from '../types';

export const COUPONS: Coupon[] = [
  {
    code: 'PAANANEW',
    description: 'Flat ₹500 off on your first order above ₹1,499',
    discountType: 'fixed',
    discountValue: 500,
    minPurchase: 1499,
  },
  {
    code: 'FLASH25',
    description: '25% Instant discount on orders above ₹1,999 (up to ₹800)',
    discountType: 'percentage',
    discountValue: 25,
    minPurchase: 1999,
  },
  {
    code: 'PAANA10',
    description: '10% Extra savings on all fashion apparel',
    discountType: 'percentage',
    discountValue: 10,
    minPurchase: 799,
  },
  {
    code: 'FREESHIP',
    description: 'Free expedited delivery on all orders',
    discountType: 'fixed',
    discountValue: 99,
    minPurchase: 499,
  },
];

export const CATEGORIES_LIST = [
  { id: 'all', name: 'All Drops', count: '24+ Styles' },
  { id: 'men', name: 'Men', count: '12,400+ Items' },
  { id: 'women', name: 'Women', count: '18,900+ Items' },
  { id: 'genz', name: 'Paana Studio', count: 'Gen-Z Trends' },
  { id: 'footwear', name: 'Footwear', count: 'Sneakers & More' },
  { id: 'beauty', name: 'Beauty', count: 'Skincare & Scents' },
  { id: 'kids', name: 'Kids', count: 'Mini Styles' },
];

export const TRENDING_SEARCHES = [
  'Oversized Graphic Tees',
  'Cargo Pants',
  'Retro Sneakers',
  'Floral Anarkali Kurtas',
  'Denim Trucker Jackets',
  'Slip Maxi Dresses',
  'Minimalist Watches',
  'Chunky Loafers',
];

export const PRODUCTS: Product[] = [
  {
    id: 'p-1',
    name: 'Heavyweight Boxy Drop-Shoulder Graphic Tee',
    brand: 'PAANA STUDIO',
    category: 'genz',
    subCategory: 'T-Shirts',
    gender: 'Unisex',
    price: 899,
    originalPrice: 1999,
    discountPercent: 55,
    rating: 4.6,
    ratingCount: 3420,
    images: [
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/8532617/pexels-photo-8532617.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    color: 'Vintage Burgundy',
    colorHex: '#4a0515',
    inStock: true,
    stockCount: 14,
    isTrending: true,
    isFlashDeal: true,
    fastDelivery: 'Tomorrow, by 11 AM',
    description: 'Crafted from 280 GSM combed cotton with an oversized boxy streetwear drape, ribbed collar, and signature Paana puff screenprint detailing.',
    details: [
      '100% Combed Heavy Cotton (280 GSM)',
      'Pre-shrunk fabric with bio-wash finish',
      'Drop-shoulder relaxed street fit',
      'Machine wash cold, do not iron on print'
    ],
    specifications: {
      'Fit': 'Oversized Boxy Fit',
      'Neck': 'Ribbed Crew Neck',
      'Pattern': 'Typography Puff Print',
      'Sleeve Length': 'Short Sleeves',
      'Origin': 'Made in India'
    },
    reviews: [
      {
        id: 'r-1',
        userName: 'Aarav Sharma',
        rating: 5,
        date: '28 Oct 2026',
        comment: 'The 280 GSM weight is unreal! Feels like international luxury streetwear at an affordable price.',
        verified: true,
        helpfulCount: 88,
      },
      {
        id: 'r-2',
        userName: 'Priya K.',
        rating: 4,
        date: '22 Oct 2026',
        comment: 'Great oversized fit, ordered M and it draped perfectly over bike shorts.',
        verified: true,
        helpfulCount: 41,
      }
    ]
  },
  {
    id: 'p-2',
    name: 'Embroidered Silk Blend Anarkali Kurta Set with Dupatta',
    brand: 'ANOUK ETHNIC',
    category: 'women',
    subCategory: 'Kurtas & Sets',
    gender: 'Women',
    price: 2499,
    originalPrice: 6999,
    discountPercent: 64,
    rating: 4.8,
    ratingCount: 4890,
    images: [
      'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1055694/pexels-photo-1055694.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Blush Wine Pink',
    colorHex: '#f472b6',
    inStock: true,
    stockCount: 8,
    isTrending: true,
    fastDelivery: '2 Days',
    description: 'Breathtaking festive Anarkali set featuring intricate gota-patti yoke embroidery, kalidar flare, matching cigarette trousers, and an organza printed dupatta.',
    details: [
      'Silk blend fabric with butter crepe lining',
      'Intricate zari and sequin hand embellishment',
      'Side zipper closure with drawstring waist',
      'Dry clean recommended'
    ],
    specifications: {
      'Kurta Fabric': 'Chanderi Silk Blend',
      'Bottom Fabric': 'Santoon Blend',
      'Dupatta Fabric': 'Organza with scalloped border',
      'Weave Type': 'Machine Weave with Hand Embroidery',
      'Occasion': 'Festive & Wedding Guest'
    },
    reviews: [
      {
        id: 'r-3',
        userName: 'Neha Singhal',
        rating: 5,
        date: '15 Oct 2026',
        comment: 'Looked so royal for Diwali festivities! Got endless compliments.',
        verified: true,
        helpfulCount: 125,
      }
    ]
  },
  {
    id: 'p-3',
    name: 'Multi-Pocket Tactical Parachute Cargo Pants',
    brand: 'ROADSTER OUTDOORS',
    category: 'men',
    subCategory: 'Cargos',
    gender: 'Men',
    price: 1399,
    originalPrice: 3299,
    discountPercent: 57,
    rating: 4.5,
    ratingCount: 1980,
    images: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7679721/pexels-photo-7679721.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['28', '30', '32', '34', '36'],
    color: 'Matte Olive Sage',
    colorHex: '#526649',
    inStock: true,
    stockCount: 19,
    isTrending: true,
    isFlashDeal: true,
    fastDelivery: 'Tomorrow, by 2 PM',
    description: 'Utility meets modern streetwear: 6 functional cargo flap pockets, adjustable toggle bungee hems, and relaxed tapered leg contour.',
    details: [
      'Cotton twill ripstop blend for rugged wear',
      'Elasticated waistband with built-in nylon webbing belt',
      'Bungee cord adjustable ankle hems for taper styling',
      'Machine wash warm with like colors'
    ],
    specifications: {
      'Fit': 'Relaxed Parachute Fit',
      'Waist Rise': 'Mid Rise',
      'Closure': 'Drawstring & Buckle',
      'Pocket Style': '6 Multi-functional Utility Pockets',
      'Stretch': 'Slight Mechanical Stretch'
    },
    reviews: [
      {
        id: 'r-4',
        userName: 'Rohan Mehra',
        rating: 5,
        date: '02 Nov 2026',
        comment: 'Best cargos under ₹1500! Pockets actually hold phone, keys, and wallet without sagging.',
        verified: true,
        helpfulCount: 67,
      }
    ]
  },
  {
    id: 'p-4',
    name: 'Retro Court Low-Top Leather Street Sneakers',
    brand: 'PAANA FOOTWEAR',
    category: 'footwear',
    subCategory: 'Sneakers',
    gender: 'Unisex',
    price: 1899,
    originalPrice: 4499,
    discountPercent: 57,
    rating: 4.7,
    ratingCount: 2740,
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    color: 'Chalk White & Wine Accent',
    colorHex: '#eae5df',
    inStock: true,
    stockCount: 7,
    isTrending: true,
    fastDelivery: 'Tomorrow, by 5 PM',
    description: 'Heritage tennis silhouette reinvented with premium vegan tumble leather uppers, vulcanized cupsole, cushioned memory foam footbed, and burgundy heel tab.',
    details: [
      'Full-grain micro-fiber vegan leather',
      'Removable antimicrobial memory foam insole',
      'High-traction rubber herringbone outsole',
      'Padded collar and tongue for ankle comfort'
    ],
    specifications: {
      'Toe Shape': 'Round Toe',
      'Fastening': 'Lace-Up',
      'Sole Material': 'Durable Vulcanized Rubber',
      'Insole': 'Ortholite Comfort Foam',
      'Warranty': '3 Months Brand Warranty'
    },
    reviews: [
      {
        id: 'r-5',
        userName: 'Karan Dave',
        rating: 5,
        date: '25 Oct 2026',
        comment: 'So comfy right out of the box! Wore them all day across the city with zero heel bite.',
        verified: true,
        helpfulCount: 92,
      }
    ]
  },
  {
    id: 'p-5',
    name: 'Pure French Linen Relaxed Resort Collar Shirt',
    brand: 'HIGHLANDER LUXE',
    category: 'men',
    subCategory: 'Shirts',
    gender: 'Men',
    price: 1449,
    originalPrice: 3499,
    discountPercent: 58,
    rating: 4.4,
    ratingCount: 1620,
    images: [
      'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Oatmeal Natural',
    colorHex: '#d8cfc4',
    inStock: true,
    stockCount: 12,
    isTrending: false,
    fastDelivery: '3 Days',
    description: 'Woven from 100% Normandy flax linen. Breathable, natural drape with an airy Cuban resort collar, mother-of-pearl buttons, and chest pocket.',
    details: [
      '100% Certified European Flax Linen',
      'Enzyme garment washed for ultra-soft handfeel',
      'Camp collar opening with straight vented hem',
      'Naturally temperature-regulating'
    ],
    specifications: {
      'Collar': 'Cuban / Resort Collar',
      'Fit': 'Relaxed Fit',
      'Hemline': 'Straight Vented Hem',
      'Weave': 'Plain Linen Slub',
      'Care': 'Gentle Hand Wash or Machine Wash 30°C'
    },
    reviews: [
      {
        id: 'r-6',
        userName: 'Vikram Joshi',
        rating: 4,
        date: '19 Oct 2026',
        comment: 'Sublime fabric. Very cooling in warm weather.',
        verified: true,
        helpfulCount: 34,
      }
    ]
  },
  {
    id: 'p-6',
    name: 'Ruched Satin Cowl-Neck Slip Maxi Dress',
    brand: 'SASSAFRAS',
    category: 'women',
    subCategory: 'Dresses',
    gender: 'Women',
    price: 1699,
    originalPrice: 3999,
    discountPercent: 57,
    rating: 4.6,
    ratingCount: 2310,
    images: [
      'https://images.pexels.com/photos/1755385/pexels-photo-1755385.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    color: 'Deep Plum Merlot',
    colorHex: '#4a0414',
    inStock: true,
    stockCount: 5,
    isTrending: true,
    isFlashDeal: true,
    fastDelivery: 'Tomorrow, by 1 PM',
    description: 'Silky liquid satin silhouette with cascading cowl neckline, adjustable delicate criss-cross back straps, and subtle side thigh slit.',
    details: [
      'Heavy liquid viscose satin with subtle luster',
      'Bias cut for figure-skimming elegant drape',
      'Adjustable spaghetti straps for custom fit',
      'Concealed side seam zipper'
    ],
    specifications: {
      'Length': 'Maxi (Ankle Length)',
      'Neckline': 'Cowl Neck',
      'Sleeve': 'Sleeveless',
      'Pattern': 'Solid',
      'Occasion': 'Evening Cocktail / Party'
    },
    reviews: [
      {
        id: 'r-7',
        userName: 'Tanvi M.',
        rating: 5,
        date: '20 Oct 2026',
        comment: 'Wore it for an anniversary dinner and it fit like a glove! Color matches Paana burgundy perfectly.',
        verified: true,
        helpfulCount: 78,
      }
    ]
  },
  {
    id: 'p-7',
    name: 'Hydrating Peptide & Niacinamide Dew Glass Serum',
    brand: 'PAANA BEAUTY',
    category: 'beauty',
    subCategory: 'Skincare',
    gender: 'Unisex',
    price: 699,
    originalPrice: 1499,
    discountPercent: 53,
    rating: 4.9,
    ratingCount: 5120,
    images: [
      'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['30 ml', '50 ml'],
    color: 'Translucent Glass',
    colorHex: '#fef08a',
    inStock: true,
    stockCount: 30,
    isTrending: true,
    fastDelivery: 'Tomorrow, by 10 AM',
    description: 'Clinical grade 10% Niacinamide + Multi-molecular Hyaluronic Acid & Copper Peptides. Plumps, tightens pore appearance, and imparts instant glass-skin radiance.',
    details: [
      'Non-sticky, fragrance-free, oil-free formula',
      'Dermatologically tested for sensitive skin',
      'Contains 10% Niacinamide + 2% Zinc PCA + Peptides',
      'Cruelty-free, vegan, and paraben-free'
    ],
    specifications: {
      'Volume': '30 ml Dropper Bottle',
      'Skin Type': 'All Skin Types (Acne-prone safe)',
      'Primary Concern': 'Dullness, Texture & Pores',
      'Usage': 'AM & PM Post-Cleanser',
      'Expiry': '24 Months from MFG'
    },
    reviews: [
      {
        id: 'r-8',
        userName: 'Shreya D.',
        rating: 5,
        date: '29 Oct 2026',
        comment: 'Holy grail product! Cleared my skin texture in 2 weeks. Glass skin glow without grease.',
        verified: true,
        helpfulCount: 145,
      }
    ]
  },
  {
    id: 'p-8',
    name: 'Vintage Wash Distressed Denim Trucker Jacket',
    brand: 'ROADSTER ORIGINALS',
    category: 'men',
    subCategory: 'Jackets',
    gender: 'Men',
    price: 1849,
    originalPrice: 4299,
    discountPercent: 57,
    rating: 4.5,
    ratingCount: 3100,
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    color: 'Acid Washed Indigo',
    colorHex: '#3b82f6',
    inStock: true,
    stockCount: 11,
    isTrending: false,
    fastDelivery: 'Tomorrow, by 6 PM',
    description: '14.5 oz rugged denim jacket featuring antique copper buttons, twin chest flap pockets, side welt hand pockets, and authentic vintage fades.',
    details: [
      '100% Heavyweight Rigid Cotton Denim',
      'Double-needle reinforced chain stitching',
      'Adjustable button waist tabs on rear hem',
      'Machine wash inside out'
    ],
    specifications: {
      'Closure': 'Metal Shank Button Placket',
      'Lining': 'Unlined for all-season layering',
      'Collar': 'Spread Collar',
      'Pockets': '4 Pockets (2 chest, 2 side)',
      'Fit': 'Classic Regular Trucker'
    },
    reviews: [
      {
        id: 'r-9',
        userName: 'Devansh Roy',
        rating: 4,
        date: '14 Oct 2026',
        comment: 'High quality denim. Heavy and durable. Great for bike rides.',
        verified: true,
        helpfulCount: 52,
      }
    ]
  },
  {
    id: 'p-9',
    name: 'Oversized Zip-Through Heavyweight Fleece Hoodie',
    brand: 'PAANA STUDIO',
    category: 'genz',
    subCategory: 'Sweatshirts',
    gender: 'Unisex',
    price: 1599,
    originalPrice: 3499,
    discountPercent: 54,
    rating: 4.8,
    ratingCount: 1940,
    images: [
      'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    color: 'Pale Rose Clay',
    colorHex: '#fb7185',
    inStock: true,
    stockCount: 6,
    isTrending: true,
    fastDelivery: 'Tomorrow, by 12 PM',
    description: '380 GSM brushed fleece with double-lined hood, heavyweight custom metal zipper pull, drop-shoulders, and plush kangaroo front pockets.',
    details: [
      '380 GSM Cotton-Poly ultra-dense fleece',
      'Double-walled hood without eyelet pull strings for minimal aesthetic',
      '2x2 ribbing on cuffs and waistband',
      'Soft brushed interior lining'
    ],
    specifications: {
      'Fit': 'Oversized Street Draping',
      'Closure': 'Full Metal Zip',
      'Hood': 'Attached Structured Hood',
      'Fabric Care': 'Machine wash cold inside out'
    },
    reviews: [
      {
        id: 'r-10',
        userName: 'Ishaan Verma',
        rating: 5,
        date: '01 Nov 2026',
        comment: 'Literally lives on me now. Super cozy and looks like designer apparel.',
        verified: true,
        helpfulCount: 63,
      }
    ]
  },
  {
    id: 'p-10',
    name: 'Minimalist Bauhaus Chronograph Leather Watch',
    brand: 'PAANA TIMEPIECES',
    category: 'accessories',
    subCategory: 'Watches',
    gender: 'Unisex',
    price: 2199,
    originalPrice: 5999,
    discountPercent: 63,
    rating: 4.7,
    ratingCount: 1540,
    images: [
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['Standard 40mm'],
    color: 'Brushed Rose Gold & Wine',
    colorHex: '#4a0414',
    inStock: true,
    stockCount: 10,
    isTrending: true,
    fastDelivery: 'Tomorrow, by 3 PM',
    description: 'Sleek 7mm ultra-thin 316L surgical stainless steel casing with sapphire coated glass, Japanese Miyota quartz movement, and genuine top-grain burgundy leather strap.',
    details: [
      '316L Surgical Grade Stainless Steel Casing',
      'Japanese Miyota Precision Quartz Chrono Movement',
      'Water resistant up to 5 ATM (50 meters)',
      'Quick-release interchangeable strap pins'
    ],
    specifications: {
      'Dial Diameter': '40 mm',
      'Case Thickness': '7.2 mm',
      'Strap Material': 'Italian Top-Grain Leather',
      'Glass': 'Sapphire Coated Scratch Resistant Crystal',
      'Warranty': '1 Year International Warranty'
    },
    reviews: [
      {
        id: 'r-11',
        userName: 'Aditya Sen',
        rating: 5,
        date: '24 Oct 2026',
        comment: 'Incredible finish. Looks 4x the price on the wrist.',
        verified: true,
        helpfulCount: 47,
      }
    ]
  },
  {
    id: 'p-11',
    name: 'High-Waist Wide-Leg Fluid Pleated Trousers',
    brand: 'SASSAFRAS',
    category: 'women',
    subCategory: 'Trousers',
    gender: 'Women',
    price: 1199,
    originalPrice: 2899,
    discountPercent: 58,
    rating: 4.5,
    ratingCount: 3820,
    images: [
      'https://images.pexels.com/photos/7679469/pexels-photo-7679469.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7679471/pexels-photo-7679471.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['26', '28', '30', '32', '34'],
    color: 'Warm Sand Cream',
    colorHex: '#f5f0e8',
    inStock: true,
    stockCount: 17,
    isTrending: true,
    fastDelivery: 'Tomorrow, by 1 PM',
    description: 'Chic Korean-style silhouette with tailored double front pleats, high-rise contoured waistband, slant side pockets, and sweeping wide legs.',
    details: [
      'Wrinkle-resistant polyester-rayon crepe weave',
      'Hook-and-bar front closure with inner extension button',
      'Belt loops for accessorizing',
      'Machine wash gentle cycle'
    ],
    specifications: {
      'Fit': 'Wide Leg Fluid Fit',
      'Waist Rise': 'High Rise',
      'Length': 'Regular Full Length',
      'Pockets': '2 Side Slant Pockets'
    },
    reviews: [
      {
        id: 'r-12',
        userName: 'Meera Chawla',
        rating: 5,
        date: '18 Oct 2026',
        comment: 'So flattering! Lengthens legs and works effortlessly with crop tops or oversized blazers.',
        verified: true,
        helpfulCount: 112,
      }
    ]
  },
  {
    id: 'p-12',
    name: 'Organic Cotton Dinosaur Graphic Set for Kids',
    brand: 'PAANA KIDS',
    category: 'kids',
    subCategory: 'Sets',
    gender: 'Kids',
    price: 799,
    originalPrice: 1799,
    discountPercent: 55,
    rating: 4.8,
    ratingCount: 1200,
    images: [
      'https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1619698/pexels-photo-1619698.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y', '7-8Y'],
    color: 'Mint Sage & Navy',
    colorHex: '#6ee7b7',
    inStock: true,
    stockCount: 22,
    isTrending: false,
    fastDelivery: 'Tomorrow, by 11 AM',
    description: 'Super gentle GOTS-certified 100% organic cotton tee and knit shorts combo. Soft non-toxic water-based prints, flatlock seams to prevent chafing.',
    details: [
      '100% GOTS Certified Organic Cotton',
      'Tagless neck label for sensitive skin comfort',
      'Elastic waist with non-functional drawstring tie',
      'Machine wash warm'
    ],
    specifications: {
      'Fabric': '100% Organic Knitted Cotton',
      'Combo Includes': '1 T-Shirt + 1 Pair of Shorts',
      'Age Group': '2 Years to 8 Years',
      'Safety': 'Nickel-free snaps and baby-safe dyes'
    },
    reviews: [
      {
        id: 'r-13',
        userName: 'Sonia Kapoor',
        rating: 5,
        date: '27 Oct 2026',
        comment: 'Very soft on my toddler skin! Did not shrink after 4 washes.',
        verified: true,
        helpfulCount: 29,
      }
    ]
  }
];

export const BRAND_STORY = {
  title: "Paana - Defined by Confidence",
  subtitle: "Curated fashion with zero compromises on quality, cut, or attitude.",
  stats: [
    { label: 'Happy Customers', value: '2.5M+' },
    { label: 'Styles Dropping Weekly', value: '500+' },
    { label: 'Avg Delivery Time', value: '24-48 Hrs' },
    { label: 'Customer Satisfaction', value: '4.8 / 5.0' },
  ]
};
