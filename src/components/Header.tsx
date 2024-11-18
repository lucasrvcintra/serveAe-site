import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from './mode-toggle';

type HeaderProps = {
  cartItemsCount: number;
  onCartClick: () => void;
};

const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#FF9000]">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">🍽️</span>
            <span className="text-xl text-white font-semibold hidden md:block">
              ServeAê
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-white text-muted-foreground">
              Aberto agora
            </span>
          </div>

          <Button
            variant="link"
            size="icon"
            onClick={onCartClick}
            className="relative hover:bg-[#ff8000]"
          >
            <ShoppingCart className="h-5 w-5 text-white" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-[#0088A1] font-bold text-xs flex items-center justify-center bg-white">
                {cartItemsCount}
              </span>
            )}
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
