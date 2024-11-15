'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

// Mock data for products
const products = [
  {
    id: 1,
    name: 'Pizza Margherita',
    category: 'Prato Principal',
    price: 25.99,
    description: 'Clássica pizza italiana',
    imageUrl: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 2,
    name: 'Coca-Cola',
    category: 'Bebida',
    price: 5.99,
    description: 'Refrigerante gelado',
    imageUrl: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 3,
    name: 'Salada Caesar',
    category: 'Entrada',
    price: 15.99,
    description: 'Salada fresca com molho Caesar',
    imageUrl: '/placeholder.svg?height=100&width=100',
  },
];

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
  imageUrl: string;
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: (typeof products)[0]) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return currentCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return currentCart.filter((item) => item.id !== productId);
    });
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="menu" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="cart">Carrinho</TabsTrigger>
        </TabsList>
        <TabsContent value="menu">
          <Card>
            <CardHeader>
              <CardTitle>Menu do Restaurante</CardTitle>
              <CardDescription>Escolha seus pratos favoritos</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] w-full pr-4">
                {products.map((product) => (
                  <Card key={product.id} className="mb-4">
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-16 h-16 rounded-md"
                        />
                        <div>
                          <p>{product.description}</p>
                          <p className="font-bold">
                            R$ {product.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <Button onClick={() => addToCart(product)}>
                        <Plus className="mr-2 h-4 w-4" /> Adicionar
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cart">
          <Card>
            <CardHeader>
              <CardTitle>Seu Pedido</CardTitle>
              <CardDescription>Revise seus itens selecionados</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full pr-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center mb-4"
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p>Quantidade: {item.quantity}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p>R$ {(item.price * item.quantity).toFixed(2)}</p>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => addToCart(item)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span className="font-bold">
                  Total: R$ {totalPrice.toFixed(2)}
                </span>
              </div>
              <Button>Finalizar Pedido</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
