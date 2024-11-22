import { ModeToggle } from './mode-toggle';
import Cart from './Cart';
import { CartItem } from '@/types';

interface HeaderProps {
  cart: CartItem[];
  setCart: (cartItems: CartItem[]) => void;
}

const Header = ({ cart, setCart }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#FF9000]">
      <div className="flex h-16 items-center justify-between md:justify-between px-4">
        <div className="flex items-center space-x-2 ">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">🍽️</span>
            <span className="text-xl text-white font-semibold hidden md:block">
              ServeAê
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4 ">
          <div className="hidden md:flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-white text-muted-foreground">
              Aberto agora
            </span>
          </div>

          <Cart cart={cart} setCart={setCart} />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
