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
import { useEffect, useState } from 'react';
import { api } from '@/server/api';

interface FinishOrderProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  cart: CartItem[];
  total: number;
}

const FinishOrder = ({
  open,
  setIsOpen,
  user,
  setUser,
  cart,
  total,
}: FinishOrderProps) => {
  const [order, setOrder] = useState<Order | undefined>(undefined);

  useEffect(() => {
    const orderItems = cart.map((cartItem) => ({
      productId: cartItem.product.id,
      quantity: cartItem.quantity,
    }));
    if (user) {
      setOrder({
        userId: user.id,
        products: orderItems,
      });
    }
  }, [open]);

  function handleCreateOrder() {
    try {
      api.post('/api/orders', order).then(() => {
        alert('pedido criado com sucesso');
      });
    } catch (error) {
      console.error('Failed to create order:', error);
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
        <DialogFooter className="flex items-center justify-between p-2 border-t">
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
