import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext'; // 🆕 Import CartProvider

function App() {
  return (
    <CartProvider> {/* 🆕 Wrap everything with CartProvider */}
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/:userId" element={<DashboardPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
