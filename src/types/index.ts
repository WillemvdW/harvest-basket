export interface Crop {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  stock: number;
  category: string;
  farmId?: string;
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  description: string;
  contact: string;
  email: string;
}

export interface DropOffPoint {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  hours: string;
}

export interface CartItem {
  crop: Crop;
  quantity: number;
}

export interface SavedBasket {
  id: string;
  name: string;
  items: CartItem[];
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  addresses: Address[];
  createdAt: Date;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  deliveryMethod: 'home' | 'collection';
  deliveryAddress?: Address;
  collectionPointId?: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentIntentId?: string;
  createdAt: Date;
  status: string;
}
