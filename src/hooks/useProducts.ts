import { useState } from 'react';
import { Product } from '../types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Pizza Margherita',
      category: 'Prato Principal',
      price: 25.99,
      description: 'Clássica pizza italiana',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsHR6jfcanUuS7KY2rFyQqNu-NpjIf-mEYyA&s',
    },
    {
      id: 2,
      name: 'Coca-Cola',
      category: 'Bebida',
      price: 5.99,
      description: 'Refrigerante gelado',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzS_4CAJyLc1Z9TVotAMRor4W-c6EEmn1xkg&s',
    },
    {
      id: 3,
      name: 'Salada Caesar',
      category: 'Entrada',
      price: 15.99,
      description: 'Salada fresca com molho Caesar',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG5xfH_ph1AZF6mLkIXY5xJaBRwCi9kCOA7g&s',
    },
  ]);

  const handleAddProduct = (product: Partial<Product>) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { ...product, id: prevProducts.length + 1 } as Product,
    ]);
  };

  const handleEditProduct = (productToEdit: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productToEdit.id ? productToEdit : product
      )
    );
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return {
    products,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
  };
}
