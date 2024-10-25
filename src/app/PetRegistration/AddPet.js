import React from 'react';
import { useRouter } from 'next/navigation';
import RightArrowButton from '@/components/ui/RightArrowButton';
import ProgressBar from '@/components/ui/ProgressBar';

const AddPet = ({ nextStep, register, errors }) => {
  const router = useRouter();

  // Define fields for easier mapping
  const fields = [
    {
      label: 'Your Name',
      name: 'name',
      validation: { required: 'Name is required' },
    },
    {
      label: 'Your Address',
      name: 'address',
      validation: { required: 'Address is required' },
    },
    {
      label: 'Your Pin Code',
      name: 'pinCode',
      validation: {
        required: 'Pin Code is required',
        minLength: { value: 5, message: 'Must be at least 5 characters' },
      },
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="flex items-center justify-between mb-8">
        <ProgressBar currentStep={1} totalSteps={6} />
      </div>
      <div className="w-full max-w-md">
        {/* Pet addition box */}
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 mb-6 flex flex-col items-center justify-center">
          <span className="text-4xl mb-2">+</span>
          <span className="text-green-500">Add Your Pet</span>
        </div>

        {/* Input fields */}
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <input
                type="text"
                placeholder={field.label}
                {...register(field.name, field.validation)}
                className={`w-full bg-gray-800 rounded-md p-3 text-white ${
                  errors[field.name] ? 'border-red-500' : ''
                }`}
              />
              {errors[field.name] && (
                <p className="text-red-500">{errors[field.name].message}</p>
              )}
            </div>
          ))}
        </div>

        {/* Next Step Button - Positioned to the right */}
        <div className="flex justify-end mt-6">
          <RightArrowButton onClick={nextStep} />
        </div>
      </div>
    </div>
  );
};

export default AddPet;
