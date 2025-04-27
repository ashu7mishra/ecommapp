import React from 'react';
import Navbar from '../components/Navbar';

function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow p-10">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Dashboard</h1>
        <p className="text-gray-600">Welcome to your dashboard. Here you can manage your orders, profile, and more!</p>
      </div>
    </div>
  );
}

export default DashboardPage;
