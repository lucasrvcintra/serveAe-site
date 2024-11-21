import { CartItem } from '../types';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

type CartItemCardProps = {
  item: CartItem;
  cart: CartItem[];
  setCart: (cartItems: CartItem[]) => void;
};

export function CartItemCard({ item, cart, setCart }: CartItemCardProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleUpdateQuantity = (quantity: number) => {
    const existingItem = cart.find(
      (orderItem) => orderItem.product.id === item.product.id
    );
    if (existingItem) {
      setCart(
        cart.map((orderItem) =>
          orderItem.product.id === item.product.id
            ? { ...orderItem, quantity }
            : orderItem
        )
      );
    }
  };

  const handleRemoveFromCart = () => {
    const existingItem = cart.find(
      (orderItem) => orderItem.product.id === item.product.id
    );
    if (existingItem) {
      setCart(
        cart.filter((orderItem) => orderItem.product.id !== item.product.id)
      );
    }
  };

  return (
    <div className="mb-4 border rounded-lg border-gray-500 p-4">
      <div className="flex md:items-center justify-between gap-1 flex-wrap">
        <div className="flex flex-1 items-center space-x-4 min-w-[220px] relative">
          <img
            src={item.product.imageUrl}
            alt={item.product.name}
            className="w-16 h-16 rounded object-cover"
          />
          <div>
            <h3 className="font-medium">{item.product.name}</h3>
            <p className="text-sm text-muted-foreground">
              R$ {item.product.price.toFixed(2)}
            </p>
          </div>
          <Button
            onClick={handleRemoveFromCart}
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-600 absolute right-2 top-2"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2 pt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (quantity > 1) {
                const newQuantity = quantity - 1;
                setQuantity(newQuantity);
                handleUpdateQuantity(newQuantity);
              }
            }}
            className="h-8 w-8"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newQuantity = quantity + 1;
              setQuantity(newQuantity);
              handleUpdateQuantity(newQuantity);
            }}
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="ml-4 text-right min-w-[100px] pt-4">
          <p className="font-medium">
            R$ {(item.product.price * quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
