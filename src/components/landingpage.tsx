import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Periodic Schedule Maintenance System
        </h1>
        <p className="text-xl text-gray-600 max-w-xl mx-auto">
          Efficiently manage your equipment with automated scheduling, fuel consumption tracking, and maintenance records. Generate detailed reports and keep a log of all maintenance activities, ensuring optimal performance and cost-efficiency.
        </p>
      </header>

      <main className="flex flex-col items-center">
        <section className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Key Features
          </h2>
          <ul className="text-gray-600 space-y-2">
            <li>✅ Track fuel consumption and performance</li>
            <li>✅ Manage periodic and reactive maintenance</li>
            <li>✅ Automatic maintenance reminders and scheduling</li>
            <li>✅ Record daily logbooks and maintenance expenses</li>
            <li>✅ Generate detailed reports on fuel performance and maintenance</li>
          </ul>
        </section>

        <section className="bg-gray-200 shadow-md rounded-lg p-8 max-w-2xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-600">
            Our system streamlines the process of maintaining your equipment, helping you reduce downtime, optimize performance, and keep accurate records. With automated notifications and detailed reports, managing your equipment has never been easier.
          </p>
        </section>
      </main>

      <footer className="mt-16">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Periodic Schedule Maintenance System. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
