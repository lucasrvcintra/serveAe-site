import { DialogContent } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from '../ui/dialog';

interface FinishOrderProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
}

const FinishOrder = ({ open, setIsOpen }: FinishOrderProps) => {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      {/* <DialogTrigger asChild>
        <Button className="w-fit bg-[#0088A1] hover:bg-[#009EBA] font-bold">
          Finalizar Pedido
        </Button>
      </DialogTrigger> */}
      <DialogContent className="max-w-xs sm:max-w-lg md:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Já tem conta?</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex items-center justify-end p-2">
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            className="w-fit bg-green-500 hover:bg-green-600 font-bold"
          >
            Sim
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            className="w-fit bg-red-500 hover:bg-red-700 font-bold"
          >
            Não
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FinishOrder;
