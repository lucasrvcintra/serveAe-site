export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
};

export type CartItem = Product & {
  quantity: number;
};

export const categories = ['Entrada', 'Prato Principal', 'Bebida', 'Sobremesa'];
