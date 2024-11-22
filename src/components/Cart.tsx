import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { CartItem, User } from '@/types';
import { CartItemCard } from './CartItemCard';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';
import { ScrollArea } from './ui/scroll-area';
import ConfirmClientDialog from './Modal/ConfirmClient';

import RegisterCLientDialog from './Modal/RegisterClient';
import VerifyClientDialog from './Modal/VerifyClient';
import FinishOrder from './Modal/FinishOrder';
import ConfirmActionDialog from './Modal/ConfirmAction';
import { toast } from 'sonner';

interface CartProps {
  cart: CartItem[];
  setCart: (cartItems: CartItem[]) => void;
}

const Cart = ({ cart, setCart }: CartProps) => {
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isOpenVerifyClient, setIsOpenVerifyClient] = useState(false);
  const [isOpenConfirmClient, setIsOpenConfirmClient] = useState(false);
  const [isOpenConfirmAction, setIsOpenConfirmAction] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenFinishOrder, setIsOpenFinishOrder] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const totalPrice = cart.reduce((acc, item) => {
      return item.product.price * item.quantity + acc;
    }, 0);
    setTotal(totalPrice);
  }, [cart, setCart]);

  useEffect(() => {
    const totalItems = cart.reduce((acc, item) => {
      return item.quantity + acc;
    }, 0);
    setTotalItems(totalItems);
  }, [cart]);

  const onClearCart = () => {
    toast.success('Carrinho limpo com sucesso');
    setCart([]);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Button
            variant="link"
            size="icon"
            className="relative hover:bg-[#ff8000]"
          >
            <ShoppingCart className="h-5 w-5 text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-[#008ba3] font-bold text-xs flex items-center justify-center bg-white">
                {totalItems}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="h-screen w-[85%]">
          <SheetHeader>
            <SheetTitle>Itens do Carrinho</SheetTitle>
            <SheetDescription>Revise seus itens selecionados</SheetDescription>
          </SheetHeader>
          {cart.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Seu carrinho está vazio
            </div>
          ) : (
            <ScrollArea className="h-[78%] w-full">
              <div className="space-y-4">
                {cart.map((cartItem) => (
                  <CartItemCard
                    key={cartItem.product.id}
                    item={cartItem}
                    cart={cart}
                    setCart={setCart}
                  />
                ))}
              </div>
            </ScrollArea>
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
                        onClick={() => setIsOpenConfirmAction(true)}
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

                <SheetClose asChild>
                  <Button
                    className="w-fit bg-[#0088A1] hover:bg-[#009EBA] font-bold"
                    onClick={() => {
                      setIsOpenVerifyClient(true);
                    }}
                  >
                    Finalizar Pedido
                  </Button>
                </SheetClose>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
      <ConfirmActionDialog
        open={isOpenConfirmAction}
        setIsOpen={setIsOpenConfirmAction}
        text="Tem certeza que deseja limpar o carrinho?"
        handleDelete={onClearCart}
      />
      <VerifyClientDialog
        open={isOpenVerifyClient}
        setIsOpen={setIsOpenVerifyClient}
        setIsOpenRegister={setIsOpenRegister}
        setIsOpenConfirmClient={setIsOpenConfirmClient}
      />
      <RegisterCLientDialog
        open={isOpenRegister}
        setIsOpen={setIsOpenRegister}
        setUser={setUser}
        setIsOpenFinishOrder={setIsOpenFinishOrder}
      />
      <ConfirmClientDialog
        open={isOpenConfirmClient}
        setIsOpen={setIsOpenConfirmClient}
        setUser={setUser}
        setIsOpenFinishOrder={setIsOpenFinishOrder}
      />
      <FinishOrder
        open={isOpenFinishOrder}
        setIsOpen={setIsOpenFinishOrder}
        user={user}
        setUser={setUser}
        cart={cart}
        setCart={setCart}
        total={total}
      />
    </>
  );
};

export default Cart;
