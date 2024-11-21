import { Button } from '../ui/button';

import type { User } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface FinishOrderProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  user: User;
}

const FinishOrder = ({ open, setIsOpen, user }: FinishOrderProps) => {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-xs sm:max-w-lg md:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Resumo do Pedido</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex items-center justify-end p-2">
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            className="w-fit bg-[#0088A1] hover:bg-[#009EBA] font-bold"
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

export default FinishOrder;
