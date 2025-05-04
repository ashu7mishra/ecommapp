// src/pages/CartPage.jsx
import React from 'react';
import { removeCartItem, updateCartItem } from '../api/cart';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { cartItems, reloadCart } = useCart();
  const navigate = useNavigate();

  const handleRemove = async (id) => {
    try {
      await removeCartItem(id);
      toast.success('Item removed');
      reloadCart();
    } catch {
      toast.error('Failed to remove');
    }
  };

  const handleQuantityChange = async (itemId, newQty) => {
    if (newQty < 1) return;
    try {
      await updateCartItem(itemId, { quantity: newQty });
      reloadCart();
    } catch {
      toast.error('Failed to update quantity');
    }
  };

  const handleClearCart = async () => {
    try {
      for (const item of cartItems) {
        await removeCartItem(item.id);
      }
      toast.success('Cart cleared');
      reloadCart();
    } catch {
      toast.error('Failed to clear cart');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const total = cartItems.reduce((sum, item) => {
    const price = item?.product?.price ?? 0;
    const qty = item?.quantity ?? 0;
    return sum + price * qty;
  }, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{item.product?.name ?? 'Unnamed Product'}</h2>
                <p>Price: ₹{item.product?.price ?? 0}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity ?? 0}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-4 font-bold text-lg">Total: ₹{total}</div>

          <div className="mt-6 flex justify-between gap-4">
            <button
              onClick={handleClearCart}
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
