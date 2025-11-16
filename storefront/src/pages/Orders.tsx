import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { getUserOrders, type Order } from '../services/orders';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

// Format price utility
function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

const statusIcons = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
};

const statusColors = {
  pending: 'text-yellow-600 bg-yellow-100',
  processing: 'text-blue-600 bg-blue-100',
  shipped: 'text-purple-600 bg-purple-100',
  delivered: 'text-green-600 bg-green-100',
  cancelled: 'text-red-600 bg-red-100',
};

export default function Orders() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getUserOrders();
      setOrders(data || []);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Please login to view your orders</p>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg border border-border">
          <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-xl font-semibold mb-2">No orders yet</p>
          <p className="text-muted-foreground mb-6">
            Start shopping to see your orders here
          </p>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => {
            const StatusIcon = statusIcons[order.status];
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-lg border border-border p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <StatusIcon className={`w-5 h-5 ${statusColors[order.status].split(' ')[0]}`} />
                      <h3 className="text-lg font-semibold">
                        Order #{order.id.slice(0, 8).toUpperCase()}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(order.created_at || '').toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary mb-2">
                      {formatPrice(order.total)}
                    </p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                {order.order_items && order.order_items.length > 0 && (
                  <div className="border-t border-border pt-4">
                    <h4 className="font-medium mb-3">Items:</h4>
                    <div className="space-y-2">
                      {order.order_items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.products?.name || 'Product'} × {item.quantity}
                          </span>
                          <span className="font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {order.shipping_address && (
                  <div className="border-t border-border pt-4 mt-4">
                    <h4 className="font-medium mb-2">Shipping Address:</h4>
                    <p className="text-sm text-muted-foreground">
                      {order.shipping_address.fullName}
                      <br />
                      {order.shipping_address.street}
                      <br />
                      {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
