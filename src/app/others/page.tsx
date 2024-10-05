import React from 'react';

const WelcomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">
          Welcome to the System!
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          We are glad to have you on board. Explore your equipment and maintenance tasks.
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
