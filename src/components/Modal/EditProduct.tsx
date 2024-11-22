import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { api } from '@/server/api';
import { Product } from '@/types';
import { useEffect } from 'react';
import { toast } from 'sonner';

type EditProductsDialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product?: any;
  setProducts: (products: Product[]) => void;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Nome do produto é obrigatório.',
  }),
  price: z.coerce.number().gte(0, {
    message: 'Preço do produto é obrigatório.',
  }),
  category: z.string().min(1, {
    message: 'Categoria do produto é obrigatória.',
  }),
  description: z.string().min(2, {
    message: 'Descrição do produto é obrigatória.',
  }),
  imageUrl: z.string().url({
    message: 'Link da imagem é inválido.',
  }),
});

const EditProductDialog: React.FC<EditProductsDialogProps> = ({
  isOpen,
  setIsOpen,
  product,
  setProducts,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || '',
      price: product?.price || 0,
      category: product?.category || '',
      description: product?.description || '',
      imageUrl: product?.imageUrl || '',
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        imageUrl: product.imageUrl,
      });
    }
  }, [product, form]);

  function handleSubmit(data: z.infer<typeof formSchema>) {
    api.put(`/api/products/${product.id}`, data).then(() => {
      try {
        api.get('/api/products').then((response: any) => {
          try {
            setProducts(response.data.products);
          } catch (error) {
            console.error('Failed to fetch products:', error);
          }
        });
      } catch (error) {
        toast.error('Erro ao editar o produto');
      }
    });
    toast.success('Produto editado com sucesso');
    setIsOpen(false);
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-xs sm:max-w-lg md:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id="form" onSubmit={form.handleSubmit(handleSubmit)} noValidate>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Pizza Margherita"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço (R$)</FormLabel>
                  <FormControl>
                    <Input
                      id="price"
                      type="number"
                      placeholder="R$ 25.99"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={'ENTRADA'}>Entrada</SelectItem>
                        <SelectItem value={'PRATO_PRINCIPAL'}>
                          Prato Principal
                        </SelectItem>
                        <SelectItem value={'BEBIDA'}>Bebida</SelectItem>
                        <SelectItem value={'SOBREMESA'}>Sobremesa</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link da Imagem</FormLabel>
                  <FormControl>
                    <Input value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="flex items-center justify-between flex-row p-2">
          <Button
            form="form"
            type="submit"
            className="w-fit bg-green-500 hover:bg-green-600 font-bold"
          >
            Salvar Alterações
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false);
              form.reset();
            }}
            className="w-fit bg-red-500 hover:bg-red-700 font-bold"
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
