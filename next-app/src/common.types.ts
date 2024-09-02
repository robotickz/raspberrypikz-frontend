export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  imageUrl: string;
  category: Category;
  name: string;
  description: string;
  price: number;
  amount: number;
  metaDescription: string;
  keywords: string;
}

export interface CartItem {
  id: string;
  product: Product;
  amount: number;
}

export interface Cart {
  items: CartItem[];
}

export interface DeliveryData {
  firstName: string;
  lastName: string;
  organization: string;
  address: string;
  locality: string;
  region: string;
  zipCode: string;
  phone: string;
  email: string;
  isOrganization: boolean;
}
