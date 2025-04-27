import React from 'react';
import Navbar from '../components/Navbar';

function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">Sign Up</h2>
          <form className="flex flex-col space-y-4">
            <input type="text" placeholder="Name" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" />
            <input type="email" placeholder="Email" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" />
            <input type="password" placeholder="Password" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" />
            <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
