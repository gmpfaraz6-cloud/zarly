import { Routes, Route } from 'react-router-dom';
import StorefrontLayout from '../storefront/components/StorefrontLayout';
import Home from '../storefront/pages/Home';
import ProductList from '../storefront/pages/ProductList';
import ProductDetail from '../storefront/pages/ProductDetail';
import Cart from '../storefront/pages/Cart';
import Checkout from '../storefront/pages/Checkout';
import Account from '../storefront/pages/Account';
import CollectionPage from '../storefront/pages/CollectionPage';

function StorefrontRoutes() {
  return (
    <StorefrontLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:handle" element={<ProductDetail />} />
        <Route path="/collections/:handle" element={<CollectionPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/*" element={<Account />} />
      </Routes>
    </StorefrontLayout>
  );
}

export default StorefrontRoutes;

