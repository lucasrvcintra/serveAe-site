import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '@/server/api';
import type { User } from '@/types';

interface RegisterClientDialogProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  setUser: (user: User) => void;
  setIsOpenFinishOrder: (open: boolean) => void;
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  email: z.string({ message: 'Email é obrigatório' }).email({
    message: 'Email inválido.',
  }),
  address: z.string().min(2),
  phone: z
    .string({ message: 'Telefone é obrigatório' })
    .regex(/^\d{9,14}$/, {
      message: 'Formato inválido. Deve conter apenas números.',
    })
    .min(9, { message: 'Deve ter no mínimo 9 caracteres' })
    .max(14, { message: 'Deve ter no máximo 14 caracteres' }),
});

const RegisterCLientDialog = ({
  open,
  setIsOpen,
  setUser,
  setIsOpenFinishOrder,
}: RegisterClientDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      phone: '',
    },
  });

  function handleSubmit(data: z.infer<typeof formSchema>) {
    api.post('/api/auth/register', data).then((response: any) => {
      try {
        setUser(response.data.user);
      } catch (err) {
        console.log('Failed to create user', err);
      }
    });
    setIsOpen(false);
    setIsOpenFinishOrder(true);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-xs sm:max-w-lg md:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Cadastrar</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id="form" onSubmit={form.handleSubmit(handleSubmit)} noValidate>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome:</FormLabel>
                  <FormControl>
                    <Input
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@email.com"
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Rua, número, complemento"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Telefone"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter className="flex items-center justify-end p-2">
          <Button
            form="form"
            type="submit"
            className="w-fit bg-green-500 hover:bg-green-600 font-bold"
          >
            Cadastrar
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

export default RegisterCLientDialog;
