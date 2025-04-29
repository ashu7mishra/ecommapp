import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'; // Backend running at this address


export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${BASE_URL}/products/`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// ⭐ NEW: Fetch Categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories/`); // Assuming /categories/ endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Add these two new functions:

export const updateProduct = async (id, productData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${BASE_URL}/products/${id}/`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };
  
  export const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `${BASE_URL}/products/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };
  