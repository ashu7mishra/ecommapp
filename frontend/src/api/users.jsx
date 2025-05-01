import axios from './axios';

export const fetchCurrentUser = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('/api/self/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
