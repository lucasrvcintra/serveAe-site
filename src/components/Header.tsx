import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

type HeaderProps = {
  cartItemsCount: number;
  onCartClick: () => void;
};

const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          {/* Logo e Nome */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">🍽️</span>
            <span className="text-xl font-semibold hidden md:block">
              ServeAê
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Status do Restaurante */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-muted-foreground">Aberto agora</span>
          </div>

          {/* Botão do Carrinho */}
          <Button
            variant="outline"
            size="icon"
            onClick={onCartClick}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
