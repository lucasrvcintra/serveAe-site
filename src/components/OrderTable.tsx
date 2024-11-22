import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { api } from '@/server/api';
import { OrderTable as Order } from '@/types';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ShoppingBag } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import ViewOrderItemDialog from './Modal/ViewOrderItem';
import { toast } from 'sonner';

const OrderTable = () => {
  const [isViewProductOpen, setIsViewProductOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        toast.error('Erro ao carregar os pedidos');
      }
    };

    fetchOrders();
  }, []);

  async function handleViewOrderDetails(id: string) {
    try {
      const response = await api.get(`/api/orders/${id}`);
      setOrder(response.data);
      setIsViewProductOpen(true);
    } catch (error) {
      console.error('Failed to fetch order items:', error);
      toast.error('Erro ao carregar os itens do pedido');
    }
  }

  return (
    <>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Preço Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead>Itens</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>R$ {order.totalPrice?.toFixed(2) || '0.00'}</TableCell>
              <TableCell>{order.status || 'Desconhecido'}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleViewOrderDetails(order.id)}
                        className="h-8 w-8 hover:bg-[#FF9000]"
                      >
                        <ShoppingBag size={4} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div>Ver Itens</div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ViewOrderItemDialog
        isOpenView={isViewProductOpen}
        setIsOpenView={setIsViewProductOpen}
        order={order}
      />
    </>
  );
};

export default OrderTable;
