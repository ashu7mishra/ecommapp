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
