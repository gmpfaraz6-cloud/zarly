import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, User, Mail, ShoppingBag } from 'lucide-react';
import Input from '../components/ui/Input';
import Skeleton from '../components/Skeleton';
import { getCustomers, getCustomerOrders } from '../services/customers';
import toast from 'react-hot-toast';

export default function Customers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [customerOrders, setCustomerOrders] = useState<any[]>([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    if (selectedCustomer) {
      loadCustomerOrders(selectedCustomer);
    }
  }, [selectedCustomer]);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data || []);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const loadCustomerOrders = async (userId: string) => {
    try {
      const orders = await getCustomerOrders(userId);
      setCustomerOrders(orders || []);
    } catch (error: any) {
      toast.error('Failed to load customer orders');
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <Skeleton className="h-10 w-48 mb-8" />
        <div className="mb-6">
          <Skeleton className="h-10 w-64" />
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Customers</h1>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Joined</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer, index) => (
                    <motion.tr
                      key={customer.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`border-b border-border hover:bg-accent/50 cursor-pointer ${
                        selectedCustomer === customer.id ? 'bg-accent' : ''
                      }`}
                      onClick={() => setSelectedCustomer(customer.id)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {customer.user_metadata?.full_name || 'No name'}
                            </p>
                            <p className="text-sm text-muted-foreground font-mono">
                              {customer.id.slice(0, 8)}...
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          {customer.email}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(customer.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          className="text-primary hover:underline text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCustomer(customer.id);
                          }}
                        >
                          View Orders
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredCustomers.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                {searchTerm ? 'No customers found matching your search.' : 'No customers yet.'}
              </div>
            )}
          </div>
        </div>

        {selectedCustomer && (
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Customer Orders
              </h2>
              {customerOrders.length > 0 ? (
                <div className="space-y-4">
                  {customerOrders.map((order) => (
                    <div key={order.id} className="border-b border-border pb-4 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-sm">Order #{order.id.slice(0, 8)}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-primary">
                        ${order.total.toFixed(2)}
                      </p>
                      {order.order_items && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {order.order_items.length} item(s)
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No orders yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
