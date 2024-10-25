"use client"; // Required for client-side rendering
import React from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/ui/ProgressBar';
import RightArrowButton from '@/components/ui/RightArrowButton';

const PetSize = ({ prevStep, nextStep, register, errors, petData, setPetData }) => {
  const router = useRouter();

  // Handle input changes and update petData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    // Check if required fields are filled before navigating to the next step
    if (!petData.size || !petData.weight || !petData.behavior || !petData.dob) {
      console.log('Please fill in all required fields before proceeding');
      return; // Don't navigate if fields are incomplete
    }
    nextStep(); // Call the next function passed as a prop
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-black text-white">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
        <div className="flex items-center justify-between mb-8">
          <ProgressBar currentStep={5} totalSteps={6} />
        </div>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-lg md:text-xl">How Big Is Your Pet?</label>
            <div className="inline-flex justify-between space-x-4">
              {['Small', 'Medium', 'Large'].map((size) => (
                <label key={size} className="flex items-center">
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    className="appearance-none w-4 h-4 border-2 border-customGreen rounded-full checked:bg-customGreen focus:outline-none mr-2"
                    onChange={handleChange}
                    {...register('size', { required: true })}
                  />
                  <span className="text-lg">{size}</span>
                </label>
              ))}
            </div>
            {errors.size && <p className="text-red-500">{errors.size.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-lg md:text-xl">Date Of Birth</label>
            <input
              type="date"
              className="w-full bg-gray-800 rounded-md p-3 text-white"
              {...register('dob', { required: true })}
              onChange={handleChange} // Handle date change
            />
            {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-lg md:text-xl">Weight Of Pet</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="0"
                name="weight"
                className="w-1/2 bg-gray-800 rounded-md p-3 text-white"
                {...register('weight', { required: true })}
                onChange={handleChange}
              />
              <select
                name="weightUnit"
                className="w-1/2 bg-gray-800 rounded-md p-3 text-white"
                onChange={handleChange}
                {...register('weightUnit', { required: true })}
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
            {errors.weight && <p className="text-red-500">{errors.weight.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-lg md:text-xl">Behavior</label>
            <input
              type="text"
              name="behavior"
              className="w-full bg-gray-800 rounded-md p-3 text-white"
              {...register('behavior', { required: true })}
              onChange={handleChange}
            />
            {errors.behavior && <p className="text-red-500">{errors.behavior.message}</p>}
          </div>

          {/* Additional Questions */}
          {['Good With Kids?', 'Parvo Infected?', 'Activity Level', 'Potty Trained?'].map((item) => (
            <div key={item}>
              <label className="block mb-2 text-lg md:text-xl">{item}</label>
              <div className="flex space-x-4">
                {['Yes', 'No', "Don't Know"].map((response) => (
                  <div key={response} className="flex items-center">
                    <input
                      type="radio"
                      id={`${item}-${response}`}
                      name={item.replace(/\s+/g, '_').toLowerCase()} // Unique name for each question
                      value={response}
                      className="appearance-none w-4 h-4 border-2 border-customGreen rounded-full checked:bg-customGreen focus:outline-none"
                      onChange={handleChange}
                    />
                    <label htmlFor={`${item}-${response}`} className="ml-2 cursor-pointer text-lg">
                      {response}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button type="button" className="text-blue-500" onClick={prevStep}>Back</button>
          <RightArrowButton onClick={handleNextStep} />
        </div>
      </div>
    </div>
  );
};

export default PetSize;
