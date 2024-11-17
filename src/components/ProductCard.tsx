import { Button } from '@/components/ui/button';
import { Edit, Plus, Trash2 } from 'lucide-react';

type ProductCardProps = {
  product: {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    imageUrl: string;
  };
  onAddToCart: (product: ProductCardProps['product']) => void;
  onEditProduct: (product: ProductCardProps['product']) => void;
  onDeleteProduct: (productId: number) => void;
};

export default function ProductCard({
  product,
  onAddToCart,
  onEditProduct,
  onDeleteProduct,
}: ProductCardProps) {
  return (
    <div className="mb-4 border rounded-lg border-gray-300 p-4">
      <div className="flex md:items-center justify-between gap-1 flex-wrap">
        <div className="flex-shrink-0 mr-2">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-16 h-16 rounded-md"
          />
        </div>
        <div className="flex-1 mx-2 min-w-[90px]">
          <p className="font-bold">{product.name}</p>
          <p>{product.category}</p>
          <p className="font-bold">R$ {product.price.toFixed(2)}</p>
        </div>
        <div className="flex items-center flex-row">
          <Button
            onClick={() => onEditProduct(product)}
            variant="ghost"
            size="icon"
            className="text-blue-500 hover:text-blue-600"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => onDeleteProduct(product.id)}
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-1 md:flex-grow-0 items-center">
          <Button
            onClick={() => onAddToCart(product)}
            className="mx-1 my-1 flex-1"
          >
            <Plus className="mr-2 h-4 w-4" /> Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
}
