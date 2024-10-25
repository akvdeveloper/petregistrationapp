"use client"; // Required for client-side rendering

import React, { useState } from 'react';
import RightArrowButton from '@/components/ui/RightArrowButton'; // Adjust your import as necessary
import SelectionButton from '@/components/ui/SelectionButton'; // Adjust your import as necessary
import ProgressBar from '@/components/ui/ProgressBar'; // Adjust your import as necessary

const PetType = ({ nextStep, prevStep, formData, setPetData,setFormData }) => { // Receive setPetData prop

  const handleNextStep = () => {
    // Check if both selections are made before proceeding
    if (!formData?.selectedPetType || !formData?.selectedPetNature) {
      console.log('Please select both pet type and nature before proceeding');
      return; // Don't navigate if either is not selected
    }

    console.log('Navigating to next step');
    nextStep(); // Call the next function passed as a prop
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-black text-white">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
        <div className="flex items-center justify-between mb-8">
          <ProgressBar currentStep={2} totalSteps={6} />
        </div>

        <h2 className="text md:text-3xl font-bold mb-6">What Type Of Pet Do You Have?</h2>
        <div className="grid grid-cols-2 gap-4">
          <SelectionButton 
            label="DOG" 
            imageSrc="/img/icons/dog.png" 
            onClick={() => {
              setFormData((prevState)=>({
                ...prevState,
                selectedPetNature:"DOG"
              }))
            }}
            isSelected={formData?.selectedPetNature === 'DOG'}
          />
          <SelectionButton 
            label="CAT" 
            imageSrc="/img/icons/cat.png" 
            onClick={() => {
              setFormData((prevState)=>({
                ...prevState,
                selectedPetNature:"CAT"
              }))
            }}
            isSelected={formData?.selectedPetNature === 'CAT'}
          />
        </div>

        <h2 className="text md:text-2xl font-bold mb-6 mt-10">What Type of Pet Nature Do You Have?</h2>
        <div className="grid grid-cols-2 gap-4">
          <SelectionButton 
            label="FRIENDLY" 
            imageSrc="/img/icons/friendly.png"
            onClick={() => {
              setFormData((prevState)=>({
                ...prevState,
                selectedPetType:"FRIENDLY"
              }))
            }}
            isSelected={formData?.selectedPetType === 'FRIENDLY'}
          />
          <SelectionButton 
            label="AGGRESSIVE" 
            imageSrc="/img/icons/aggressive.png"
            onClick={() => {
              setFormData((prevState)=>({
                ...prevState,
                selectedPetType:"AGGRESSIVE"
              }))
            }}
            isSelected={formData?.selectedPetType === 'AGGRESSIVE'}
          />
        </div>

        <div className="flex justify-between mt-6">
          <button className="text-blue-500" onClick={prevStep}>Back</button>
          <RightArrowButton onClick={handleNextStep} /> {/* Trigger handleNextStep on click */}
        </div>
      </div>
    </div>
  );
};

export default PetType;
