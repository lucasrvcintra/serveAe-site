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
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex-shrink-0 mr-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-16 h-16 rounded-md"
          />
        </div>
        <div className="flex-1 ml-8">
          <p className="font-bold">{product.name}</p>
          <p>{product.category}</p>
          <p className="font-bold">R$ {product.price.toFixed(2)}</p>
        </div>
        <div className="flex space-x-2">
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
          <Button
            onClick={() => onAddToCart(product)}
            className="ml-2 mt-2 md:flex-grow-0 md:mt-0"
          >
            <Plus className="mr-2 h-4 w-4" /> Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
}
