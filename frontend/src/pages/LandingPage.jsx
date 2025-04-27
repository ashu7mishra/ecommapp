import React from 'react';
import Navbar from '../components/Navbar';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center text-center p-10">
        <div>
          <h1 className="text-5xl font-bold text-blue-700 mb-6">Welcome to EcommApp</h1>
          <p className="text-lg text-blue-500 mb-8">
            Your favorite place to buy fresh fruits, vegetables, and more!
          </p>
          <div className="space-x-4">
            <a href="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">Get Started</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
