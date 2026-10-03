export interface ProductImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  tag?: string;
}

export interface ProductSpec {
  category: string;
  items: {
    label: string;
    value: string;
    highlight?: boolean;
  }[];
}

export interface ReviewMedia {
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  alt?: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  likes: number;
  highlight?: string;
  media?: ReviewMedia[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface CartItem {
  id: string;
  name: string;
  packageType: 'single' | 'double' | 'triple';
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
}

export interface ShippingCalculation {
  cep: string;
  city: string;
  state: string;
  type: string;
  days: string;
  price: number;
}

export interface CustomerOrder {
  orderId: string;
  createdAt: string;
  status: 'AGUARDANDO_PAGAMENTO' | 'PAGO_PIX' | 'SEPARACAO' | 'ENVIADO';
  estimatedDispatch: string;
  trackingCode: string;
  approvedAt?: string;
  pixCopiaECola?: string;
  qrCodeUrl?: string;
  customer: {
    name: string;
    cpf: string;
    phone: string;
    email: string;
    address: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: CartItem[];
  total: number;
  pixTxid?: string;
}
