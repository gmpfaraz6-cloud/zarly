import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { supabase } from '../../lib/supabase';
import { createOrder, createOrderItem, createCustomer } from '../../lib/supabase-queries';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getSubtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    country: '',
    postalCode: '',
    phone: ''
  });

  const subtotal = getSubtotal();
  const shipping = 10; // Fixed shipping for demo
  const tax = subtotal * 0.1; // 10% tax for demo
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setLoading(true);

    try {
      // Get store
      const { data: storeData } = await supabase
        .from('stores')
        .select('id')
        .limit(1)
        .single();

      if (!storeData) throw new Error('Store not found');

      // Create or get customer
      let customerId = null;
      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('id')
        .eq('store_id', storeData.id)
        .eq('email', formData.email)
        .single();

      if (existingCustomer) {
        customerId = existingCustomer.id;
      } else {
        const newCustomer = await createCustomer(storeData.id, {
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone
        });
        customerId = newCustomer.id;
      }

      // Generate order number
      const orderNumber = 'ORD-' + Date.now();

      // Create order
      const order = await createOrder(storeData.id, {
        customer_id: customerId,
        order_number: orderNumber,
        email: formData.email,
        financial_status: 'pending',
        fulfillment_status: 'unfulfilled',
        subtotal_price: subtotal,
        total_tax: tax,
        total_shipping: shipping,
        total_price: total,
        shipping_address_first_name: formData.firstName,
        shipping_address_last_name: formData.lastName,
        shipping_address_address1: formData.address1,
        shipping_address_address2: formData.address2,
        shipping_address_city: formData.city,
        shipping_address_province: formData.province,
        shipping_address_country: formData.country,
        shipping_address_postal_code: formData.postalCode,
        shipping_address_phone: formData.phone
      });

      // Create order items
      for (const item of cartItems) {
        const product = item.products;
        const variant = item.product_variants;
        const price = variant?.price || product?.price || 0;

        await createOrderItem(order.id, {
          product_id: item.product_id,
          variant_id: item.variant_id,
          title: product?.title || 'Product',
          variant_title: variant?.title,
          sku: variant?.sku,
          quantity: item.quantity,
          price: parseFloat(price),
          total: parseFloat(price) * item.quantity
        });
      }

      // Clear cart
      await clearCart();

      // Redirect to success page
      alert(`Order ${orderNumber} placed successfully!`);
      navigate('/');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-checkout">
        <h1>Your cart is empty</h1>
        <p>Add some products before checking out</p>
        <a href="/products" className="back-btn">Continue Shopping</a>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout-container">
        <div className="checkout-form">
          <h1>Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Contact Information</h2>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Shipping Address</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address *</label>
                <input
                  type="text"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Apartment, suite, etc.</label>
                <input
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State/Province</label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Postal Code *</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="place-order-btn" disabled={loading}>
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-items">
            {cartItems.map((item) => {
              const product = item.products;
              const variant = item.product_variants;
              const price = variant?.price || product?.price || 0;

              return (
                <div key={item.id} className="summary-item">
                  <div className="summary-item-info">
                    <span className="summary-item-title">{product?.title}</span>
                    <span className="summary-item-quantity">× {item.quantity}</span>
                  </div>
                  <span className="summary-item-price">
                    ${(parseFloat(price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

