import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { OrderTable } from '@/types';

interface ViewOrderItemDialogProps {
  isOpenView: boolean;
  setIsOpenView: (isOpen: boolean) => void;
  order: OrderTable | null;
}

const ViewOrderItemDialog = ({
  isOpenView,
  setIsOpenView,
  order,
}: ViewOrderItemDialogProps) => {
  return (
    <Dialog open={isOpenView} onOpenChange={setIsOpenView}>
      <DialogContent className="w-[90%] min-w-[200px]  max-h-[500px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Itens do Pedido</DialogTitle>
        </DialogHeader>
        {!order ? (
          <div className="flex justify-center items-center h-full">
            <p>Carregando...</p>
          </div>
        ) : (
          <div className="space-y-4 flex flex-col">
            {order?.products.map((orderProduct, index) => {
              return (
                <div key={index} className="flex justify-between items-center">
                  <ul>
                    <li>
                      <b>Produto:</b> {orderProduct.name}
                    </li>
                    <li>
                      <b>Quantidade:</b> {orderProduct.quantity}
                    </li>
                    <li>
                      <b>Preço:</b> {orderProduct.price.toFixed(2)}
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewOrderItemDialog;
