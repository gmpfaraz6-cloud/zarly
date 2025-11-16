import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingCart as CartIcon, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useCartStore } from '../stores/cartStore';
import toast from 'react-hot-toast';

// Format price utility
function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      toast.success('Item removed from cart');
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <CartIcon className="w-24 h-24 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Start shopping to add items to your cart
          </p>
          <Link to="/products">
            <Button>
              <ArrowRight className="w-4 h-4 mr-2" />
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-lg border border-border p-6 flex flex-col sm:flex-row gap-4"
            >
              {item.product.images && item.product.images.length > 0 && (
                <Link to={`/products/${item.product.id}`}>
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg"
                  />
                </Link>
              )}
              <div className="flex-1">
                <Link to={`/products/${item.product.id}`}>
                  <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                    {item.product.name}
                  </h3>
                </Link>
                <p className="text-lg font-bold text-primary mb-4">
                  {formatPrice(item.product.price)}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 border border-input rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      removeItem(item.product.id);
                      toast.success('Item removed');
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.quantity} × {formatPrice(item.product.price)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">Free (COD)</span>
              </div>
              <div className="border-t border-border pt-4 flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold text-primary">{formatPrice(total)}</span>
              </div>
            </div>
            <Button className="w-full mb-4" size="lg" onClick={handleCheckout}>
              Proceed to Checkout
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" className="w-full" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
