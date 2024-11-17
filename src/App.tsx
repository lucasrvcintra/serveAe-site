import { useState } from 'react';
import Header from './components/Header';
import { MenuSection } from './components/MenuSection';
import { CartSection } from './components/CartSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import type { Product } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('menu');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { products, handleAddProduct, handleEditProduct, handleDeleteProduct } =
    useProducts();
  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartItemsCount,
    totalPrice,
  } = useCart();

  const modalProps = {
    onAddProduct: (product: Partial<Product>) => {
      handleAddProduct(product);
      setNewProduct({});
      setIsModalOpen(false);
    },
    onEditProduct: (product: Product) => {
      handleEditProduct(product);
      setEditingProduct(null);
      setIsModalOpen(false);
    },
    newProduct,
    setNewProduct,
    isOpen: isModalOpen,
    setIsOpen: setIsModalOpen,
    editingProduct,
    setEditingProduct,
  };

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
            <MenuSection
              modalProps={modalProps}
              products={products}
              onAddToCart={addToCart}
              onEditProduct={(product: Product) => {
                setEditingProduct(product);
                setIsModalOpen(true);
              }}
              onDeleteProduct={handleDeleteProduct}
            />
          </TabsContent>

          <TabsContent value="cart">
            <CartSection
              cart={cart}
              onDecrease={removeFromCart}
              onIncrease={addToCart}
              onClearCart={clearCart}
              totalPrice={totalPrice}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
