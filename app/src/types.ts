export type Language = 'mr' | 'en';

export interface Product {
  id: string;
  nameMr: string;
  nameEn: string;
  price: number;
  unitMr: string;
  unitEn: string;
  categoryMr: string;
  categoryEn: string;
  shgNameMr: string;
  shgNameEn: string;
  locationMr: string;
  locationEn: string;
  descriptionMr: string;
  descriptionEn: string;
  imageUrl: string;
  imageUnenhancedUrl?: string;
  estimatedMarketPrice: number;
  apmcRange: {
    min: number;
    max: number;
  };
  salesCount: number;
  inStock: boolean;
  verifiedSHG: boolean;
  audioDescriptionMr: string;
  dateAdded: string;
  isVoiceAdded?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type VoiceStep =
  | 'IDLE'
  | 'LISTENING_ITEM'
  | 'LISTENING_PRICE'
  | 'CONFIRMATION_PENDING'
  | 'COMPLETED'
  | 'KEYPAD_FALLBACK';

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  paymentMethod: 'COD' | 'ESCROW_UPI';
  timestamp: string;
  status: 'CONFIRMED' | 'DISPATCHED' | 'DELIVERED';
}
