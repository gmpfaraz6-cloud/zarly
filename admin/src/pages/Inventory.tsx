import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, AlertTriangle, Search, TrendingDown } from 'lucide-react';
import Input from '../components/ui/Input';
import Skeleton from '../components/Skeleton';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface InventoryItem {
  id: string;
  product_id: string;
  stock_quantity: number;
  low_stock_threshold: number;
  products?: {
    name: string;
    price: number;
    images: string[];
  };
}

export default function Inventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('inventory')
        .select('*, products(name, price, images)')
        .order('stock_quantity', { ascending: true });

      if (error) throw error;
      setInventory(data || []);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  const filteredInventory = inventory.filter((item) =>
    item.products?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.product_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockItems = filteredInventory.filter(
    (item) => item.stock_quantity <= item.low_stock_threshold
  );

  if (loading) {
    return (
      <div>
        <Skeleton className="h-10 w-64 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
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
        <h1 className="text-3xl font-bold">Inventory Management</h1>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <div>
            <p className="font-medium text-yellow-800">
              Low Stock Alert: {lowStockItems.length} product(s) below threshold
            </p>
            <p className="text-sm text-yellow-600">
              Consider restocking these items soon
            </p>
          </div>
        </motion.div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg border border-border p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Products</p>
              <p className="text-2xl font-bold">{inventory.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-lg border border-border p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Low Stock Items</p>
              <p className="text-2xl font-bold text-yellow-600">{lowStockItems.length}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-yellow-600" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-lg border border-border p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Stock Value</p>
              <p className="text-2xl font-bold">
                ${inventory.reduce((sum, item) => {
                  const price = item.products?.price || 0;
                  return sum + (price * item.stock_quantity);
                }, 0).toFixed(2)}
              </p>
            </div>
            <Package className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium">Product</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Stock Quantity</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Low Stock Threshold</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item, index) => {
                const isLowStock = item.stock_quantity <= item.low_stock_threshold;
                const itemValue = (item.products?.price || 0) * item.stock_quantity;

                return (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border-b border-border hover:bg-accent/50 ${
                      isLowStock ? 'bg-yellow-50/50' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {item.products?.images && item.products.images.length > 0 && (
                          <img
                            src={item.products.images[0]}
                            alt={item.products.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium">{item.products?.name || 'Unknown Product'}</p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {item.product_id.slice(0, 8)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${
                        isLowStock ? 'text-yellow-600' : item.stock_quantity === 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {item.stock_quantity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {item.low_stock_threshold}
                    </td>
                    <td className="py-3 px-4">
                      {item.stock_quantity === 0 ? (
                        <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-800">
                          Out of Stock
                        </span>
                      ) : isLowStock ? (
                        <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">
                          Low Stock
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      ${itemValue.toFixed(2)}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredInventory.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            {searchTerm ? 'No inventory items found matching your search.' : 'No inventory items yet.'}
          </div>
        )}
      </div>
    </div>
  );
}

