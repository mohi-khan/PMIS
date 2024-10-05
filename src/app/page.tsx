import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="container mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-transparent bg-clip-text">
            Welcome to the Periodic Equipment Management System
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            Efficiently manage your equipment inventory, track fuel consumption, meter readings, schedule preventive maintenance, and much more.
          </p>
        </div>

        {/* Image Placeholder */}
        <div className="mb-8 flex justify-center">
          <div className="w-1/2 h-64 bg-gray-300 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-gray-500 text-lg"> <img src="/heavy-equipment-brands.jpg" alt="Heavy Equipment Brands" className="w-full h-full object-cover" /></span>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-xl p-6 transform hover:scale-105 transition-transform">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-transparent bg-clip-text">
              Track & Manage Equipment
            </h2>
            <p className="text-gray-600">
              Create and manage an inventory of your equipment, monitor fuel consumption, and record daily running hours and mileage.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-xl p-6 transform hover:scale-105 transition-transform">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-transparent bg-clip-text">
              Preventive & Breakdown Maintenance
            </h2>
            <p className="text-gray-600">
              Schedule preventive maintenance tasks with automatic notifications, and track any breakdown or accident maintenance with spare parts usage and costs.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <a
            href="/myLog"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Log In to the System
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
