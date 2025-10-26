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
  
  // Check if we're on an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  // If admin route, show admin UI
  if (isAdminRoute) {
    return (
      <Routes>
        <Route 
          path="/admin" 
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
          path="/admin/signup" 
          element={
            <AuthRoute>
              <SignUp />
            </AuthRoute>
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
        <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    );
  }

  // Otherwise, show storefront
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
