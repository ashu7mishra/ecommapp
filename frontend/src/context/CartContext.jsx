// src/contexts/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { fetchCart } from "../api/cart"; // Updated to match cart.js

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
    try {
      const data = await fetchCart();
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, reloadCart: loadCart }}>
      {children}
    </CartContext.Provider>
  );
};
