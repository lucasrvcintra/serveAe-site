import { useState } from 'react';

import Header from './components/Header';
import CartItem from './components/CartItem';
import ProductCard from './components/ProductCard';
import ProductsDialog from './components/ProductsModal';

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
};

type CartItemType = Product & {
  quantity: number;
};

export const categories = ['Entrada', 'Prato Principal', 'Bebida', 'Sobremesa'];

export default function App() {
  const [activeTab, setActiveTab] = useState('menu');
  const [cart, setCart] = useState<CartItemType[]>([]);
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
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    category: categories[0],
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla a visibilidade do modal

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddProduct = (product: Partial<Product>) => {
    if (editingProduct) {
      setProducts((prevProducts) =>
        prevProducts.map((item) =>
          item.id === editingProduct.id ? { ...item, ...product } : item
        )
      );
      setEditingProduct(null);
    } else {
      setProducts((prevProducts) => [
        ...prevProducts,
        { ...product, id: prevProducts.length + 1 } as Product,
      ]);
    }
    setIsModalOpen(false);
  };

  const handleEditProduct = (product: Product) => {
    setNewProduct(product);
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToCart = (product: Product) => {
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
    <div className="min-h-screen flex flex-col">
      <Header
        cartItemsCount={cartItemsCount}
        onCartClick={() => setActiveTab('cart')}
      />
      <div className="container mx-auto p-4 flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                      onEditProduct={handleEditProduct}
                      onDeleteProduct={handleDeleteProduct}
                    />
                  ))}
                </ScrollArea>
              </CardContent>
              <div className="flex justify-between items-center p-4 border-t">
                <ProductsDialog
                  onAddProduct={handleAddProduct}
                  onEditProduct={handleEditProduct}
                  newProduct={newProduct}
                  setNewProduct={setNewProduct}
                  isOpen={isModalOpen}
                  setIsOpen={setIsModalOpen}
                  editingProduct={editingProduct}
                  setEditingProduct={setEditingProduct}
                />
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="cart">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Seu Pedido</CardTitle>
                  <CardDescription>
                    Revise seus itens selecionados
                  </CardDescription>
                </div>
                {cart.length > 0 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={clearCart}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div>Limpar Carrinho</div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="text-center py-4">Carrinho vazio</div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onDecrease={() => removeFromCart(item.id)}
                        onIncrease={() => addToCart(item)}
                      />
                    ))}
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span>R$ {totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>R${totalPrice.toFixed(2)}</span>
                </div>
                <Button className="w-full mt-4">Finalizar Pedido</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
