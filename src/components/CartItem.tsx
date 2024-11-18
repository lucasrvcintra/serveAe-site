import { CartItem as CartItemType } from '../types';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

type CartItemProps = {
  item: CartItemType;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function CartItemComponent({
  item,
  onDecrease,
  onIncrease,
}: CartItemProps) {
  return (
    <div className="mb-4 border rounded-lg border-gray-500 p-4">
      <div className="flex md:items-center justify-between gap-1 flex-wrap">
        <div className="flex flex-1 items-center space-x-4 min-w-[220px]">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-16 h-16 rounded object-cover"
          />
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-muted-foreground">
              R$ {item.price.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={onDecrease}
            className="h-8 w-8"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={onIncrease}
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="ml-4 text-right min-w-[100px] pt-4">
          <p className="font-medium">
            R$ {(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
