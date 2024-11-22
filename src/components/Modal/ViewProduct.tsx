import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useEffect, useState } from 'react';

type ViewProductDialogProps = {
  isOpenView: boolean;
  setIsOpenView: (open: boolean) => void;
  product: Product | null;
};

const ViewProductDialog: React.FC<ViewProductDialogProps> = ({
  isOpenView,
  setIsOpenView,
  product,
}) => {
  if (!product) return null;

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
  });
  return (
    <Dialog open={isOpenView} onOpenChange={setIsOpenView}>
      <DialogContent className="max-w-xs sm:max-w-lg md:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Produto</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 flex flex-col items-start justify-start">
          <div>
            <h2 className="font-semibold text-lg">Nome</h2>
            <p>{product.name}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Preço</h2>
            <p>R$ {product.price.toFixed(2)}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Categoria</h2>
            <p>{category}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Descrição</h2>
            <p>{product.description}</p>
          </div>
          <div className="w-full">
            <h2 className="font-semibold text-lg">Imagem</h2>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-[300px] rounded-lg border object-cover"
            />
          </div>
        </div>
        <DialogFooter className="flex items-center justify-end p-2">
          <Button
            onClick={() => setIsOpenView(false)}
            className="w-fit bg-[#0088A1] hover:bg-[#009EBA] font-bold"
          >
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProductDialog;
