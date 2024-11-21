export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  userId: string;
  products: OrderItem[];
};

export type OrderItem = {
  productId: string;
  quantity: number;
};

export type User = {
  id: string;
  email: string;
  name: string;
  address: string;
  phone: string;
};
