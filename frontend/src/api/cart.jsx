// src/api/cart.js
import axios from './axios';

export const addToCart = async (productId) => {
  return await axios.post('/api/cart/items/', { product_id: productId, quantity: 1 });
};

export const fetchCart = async () => {
  return await axios.get('/api/cart/');
};

export const removeCartItem = async (itemId) => {
  return await axios.delete(`/api/cart/items/${itemId}/`);
};
