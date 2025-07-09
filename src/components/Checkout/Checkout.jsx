import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeFromCart } from '../../redux/slices/cartSlice';
import Swal from 'sweetalert2'; // ✅ SweetAlert2

const Checkout = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', city: '', postalCode: '' });
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load product. Please check the product ID or try again later.');
        setProduct(null);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handlePurchase = () => {
    if (cartItems.length > 0 || product) {
      if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.city || !shippingInfo.postalCode) {
        Swal.fire({
          icon: 'warning',
          title: 'Missing Details',
          text: 'Please fill in all shipping details before proceeding.',
          confirmButtonColor: '#f39c12'
        });
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Purchase Successful!',
        text: 'Thank you for shopping with us.',
        confirmButtonColor: '#2ecc71'
      });

      dispatch(clearCart());
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Cart is Empty',
        text: 'No items in cart to purchase.',
        confirmButtonColor: '#e74c3c'
      });
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart({ id: itemId }));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) || (product ? product.price : 0);

  if (!id && cartItems.length === 0) return <div style={styles.error}>No product ID or items in cart provided. Please select a product or add items to cart.</div>;
  if (error) return <div style={styles.error}>{error}</div>;
  if (!product && cartItems.length === 0) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <style>
        {`
          @media (max-width: 768px) {
            .checkout-section { flex-direction: column; gap: 20px; }
            .cart-items, .shipping-details, .payment-section { width: 100%; }
          }
          @media (min-width: 769px) {
            .checkout-section { flex-direction: row; gap: 30px; }
            .cart-items, .shipping-details, .payment-section { width: 33.33%; }
          }
        `}
      </style>
      <h1 style={styles.header}>Checkout</h1>
      <div className="checkout-section" style={styles.checkoutSection}>
        <div className="cart-items" style={styles.cartItems}>
          <h2 style={styles.subHeader}>Cart Items</h2>
          {cartItems.length > 0 ? (
            <div style={styles.itemList}>
              {cartItems.map((item) => (
                <div key={item.id} style={styles.item}>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    style={styles.removeButton}
                    onMouseOver={(e) => (e.target.style.background = styles.removeButtonHover.background)}
                    onMouseOut={(e) => (e.target.style.background = styles.removeButton.background)}
                  >
                    Remove
                  </button>
                  <span style={styles.itemName}>{item.name} (x{item.quantity})</span>
                  <span style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          ) : product ? (
            <div style={styles.itemList}>
              <div style={styles.item}>
                <span style={styles.itemName}>{product.name}</span>
                <span style={styles.itemPrice}>${product.price}</span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="shipping-details" style={styles.shippingDetails}>
          <h2 style={styles.subHeader}>Shipping Details</h2>
          <input type="text" placeholder="Full Name" value={shippingInfo.name} onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })} style={styles.input} />
          <input type="text" placeholder="Address" value={shippingInfo.address} onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })} style={styles.input} />
          <input type="text" placeholder="City" value={shippingInfo.city} onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })} style={styles.input} />
          <input type="text" placeholder="Postal Code" value={shippingInfo.postalCode} onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })} style={styles.input} />
        </div>

        <div className="payment-section" style={styles.paymentSection}>
          <h2 style={styles.subHeader}>Payment & Total</h2>
          <p style={styles.total}>Total: <span style={styles.totalAmount}>${total.toFixed(2)}</span></p>
          <button style={styles.purchaseButton} onClick={handlePurchase}>
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '50px auto',
    padding: '20px',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    color: '#2c3e50',
    fontSize: '2.5rem',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '30px',
  },
  checkoutSection: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
  },
  cartItems: {
    background: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  },
  subHeader: {
    color: '#34495e',
    fontSize: '1.5rem',
    fontWeight: '500',
    marginBottom: '15px',
  },
  itemList: {
    maxHeight: '300px',
    overflowY: 'auto',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
  },
  itemName: {
    color: '#7f8c8d',
    fontSize: '1rem',
    marginLeft: '10px',
  },
  itemPrice: {
    color: '#2c3e50',
    fontWeight: '600',
    fontSize: '1rem',
  },
  shippingDetails: {
    background: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    color: '#34495e',
  },
  paymentSection: {
    background: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  },
  total: {
    fontSize: '1.2rem',
    color: '#34495e',
    marginBottom: '20px',
  },
  totalAmount: {
    fontWeight: '700',
    color: '#2c3e50',
  },
  purchaseButton: {
    width: '100%',
    padding: '12px',
    background: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    fontSize: '1.1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  purchaseButtonHover: {
    background: '#27ae60',
  },
  removeButton: {
    padding: '5px 10px',
    background: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '15px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  removeButtonHover: {
    background: '#c0392b',
  },
  error: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    background: '#ffebee',
    color: '#c62828',
    borderRadius: '5px',
    textAlign: 'center',
  },
  loading: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    color: '#7f8c8d',
    textAlign: 'center',
  },
};

export default Checkout;
