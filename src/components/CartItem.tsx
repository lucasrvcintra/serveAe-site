import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

type CartItemProps = {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  };
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
}: CartItemProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <p className="font-semibold">{item.name}</p>
        <p>Quantidade: {item.quantity}</p>
      </div>
      <div className="flex items-center space-x-2">
        <p>R$ {(item.price * item.quantity).toFixed(2)}</p>
        <Button variant="outline" size="icon" onClick={onDecrease}>
          <Minus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onIncrease}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
