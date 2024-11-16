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
import { categories, type Product } from '../App';

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
  const handleSubmit = () => {
    if (editingProduct) {
      onEditProduct({ ...editingProduct, ...newProduct } as Product);
      setEditingProduct(null);
    } else {
      onAddProduct(newProduct);
    }
    setNewProduct({});
    setIsOpen(false);
  };

  const handleOpen = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setNewProduct({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        imageUrl: product.imageUrl,
      });
    } else {
      setEditingProduct(null);
      setNewProduct({});
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() =>
            handleOpen(editingProduct ? editingProduct : undefined)
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          {editingProduct ? 'Editar Produto' : 'Adicionar Produto'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {editingProduct ? 'Editar Produto' : 'Novo Produto'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
          <Button
            onClick={() => {
              setNewProduct({});
              setEditingProduct(null);
              setIsOpen(false);
            }}
          >
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductsDialog;
