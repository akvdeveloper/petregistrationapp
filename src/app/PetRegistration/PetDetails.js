"use client"; // Important to include for client-side components

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import RightArrowButton from '@/components/ui/RightArrowButton'; // Import your arrow button component
import ProgressBar from '@/components/ui/ProgressBar';
import SelectionButton from '@/components/ui/SelectionButton';

const PetDetails = ({ register, errors }) => {
  const router = useRouter(); // Get the router object
  const [gender, setGender] = useState(null); // State for gender selection
  const [selectedPriceRange, setSelectedPriceRange] = useState(null); // State for selected price range

  // Array of price ranges
  const priceRanges = [
    { label: '1000 - 2000', value: 1000 },
    { label: '2000 - 4000', value: 2000 },
    { label: '4000 - 8000', value: 4000 },
  ];

  // Handle price range selection
  const handlePriceRangeClick = (amount) => {
    setSelectedPriceRange(amount); // Set the selected price range
  };

  // Handle "Next" button click to go to the next step
  const handleNextStep = (step) => {
    if (!gender || !selectedPriceRange) {
      console.log('Please select gender and price range before proceeding');
      return; // Don't navigate if gender or price range is not selected
    }
    console.log(`Navigating to step: ${step}`);
    router.push(`/PetRegistration?step=${step}`); // Navigate to the next step
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="w-full max-w-md">
        {/* Header with Progress Dots */}
        <div className="flex items-center justify-between mb-8">
          <ProgressBar currentStep={3} totalSteps={6} />
        </div>

        {/* Pet Details Form */}
        <div className="space-y-6">
          <div>
            <label className="block mb-2">Name Of Your Pet</label>
            <input
              type="text"
              placeholder="Your Pet Name"
              className="w-full bg-gray-800 rounded-md p-3 text-white"
              {...register('petName')} // Registering the pet name input
            />
            {errors.petName && <p className="text-red-500">{errors.petName.message}</p>}
          </div>

          {/* Gender Selection Section */}
          <h2 className="text md:text-3xl font-bold mb-6">Boy or Girl?</h2>
          <div className="grid grid-cols-2 gap-12">
            <SelectionButton 
              label="Male" 
              imageSrc="/img/icons/male.png" 
              onClick={() => {
                console.log('Male selected'); // Debugging
                setGender('male'); // Update gender state
              }} 
              isSelected={gender === 'male'} 
            />
            <SelectionButton 
              label="Female" 
              imageSrc="/img/icons/female.png" 
              onClick={() => {
                console.log('Female selected'); // Debugging
                setGender('female'); // Update gender state
              }} 
              isSelected={gender === 'female'} 
            />
          </div>

          {/* Price Input */}
          <div>
            <label className="block mb-2">Price</label>
            <input
              type="number"
              placeholder="000"
              className="w-full bg-gray-800 rounded-md p-3 text-white"
              {...register('price')} // Registering the price input
            />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}

            {/* Radio Buttons */}
            <div className="flex items-center space-x-2 my-4">
              <input
                type="radio"
                id="fixAmount"
                name="priceType"
                value="fixed"
                className="appearance-none h-4 w-4 border border-gray-400 rounded-full checked:bg-gray-800 checked:border-transparent focus:outline-none"
              />
              <label htmlFor="fixAmount">Fixed Amount</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="negotiableAmount"
                name="priceType"
                value="negotiable"
                className="appearance-none h-4 w-4 border border-gray-400 rounded-full checked:bg-gray-800 checked:border-transparent focus:outline-none"
              />
              <label htmlFor="negotiableAmount">Negotiable Amount</label>
            </div>

            {/* Price Range Buttons */}
            <div className="flex justify-between mt-2">
              {priceRanges.map((range) => (
                <button
                  key={range.value}
                  type="button" // Prevents default button behavior
                  className={`border-2 border-customGreen bg-gray-800 rounded-full px-4 py-2 ${selectedPriceRange === range.value ? 'bg-custom-green text-white' : 'text-gray-400'}`}
                  onClick={() => handlePriceRangeClick(range.value)} // Use the click handler
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => router.back()} // Go back to the previous step
            className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-2xl">←</span> {/* Back Arrow */}
          </button>

          {/* RightArrowButton should only call handleNextStep when clicked */}
          <RightArrowButton onClick={() => handleNextStep(4)} disabled={!gender || !selectedPriceRange} />
          {/* Pass the next step number */}
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
