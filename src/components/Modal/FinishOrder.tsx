import { Button } from '../ui/button';
import type { CartItem, Order, User } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { api } from '@/server/api';
import { toast } from 'sonner';

interface FinishOrderProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  cart: CartItem[];
  setCart: (cartItems: CartItem[]) => void;
  total: number;
}

const FinishOrder = ({
  open,
  setIsOpen,
  user,
  setUser,
  cart,
  setCart,
  total,
}: FinishOrderProps) => {
  async function handleCreateOrder() {
    if (!user) {
      toast.error('Usuário não definido. Por favor, confirme seus dados.');
      return;
    }

    const orderItems = cart.map((cartItem) => ({
      productId: cartItem.product.id,
      quantity: cartItem.quantity,
    }));

    const newOrder: Order = {
      userId: user.id,
      products: orderItems,
    };

    try {
      await api.post('/api/orders', newOrder);
      setCart([]);
      setIsOpen(false);
      toast.success('Pedido criado com sucesso');
    } catch (error) {
      console.error('Failed to create order:', error);
      toast.error('Erro ao criar o pedido. Tente novamente.');
    }
  }

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-xs sm:max-w-lg md:max-w-4xl h-fit">
        <DialogHeader className=" h-fit p-2">
          <DialogTitle>Resumo do Pedido</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 h-[100%] w-full">
          <div className="flex flex-col gap-3 flex-1">
            <p>
              <b>Nome:</b> {user?.name}
            </p>
            <p>
              <b>Email:</b> {user?.email}
            </p>
            <p>
              <b>Telefone:</b> {user?.phone}
            </p>
            <p>
              <b>Endereço:</b> {user?.address}
            </p>
          </div>
          <div className="flex flex-row flex-1 border-t pt-4">
            <ScrollArea className="h-[100%] w-[50%]">
              <div className="space-y-4 flex flex-col">
                {cart.map((cartItem) => (
                  <>
                    <span>
                      {cartItem.product.name} <b>x</b>
                      {cartItem.quantity}
                    </span>
                  </>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        <DialogFooter className="flex flex-col items-center justify-between gap-2 w-full p-2 border-t">
          <div className="flex flex-1 justify-between items-center">
            <span className="font-semibold">Total: R$ {total.toFixed(2)}</span>
          </div>
          <div className="flex flex-1 justify-end items-center gap-3">
            <Button
              onClick={() => {
                setIsOpen(false);
                handleCreateOrder();
              }}
              className="w-fit bg-[#0088A1] hover:bg-[#009EBA] font-bold"
            >
              Confirmar
            </Button>
            <Button
              onClick={() => {
                setIsOpen(false);
                setUser(undefined);
              }}
              className="w-fit bg-red-500 hover:bg-red-700 font-bold"
            >
              Cancelar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FinishOrder;
