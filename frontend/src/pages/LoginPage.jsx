import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);  // Save token
        navigate('/dashboard'); // Redirect to Dashboard
      } else {
        alert('Invalid credentials!');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">Login</h2>
          <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
            <input type="email" placeholder="Email" className="p-3 border rounded-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="p-3 border rounded-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
