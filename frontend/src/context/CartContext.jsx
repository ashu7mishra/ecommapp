// src/contexts/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { fetchCart } from "../api/cart";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      setCartItems([]); // Clear cart for guests
      return;
    }

    try {
      const data = await fetchCart();
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Failed to fetch cart", err);
      setCartItems([]);
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
