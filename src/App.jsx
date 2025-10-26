import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import StorefrontRoutes from './routes/StorefrontRoutes';

// Component to handle redirects if user is already logged in
function AuthRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#6D7175'
      }}>
        Loading...
      </div>
    );
  }

  // Only redirect to dashboard if on auth pages (signin/signup)
  if (user && (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/admin')) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}

function AppRoutes() {
  const location = useLocation();
  const hostname = window.location.hostname;
  
  // Check if accessing admin domain or /admin path
  // Admin domains: admin.zarly.com, admin.yourdomain.com, or localhost/admin
  const isAdminDomain = hostname.startsWith('admin.') || 
                        hostname.includes('admin') ||
                        location.pathname.startsWith('/admin');

  // If admin domain or admin route, show admin UI
  if (isAdminDomain) {
    return (
      <Routes>
        <Route 
          path="/" 
          element={
            <AuthRoute>
              <SignIn />
            </AuthRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <AuthRoute>
              <SignIn />
            </AuthRoute>
          } 
        />
        <Route 
          path="/signin" 
          element={
            <AuthRoute>
              <SignIn />
            </AuthRoute>
          } 
        />
        <Route 
          path="/admin/signin" 
          element={
            <AuthRoute>
              <SignIn />
            </AuthRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <AuthRoute>
              <SignUp />
            </AuthRoute>
          } 
        />
        <Route 
          path="/admin/signup" 
          element={
            <AuthRoute>
              <SignUp />
            </AuthRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    );
  }

  // Otherwise, show storefront (for store domains like zarly.store)
  return <StorefrontRoutes />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
