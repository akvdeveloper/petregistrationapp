import React from 'react';

const ProgressBar = ({ totalSteps, currentStep }) => {
  return (
    <div className="flex items-center justify-between">
      {/* Step Indicator */}
      <div className="flex">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full mx-1 ${
              i < currentStep ? 'bg-green-500' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
