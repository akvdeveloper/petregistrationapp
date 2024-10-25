import React from 'react';
import ProgressBar from '@/components/ui/ProgressBar';

const Confirmation = ({ prevStep, formData, onSubmit }) => {
  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 text-center">
        <div className="flex items-center justify-between mb-8">
          <ProgressBar currentStep={6} totalSteps={6} />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-gray-900">Confirmation</h2>
        <p className="mb-6 text-gray-900">Thank you for registering your pet! Here's a summary of your information:</p>

        <div className="bg-gray-100 text-gray-900 p-4 rounded-lg mb-6 text-left">
          <h3 className="font-semibold mb-4">Pet Summary</h3>
          <p><strong>Owner Name:</strong> {formData.name || 'N/A'}</p>
          <p><strong>Address:</strong> {formData.address || 'N/A'}</p>
          <p><strong>PIN Code:</strong> {formData.pinCode || 'N/A'}</p>
          <p><strong>Pet Type:</strong> {formData.petType || 'N/A'}</p>
          <p><strong>Pet Nature:</strong> {formData.petNature || 'N/A'}</p>
          <p><strong>Pet Name:</strong> {formData.petName || 'N/A'}</p>
          <p><strong>Gender:</strong> {formData.gender || 'N/A'}</p>
          <p><strong>Price:</strong> ${formData.price || '0.00'}</p>
          <p><strong>Breed Type:</strong> {formData.breedType || 'N/A'}</p>
          <p><strong>Primary Breed:</strong> {formData.primaryBreed || 'N/A'}</p>
          <div>
            <strong>Checks:</strong>
            <ul className="ml-4 list-disc">
              <li>KCI Certified: {formData.checks?.kciCertified ? 'Yes' : 'No'}</li>
              <li>Microchip: {formData.checks?.microChip ? 'Yes' : 'No'}</li>
              <li>Vaccinated: {formData.checks?.vaccinated ? 'Yes' : 'No'}</li>
              <li>Health Checkup: {formData.checks?.healthCheckUp ? 'Yes' : 'No'}</li>
            </ul>
          </div>
          <p><strong>Size:</strong> {formData.size || 'N/A'}</p>
          <p><strong>Weight:</strong> {formData.weight || 'N/A'} {formData.weightUnit || ''}</p>
          <p><strong>Behavior:</strong> {formData.behavior || 'N/A'}</p>
          <p><strong>Date of Birth:</strong> {formData.dob ? new Date(formData.dob).toLocaleDateString() : 'N/A'}</p>

          {/* Add new fields here */}
          <div>
            <h3 className="font-semibold mb-4">Additional Information</h3>
            <ul className="ml-4 list-disc">
              <li><strong>Good With Kids:</strong> {formData.goodWithKids || 'N/A'}</li>
              <li><strong>Parvo Infected:</strong> {formData.parvoInfected || 'N/A'}</li>
              <li><strong>Activity Level:</strong> {formData.activityLevel || 'N/A'}</li>
              <li><strong>Potty Trained:</strong> {formData.pottyTrained || 'N/A'}</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={prevStep}
            aria-label="Go back to the previous step"
            className="bg-gray-800 text-white py-2 px-4 rounded-md"
          >
            Back
          </button>
          <button
            onClick={onSubmit}
            aria-label="Submit the pet registration form"
            className="bg-green-500 text-white py-2 px-4 rounded-md ml-4"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
