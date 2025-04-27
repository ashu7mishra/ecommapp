import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully 👋');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="text-xl font-bold text-indigo-600 cursor-pointer" onClick={() => navigate('/')}>
        EcommApp
      </div>
      <div className="space-x-6">
        {token ? (
          <>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Dashboard
            </button>
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
              onClick={() => navigate('/register')}
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
