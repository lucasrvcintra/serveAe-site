import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/server/api';
import type { User } from '@/types';

interface ConfirmClientDialogProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  setUser: (user: User) => void;
  setIsOpenFinishOrder: (open: boolean) => void;
}

const formSchema = z.object({
  email: z.string().email({
    message: 'Email inválido.',
  }),
});

const ConfirmClientDialog = ({
  open,
  setIsOpen,
  setUser,
  setIsOpenFinishOrder,
}: ConfirmClientDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  function handleSubmit(data: z.infer<typeof formSchema>) {
    const { email } = data;
    api
      .get(`/api/user/${email}`)
      .then((response: any) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch user:', error);
      });
    if (data) {
      setIsOpenFinishOrder(true);
    } else {
      console.log('Cliente não cadastrado');
    }
    setIsOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-xs sm:max-w-lg md:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Finalizar Pedido</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id="form" onSubmit={form.handleSubmit(handleSubmit)} noValidate>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirme seu Email</FormLabel>
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
          </form>
        </Form>

        <DialogFooter className="flex items-center justify-end p-2">
          <Button
            form="form"
            type="submit"
            className="w-fit bg-green-500 hover:bg-green-600 font-bold"
          >
            Confirmar
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false);
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

export default ConfirmClientDialog;
