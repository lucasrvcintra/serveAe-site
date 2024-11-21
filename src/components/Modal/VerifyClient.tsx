import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface VerifyClientDialogProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  setIsOpenRegister: (open: boolean) => void;
  setIsOpenConfirmClient: (open: boolean) => void;
}

const VerifyClientDialog = ({
  open,
  setIsOpen,
  setIsOpenRegister,
  setIsOpenConfirmClient,
}: VerifyClientDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Já tem conta?</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex items-center justify-end p-2">
          <DialogClose asChild>
            <Button
              onClick={() => {
                setIsOpenConfirmClient(true);
              }}
              className="w-fit bg-green-500 hover:bg-green-600 font-bold"
            >
              Sim
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="w-fit bg-red-500 hover:bg-red-700 font-bold"
              onClick={() => {
                setIsOpenRegister(true);
              }}
            >
              Não
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyClientDialog;
