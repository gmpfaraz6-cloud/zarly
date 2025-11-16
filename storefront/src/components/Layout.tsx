import { Outlet, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';
import { ShoppingCart, User, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const { user } = useAuthStore();
  const { getItemCount } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItemCount = getItemCount();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold text-primary">
              ShopFraz
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/products" className="hover:text-primary transition-colors">
                Products
              </Link>
              <Link to="/cart" className="relative hover:text-primary transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              {user ? (
                <Link to="/orders" className="hover:text-primary transition-colors">
                  <User className="w-5 h-5" />
                </Link>
              ) : (
                <>
                  <Link to="/login" className="hover:text-primary transition-colors">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-4">
                <Link to="/products" className="hover:text-primary transition-colors">
                  Products
                </Link>
                <Link to="/cart" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  Cart {cartItemCount > 0 && `(${cartItemCount})`}
                </Link>
                {user ? (
                  <Link to="/orders" className="hover:text-primary transition-colors">
                    My Orders
                  </Link>
                ) : (
                  <>
                    <Link to="/login" className="hover:text-primary transition-colors">
                      Login
                    </Link>
                    <Link to="/signup" className="hover:text-primary transition-colors">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-auto py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 ShopFraz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

