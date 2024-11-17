import { Product, CartItem } from '../types';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { CartItemComponent } from './CartItem';

type CartSectionProps = {
  cart: CartItem[];
  onDecrease: (productId: number) => void;
  onIncrease: (product: Product) => void;
  onClearCart: () => void;
  totalPrice: number;
};

export function CartSection({
  cart,
  onDecrease,
  onIncrease,
  onClearCart,
  totalPrice,
}: CartSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Seu Pedido</CardTitle>
          <CardDescription>Revise seus itens selecionados</CardDescription>
        </div>
        {cart.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onClearCart}
                  className="h-8 w-8"
                >
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
          <div className="text-center py-8 text-muted-foreground">
            Seu carrinho está vazio
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItemComponent
                key={item.id}
                item={item}
                onDecrease={() => onDecrease(item.id)}
                onIncrease={() => onIncrease(item)}
              />
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">R$ {totalPrice.toFixed(2)}</span>
            </div>
            <Button className="w-full">Finalizar Pedido</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
