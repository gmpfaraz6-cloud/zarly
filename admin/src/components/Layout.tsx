import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import Button from './ui/Button';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  LogOut
} from 'lucide-react';

export default function Layout() {
  const { signOut, user } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border min-h-screen relative">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-primary">ShopFraz Admin</h1>
          </div>
          <nav className="px-4 space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
            >
              <Package className="w-5 h-5" />
              <span>Products</span>
            </Link>
            <Link
              to="/orders"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Orders</span>
            </Link>
            <Link
              to="/customers"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>Customers</span>
            </Link>
            <Link
              to="/inventory"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
            >
              <Package className="w-5 h-5" />
              <span>Inventory</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card">
            <div className="mb-4 px-4">
              <p className="text-sm font-medium">{user?.email}</p>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

