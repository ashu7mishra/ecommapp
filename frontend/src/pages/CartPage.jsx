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
    if (newQty < 1){
     return;
     };
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
    const price = parseFloat(item?.product?.price ?? 0);
    const qty = parseInt(item?.quantity ?? 0, 10);
    return sum + price * qty;
  }, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🛒 Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="border border-gray-200 p-4 rounded-xl shadow-sm bg-white flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{item.product?.name ?? 'Unnamed Product'}</h2>
                <p className="text-gray-500">
                  Price: ₹{item.product?.price ? Number(item.product.price).toFixed(2) : '0.00'}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                  >
                    −
                  </button>
                  <span className="text-gray-800 font-medium">{item.quantity ?? 0}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 text-xl font-semibold text-gray-800">
            Total: ₹{Number(total).toFixed(2)}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={handleClearCart}
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-6 rounded-lg shadow"
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg shadow"
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
