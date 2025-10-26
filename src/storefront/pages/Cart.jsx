import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart() {
  const { cartItems, loading, updateItem, removeItem, getSubtotal } = useCart();

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateItem(itemId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeItem(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const subtotal = getSubtotal();

  if (loading) {
    return <div className="cart-loading">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-content">
          <h1>Your cart is empty</h1>
          <p>Add some products to get started</p>
          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-container">
        <h1>Shopping Cart</h1>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => {
              const product = item.products;
              const variant = item.product_variants;
              const price = variant?.price || product?.price || 0;
              const imageUrl = product?.product_images?.[0]?.url;

              return (
                <div key={item.id} className="cart-item">
                  <Link to={`/products/${product?.handle}`} className="item-image">
                    {imageUrl ? (
                      <img src={imageUrl} alt={product?.title} />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </Link>

                  <div className="item-details">
                    <Link to={`/products/${product?.handle}`} className="item-title">
                      {product?.title}
                    </Link>
                    {variant && variant.title !== 'Default Title' && (
                      <p className="item-variant">{variant.title}</p>
                    )}
                    <p className="item-price">${parseFloat(price).toFixed(2)}</p>
                  </div>

                  <div className="item-quantity">
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="quantity-input"
                    />
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>

                  <div className="item-total">
                    ${(parseFloat(price) * item.quantity).toFixed(2)}
                  </div>

                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="item-remove"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>

            <Link to="/products" className="continue-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

