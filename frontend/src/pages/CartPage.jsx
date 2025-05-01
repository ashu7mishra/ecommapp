// src/pages/CartPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchCart, removeCartItem } from '../api/cart';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const response = await fetchCart();
      setCartItems(response.data);
    } catch (err) {
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeCartItem(id);
      toast.success('Item removed');
      loadCart();
    } catch {
      toast.error('Failed to remove');
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg flex justify-between">
              <div>
                <h2 className="font-semibold">{item.product.name}</h2>
                <p>Price: ₹{item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 font-bold text-lg">
            Total: ₹{total}
          </div>
          <button
            onClick={() => toast.success('Checkout not implemented yet')}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
