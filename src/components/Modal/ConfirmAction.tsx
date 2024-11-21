import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ConfirmActionDialogProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  text: string;
  handleDelete?: () => void;
}

const ConfirmActionDialog = ({
  open,
  setIsOpen,
  text,
  handleDelete,
}: ConfirmActionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{text}</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex items-center justify-end p-2">
          <DialogClose asChild>
            <Button
              onClick={handleDelete}
              className="w-fit bg-green-500 hover:bg-green-600 font-bold"
            >
              Sim
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="w-fit bg-red-500 hover:bg-red-700 font-bold"
              onClick={() => {
                setIsOpen(false);
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

export default ConfirmActionDialog;
