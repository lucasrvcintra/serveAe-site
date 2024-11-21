import { Button } from '@/components/ui/button';
import { Edit, ShoppingCart, Trash2 } from 'lucide-react';
import EditProductDialog from './Modal/EditProduct';
import { useEffect, useState } from 'react';
import { api } from '@/server/api';
import { Product } from '@/types';
import ViewProductDialog from './Modal/ViewProduct';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import ConfirmActionDialog from './Modal/ConfirmAction';

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    imageUrl: string;
  };
  setProducts: (products: Product[]) => void;
  handleAddToCart: (product: Product) => void;
};

export default function ProductCard({
  product,
  setProducts,
  handleAddToCart,
}: ProductCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirmAction, setIsOpenConfirmAction] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (product.category === 'ENTRADA') {
      setCategory('Entrada');
    } else if (product.category === 'PRATO_PRINCIPAL') {
      setCategory('Prato Principal');
    } else if (product.category === 'BEBIDA') {
      setCategory('Bebida');
    } else if (product.category === 'SOBREMESA') {
      setCategory('Sobremesa');
    }
  }, [product]);

  function handleDelete() {
    try {
      api.delete(`/api/products/${product.id}`).then(() => {
        try {
          api.get('/api/products').then((response: any) => {
            setProducts(response.data.products);
          });
        } catch (error) {
          console.error('Failed to fetch products:', error);
        }
      });
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
    setIsOpenConfirmAction(false);
  }
  return (
    <>
      <div className="border rounded-lg border-gray-400 p-1 w-full ">
        <div className="flex md:items-center justify-between gap-1 flex-wrap">
          <div
            className="hover:backdrop-brightness-[.8] hover:rounded-lg hover:cursor-pointer p-4 flex flex-1 flex-row flex-wrap"
            onClick={() => setIsOpenView(true)}
          >
            <div className="flex-shrink-0 mr-2">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-16 h-16 rounded-md"
              />
            </div>
            <div className="flex-1 mx-2 min-w-[90px]">
              <p className="font-bold">{product.name}</p>
              <p>{category}</p>
              <p className="font-bold">R$ {product.price.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center flex-row ">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {
                      setIsOpen(true);
                    }}
                    variant="ghost"
                    size="icon"
                    className="text-[#0088A1] hover:text-[#009EBA]"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div>Editar produto</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setIsOpenConfirmAction(true)}
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-red-600">
                  <div>Excluir produto</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-1 md:flex-grow-0 items-center ">
            <Button
              onClick={() => handleAddToCart(product)}
              className="mx-1 my-1 flex-1 bg-[#FF9000] hover:bg-green-600 font-bold"
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Adicionar
            </Button>
          </div>
        </div>
      </div>
      <ViewProductDialog
        isOpenView={isOpenView}
        setIsOpenView={setIsOpenView}
        product={product}
      />
      <EditProductDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        product={product}
        setProducts={setProducts}
      />
      <ConfirmActionDialog
        open={isOpenConfirmAction}
        setIsOpen={setIsOpenConfirmAction}
        text="Realmente deseja excluir produto?"
        handleDelete={handleDelete}
      />
    </>
  );
}
