import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories, Product } from '../types';
import { useEffect } from 'react';

type ProductsDialogProps = {
  onAddProduct: (product: Partial<Product>) => void;
  onEditProduct: (product: Product) => void;
  newProduct: Partial<Product>;
  setNewProduct: React.Dispatch<React.SetStateAction<Partial<Product>>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingProduct: Product | null;
  setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>;
};

const ProductsDialog: React.FC<ProductsDialogProps> = ({
  onAddProduct,
  onEditProduct,
  newProduct,
  setNewProduct,
  isOpen,
  setIsOpen,
  editingProduct,
  setEditingProduct,
}) => {
  useEffect(() => {
    if (isOpen && editingProduct) {
      setNewProduct(editingProduct);
    } else if (!isOpen) {
      setNewProduct({});
      setEditingProduct(null);
    }
  }, [isOpen, editingProduct, setNewProduct, setEditingProduct]);

  const handleSubmit = () => {
    if (editingProduct) {
      onEditProduct({
        ...editingProduct,
        ...newProduct,
      });
    } else {
      onAddProduct(newProduct);
    }
    setNewProduct({});
    setEditingProduct(null);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mx-2" />
          Adicionar Produto
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {editingProduct ? 'Editar Produto' : 'Novo Produto'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nome do Produto</Label>
            <Input
              id="name"
              value={newProduct.name || ''}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="price">Preço (R$)</Label>
            <Input
              id="price"
              type="number"
              value={newProduct.price || ''}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={newProduct.category || ''}
              onValueChange={(value) =>
                setNewProduct({ ...newProduct, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={newProduct.description || ''}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="imageUrl">URL da Imagem</Label>
            <Input
              id="imageUrl"
              value={newProduct.imageUrl || ''}
              onChange={(e) =>
                setNewProduct({ ...newProduct, imageUrl: e.target.value })
              }
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">
            {editingProduct ? 'Salvar Alterações' : 'Adicionar Produto'}
          </Button>
        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductsDialog;
