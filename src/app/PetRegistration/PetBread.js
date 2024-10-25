"use client"; // Required for client-side rendering

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use useRouter from next/navigation
import ProgressBar from '@/components/ui/ProgressBar';
import RightArrowButton from '@/components/ui/RightArrowButton';

const PetBread = ({ nextStep, register, errors, setChecks, checks }) => {
  const router = useRouter(); // Initialize router

  // State to manage additional checks
  

  const handleCheckChange = (checkName, value) => {
    setChecks((prevChecks) => ({
      ...prevChecks,
      [checkName]: value,
    }));
  console.log(checkName,"checkName","value",value);

  };
  

  const handleNextStep = () => {
    // Optional: Include any validation logic here before proceeding to the next step
    if (!checks.kciCertified && !checks.microChip && !checks.vaccinated && !checks.healthCheckUp) {
      console.log('Please complete the additional checks before proceeding');
      return; // Don't navigate if no checks are completed
    }
    console.log('Navigating to next step');
    nextStep(); // Call the next function passed as a prop
  };
  console.log(checks,"checks255");

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-8">
          <ProgressBar currentStep={4} totalSteps={6} />
        </div>

        <h2 className="text-2xl font-bold mb-6">What's The Breed Of Your Pet?</h2>
        <div className="space-y-4 mb-6">
          {['Purebred', 'Crossbred (Mixed Breed)'].map((breed) => (
            <div className="flex items-center space-x-2" key={breed}>
              <input 
                type="checkbox" 
                id={breed} 
                {...register('breedType')} 
                className='appearance-none w-4 h-4 border-2 border-customGreen rounded-sm checked:bg-customGreen checked:border-transparent focus:outline-none' 
              />
              <label htmlFor={breed} className="cursor-pointer">{breed}</label>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <label className="block mb-2">Primary Breed</label>
          <select
            className="w-full bg-gray-800 rounded-md p-3 text-white"
            {...register('primaryBreed')}
          >
            <option value="">Select breed</option>
            <option value="labrador">Labrador</option>
            <option value="golden_retriever">Golden Retriever</option>
            <option value="german_shepherd">German Shepherd</option>
          </select>
        </div>

        <div className="space-y-4 mb-6">
          {['kciCertified', 'microChip', 'vaccinated', 'healthCheckUp'].map((item) => (
            <div key={item} className="flex flex-col mb-4">
              <span className="font-medium">
                {item.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </span>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`${item}-yes`}
                    name={item}
                    value="yes"
                    checked={checks[item] === 'yes'}
                    onChange={() => handleCheckChange(item, 'yes')}
                    className="appearance-none w-4 h-4 border-2 border-customGreen rounded-full checked:bg-customGreen focus:outline-none"
                  />
                  <label htmlFor={`${item}-yes`} className="ml-2 cursor-pointer">Yes</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`${item}-no`}
                    name={item}
                    value="no"
                    checked={checks[item] === 'no'}
                    onChange={() => handleCheckChange(item, 'no')}
                    className="appearance-none w-4 h-4 border-2 border-customGreen rounded-full checked:bg-customGreen focus:outline-none"
                  />
                  <label htmlFor={`${item}-no`} className="ml-2 cursor-pointer">No</label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button 
            className="text-blue-500" 
            onClick={() => router.back()} // Use router.back() to go to the previous page
          >
            Back
          </button>
          <RightArrowButton onClick={handleNextStep} />
        </div>
      </div>
    </div>
  );
};

export default PetBread;
