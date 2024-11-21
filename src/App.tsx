import Header from './components/Header';
import { Product, CartItem } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import { useEffect, useState } from 'react';
import { api } from '@/server/api';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddProductDialog from '@/components/Modal/AddProduct';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    api.get('/api/products').then((response: any) => {
      try {
        setProducts(response.data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    });
  }, [setProducts]);

  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cart={cart} setCart={setCart} />
      <div className="container mx-auto p-4 flex-1">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Menu do Restaurante</CardTitle>
                <CardDescription>Escolha seus pratos favoritos</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="md:h-[550px] h-[70vh] w-full px-2">
              <div className="flex flex-col gap-2">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    setProducts={setProducts}
                    handleAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <div className="flex justify-start items-center p-4 border-t">
            <Button
              onClick={() => setIsOpen(true)}
              className="bg-[#FF9000] hover:bg-green-600 font-bold"
            >
              <Plus className="h-4 w-4 mx-2" />
              Adicionar Produto
            </Button>
            <AddProductDialog
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setProducts={setProducts}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
