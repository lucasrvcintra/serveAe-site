import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { OrderItem } from '@/types';
import { CartItem } from './CartItem';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';

interface CartProps {
  cart: OrderItem[];
  setCart: (cartItems: OrderItem[]) => void;
}

const Cart = ({ cart, setCart }: CartProps) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalPrice = cart.reduce((acc, item) => {
      return item.product.price * item.quantity + acc;
    }, 0);
    setTotal(totalPrice);
  }, [cart, setCart]);

  const onClearCart = () => {
    setCart([]);
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="link"
          size="icon"
          className="relative hover:bg-[#ff8000]"
        >
          <ShoppingCart className="h-5 w-5 text-white" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-[#0088A1] font-bold text-xs flex items-center justify-center bg-white">
              {cart.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Itens do Carrinho</SheetTitle>
          <SheetDescription>Revise seus itens selecionados</SheetDescription>
        </SheetHeader>
        {cart.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Seu carrinho está vazio
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((cartItem) => (
              <CartItem
                key={cartItem.product.id}
                item={cartItem}
                cart={cart}
                setCart={setCart}
              />
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">R$ {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={onClearCart}
                      className="h-8 w-8 hover:bg-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div>Limpar Carrinho</div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button className="w-fit bg-[#0088A1] hover:bg-[#009EBA] font-bold">
                Finalizar Pedido
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
