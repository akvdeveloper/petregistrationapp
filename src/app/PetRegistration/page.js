"use client"; // Required for client-side rendering

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; // For client-side routing
import { useForm } from 'react-hook-form'; // Importing react-hook-form
import AddPet from './AddPet';
import PetType from './PetType';
import PetDetails from './PetDetails';
import PetSize from './PetSize';
import PetBread from './PetBread';
import Confirmation from './Confirmation';

const PetRegistration = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Get query params from the URL
  const [step, setStep] = useState('1'); // Default to step 1
  const [formData, setFormData] = useState({selectedPetNature:"",selectedPetType:""}); // To store form data across steps
  const [submissionError, setSubmissionError] = useState(''); // For handling form submission errors
  const [checks, setChecks] = useState({
    kciCertified: null,
    microChip: null,
    vaccinated: null,
    healthCheckUp: null,
  });
  console.log(checks,"checks");

  // react-hook-form setup
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: formData, // Set the default values to persist form data
  });
console.log(formData,"formData");

  // Update `step` state whenever the URL query parameter changes
  useEffect(() => {
    const currentStep = searchParams.get('step') || '1'; // Fetch `step` from URL
    setStep(currentStep); // Update step in state
  }, [searchParams]);

  // Persist form data between steps
  useEffect(() => {
    Object.entries(formData).forEach(([key, value]) => {
      setValue(key, value); // Set form data as default values
    });
  }, [formData, setValue]);

  // Update formData with new input data
  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  // Update the step and push it to the URL
  const updateStep = (newStep) => {
    setStep(newStep.toString()); // Ensure step is a string
    router.push(`/PetRegistration?step=${newStep}`); // Update URL with the new step
  };

  // On form submission, move to the next step or submit to the API
  const onSubmit = async (data) => {
    updateFormData(data); // Save the form data

    if (step === '6') {
      // Final step, submit to the API
      const fullFormData = { ...formData, ...data }; // Merge all data

      try {
        const response = await fetch('http://localhost:5000/api/pets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fullFormData), // Send the full form data
        });

        if (response.ok) {
          alert('Registration Submitted!');
          reset(); // Reset the form after successful submission
          setFormData({}); // Clear form data
          updateStep('1'); // Reset to step 1
          router.push('/success'); // Redirect to a success page
        } else {
          setSubmissionError('Failed to submit the form. Please try again.');
        }
      } catch (error) {
        setSubmissionError('An error occurred while submitting the form. Please try again.');
      }
    } else {
      updateStep(parseInt(step) + 1); // Move to the next step
    }
  };

  // Render the current step component based on the step value
  const renderStepComponent = useCallback(() => {
    switch (step) {
      case '1':
        return <AddPet nextStep={() => updateStep(2)} register={register} errors={errors} />;
      case '2':
        return (
          <PetType 
            nextStep={() => updateStep(3)} 
            prevStep={() => updateStep(1)} 
            formData={formData} 
            setPetData={updateFormData} 
            setFormData={setFormData}
          />
        );
      case '3':
        return <PetDetails nextStep={() => updateStep(4)} prevStep={() => updateStep(2)} register={register} errors={errors} petData={formData}  setPetData={updateFormData} />;
      case '4':
        return <PetBread nextStep={() => updateStep(5)} prevStep={() => updateStep(3)} register={register} errors={errors} petData={formData}  setPetData={updateFormData} setChecks={setChecks} checks = {checks}/>;
      case '5':
        return (
          <PetSize 
            nextStep={() => updateStep(6)} 
            prevStep={() => updateStep(4)} 
            register={register} 
            errors={errors} 
            petData={formData} 
            setPetData={updateFormData} // Pass the function to update form data
          />
        );
      case '6':
        return <Confirmation prevStep={() => updateStep(5)} formData={formData} onSubmit={handleSubmit(onSubmit)} />;
      default:
        return null;
    }
  }, [step, register, errors, formData]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}> {/* Form wrapper */} 
          {renderStepComponent()} {/* Render the current step component */} 

          {/* Display error message */} 
          {submissionError && <p className="text-red-500 mt-2">{submissionError}</p>}

          {/* Conditionally render Submit button only on the last step */} 
          {step === '6' && (
            <button
              type="submit"
              className={`mt-6 w-full bg-green-500 rounded-full py-2 ${Object.keys(errors).length > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={Object.keys(errors).length > 0}
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PetRegistration;
