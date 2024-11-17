import { Product } from '../types';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ProductCard from './ProductCard';
import ProductsDialog from './ProductsModal';

type MenuSectionProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
  modalProps: {
    onAddProduct: (product: Partial<Product>) => void;
    newProduct: Partial<Product>;
    setNewProduct: React.Dispatch<React.SetStateAction<Partial<Product>>>;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    editingProduct: Product | null;
    setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  };
};

export function MenuSection({
  products,
  onAddToCart,
  onEditProduct,
  onDeleteProduct,
  modalProps,
}: MenuSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Menu do Restaurante</CardTitle>
            <CardDescription>Escolha seus pratos favoritos</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] w-full px-2">
          <div className="grid grid-cols-1 gap-2">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onEditProduct={onEditProduct}
                onDeleteProduct={onDeleteProduct}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <div className="flex justify-start items-center p-4 border-t">
        <ProductsDialog onEditProduct={onEditProduct} {...modalProps} />
      </div>
    </Card>
  );
}
