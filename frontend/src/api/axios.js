import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
//   withCredentials: true,
});

// Add request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // ✅ Fixed here
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// Add response interceptor to refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem('refresh');
        if (!refresh) {
            throw new Error('No refresh token');
        }

        const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
          refresh: refresh,
        });

        const newAccessToken = res.data.access;
        localStorage.setItem('access', newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;  // ✅ Fixed here
        return api(originalRequest);
      } catch (refreshErr) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
