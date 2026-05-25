// API Types
export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  isVerified: boolean;
  role: "user" | "admin";
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: Category;
  brand: Brand;
  tags: string[];
  sku?: string;
  stock: number;
  variants?: Array<{
    name: string;
    value: string;
    price: number;
    stock: number;
  }>;
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
  shipping?: {
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    freeShipping: boolean;
  };
  isActive: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isRecommended: boolean;
  ratings: {
    average: number;
    count: number;
  };
  reviews: Review[];
  relatedProducts: Product[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: string;
  subcategories: string[];
  isActive: boolean;
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  isActive: boolean;
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: string;
  user: User;
  items: Array<{
    product: Product;
    variant?: {
      name: string;
      value: string;
    };
    quantity: number;
    price: number;
    total: number;
  }>;
  shippingAddress: {
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress?: {
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  payment: {
    method: "card" | "paypal" | "cod";
    status: "pending" | "paid" | "failed" | "refunded";
    transactionId?: string;
    amount: number;
  };
  coupon?: {
    code: string;
    discount: number;
    type: "percentage" | "fixed";
  };
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
  tracking?: {
    carrier: string;
    trackingNumber: string;
    url: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  _id: string;
  user?: string;
  sessionId?: string;
  items: Array<{
    product: Product;
    variant?: {
      name: string;
      value: string;
    };
    quantity: number;
    price: number;
    addedAt: string;
  }>;
  coupon?: {
    code: string;
    discount: number;
    type: "percentage" | "fixed";
  };
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  user: User;
  product: string;
  order?: string;
  rating: number;
  title: string;
  comment: string;
  images: string[];
  isVerified: boolean;
  isApproved: boolean;
  helpful: number;
  reported: number;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  _id: string;
  code: string;
  description?: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderValue: number;
  maxDiscount?: number;
  usageLimit?: number;
  usageCount: number;
  userLimit: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  applicableCategories: string[];
  applicableBrands: string[];
  applicableProducts: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Banner {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  mobileImage?: string;
  link?: string;
  linkText?: string;
  position: "hero" | "sidebar" | "footer";
  order: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  clickCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface HomepageSection {
  _id: string;
  name: string;
  type:
    | "hero"
    | "featured-products"
    | "categories"
    | "brands"
    | "testimonials"
    | "offers"
    | "newsletter"
    | "custom";
  title?: string;
  subtitle?: string;
  description?: string;
  content?: any;
  images: string[];
  isActive: boolean;
  order: number;
  settings: {
    layout: "grid" | "slider" | "list";
    itemsPerRow: number;
    maxItems?: number;
    autoplay: boolean;
    showTitle: boolean;
    backgroundColor?: string;
    textColor?: string;
  };
  filters: {
    categories: string[];
    brands: string[];
    tags: string[];
    featured: boolean;
    trending: boolean;
    bestSeller: boolean;
    newArrival: boolean;
  };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pages: number;
    total: number;
    limit: number;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

export interface ProductForm {
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  brand: string;
  tags: string[];
  sku?: string;
  stock: number;
  variants?: Array<{
    name: string;
    value: string;
    price: number;
    stock: number;
  }>;
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
  shipping?: {
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    freeShipping: boolean;
  };
  isActive: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isRecommended: boolean;
}

// Redux State Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface CartState {
  items: Cart["items"];
  coupon: Cart["coupon"];
  isLoading: boolean;
  error: string | null;
}

export interface ProductState {
  products: Product[];
  featuredProducts: Product[];
  trendingProducts: Product[];
  newArrivals: Product[];
  bestSellers: Product[];
  currentProduct: Product | null;
  categories: Category[];
  brands: Brand[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pages: number;
    total: number;
  };
}

export interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

export interface AdminState {
  dashboard: {
    totalUsers: number;
    totalOrders: number;
    totalProducts: number;
    totalRevenue: number;
    recentOrders: Order[];
    topProducts: Product[];
  };
  users: User[];
  products: Product[];
  orders: Order[];
  categories: Category[];
  brands: Brand[];
  coupons: Coupon[];
  reviews: Review[];
  banners: Banner[];
  homepageSections: HomepageSection[];
  isLoading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  cart: CartState;
  products: ProductState;
  orders: OrderState;
  admin: AdminState;
}
