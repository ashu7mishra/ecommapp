// src/api/cart.js
import axios from './axios';

// Add item to the cart
export const addToCart = async (productId, quantity = 1) => {
  const response = await axios.post('/api/cart/items/', {
    product_id: productId,
    quantity,
  });
  return response.data;
};

// Fetch the full cart
export const fetchCart = async () => {
  const response = await axios.get('/api/cart/');
  return response.data;
};

// Remove an item from the cart
export const removeCartItem = async (itemId) => {
  const response = await axios.delete(`/api/cart/items/${itemId}/`);
  return response.data;
};
