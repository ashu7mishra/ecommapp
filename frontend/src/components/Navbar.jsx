// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access');
  const { cartItems, reloadCart } = useCart();

  const handleLogout = () => {
    localStorage.removeItem('access');
    reloadCart(); // Refresh cart after logout
    toast.success('Logged out successfully 👋');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div
        className="text-xl font-bold text-indigo-600 cursor-pointer"
        onClick={() => navigate('/')}
      >
        EcommApp
      </div>

      <div className="flex items-center space-x-6">
        {token ? (
          <>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Dashboard
            </button>

            {/* Cart Icon */}
            <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-indigo-600 transition" />
              {cartItems?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
