export type CategoryId = 'laptop' | 'gaming' | 'monitor' | 'gpu' | 'memory' | 'keyboard' | 'mouse' | 'audio' | 'pc';

export interface Category {
  id: CategoryId;
  title: string;
  subtitle: string;
  icon: string;
  image: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: CategoryId;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  images: string[];
  badge?: 'new' | 'hot' | 'limited';
  specs: Array<[string, string]>;
  highlights: string[];
  colors?: string[];
  featured?: boolean;
  deal?: boolean;
}

export interface CartLine {
  id: string;
  qty: number;
  color?: string;
}

export type Route =
  | { name: 'home' }
  | { name: 'shop'; cat?: CategoryId; q?: string }
  | { name: 'product'; id: string }
  | { name: 'cart' }
  | { name: 'wishlist' };
