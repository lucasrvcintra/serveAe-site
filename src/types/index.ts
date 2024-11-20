export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
};

export type OrderItem = {
  product: Product;
  quantity: number;
};

export type User = {
  id: string;
  email: string;
  name: string;
  address: string;
  phone: string;
};
