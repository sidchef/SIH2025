import React, { useState, useEffect } from 'react';

import ProgressBar from './ProgressBar';
import AadhaarVerification from './steps/AadhaarVerification';
import PersonalDetails from './steps/PersonalDetails';
import UploadResume from './steps/UploadResume';
import LocationPreference from './steps/LocationPreference';
import Confirmation from './steps/Confirmation';

const TOTAL_STEPS = 5;

const StudentOnboarding = ({ onOnboardingComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  // This is for debugging. It will show you how the formData object changes.
  // It should get bigger after each step.
  useEffect(() => {
    console.log("Form data has been updated:", formData);
  }, [formData]);

  const nextStep = () => setCurrentStep(prev => (prev < TOTAL_STEPS ? prev + 1 : prev));
  const prevStep = () => setCurrentStep(prev => (prev > 1 ? prev - 1 : prev));

  // For simple text inputs. The `...prev` is CRUCIAL.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // For file inputs. The `...prev` is CRUCIAL.
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
  };

  // For complex data from child components. The `...prev` is CRUCIAL.
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Final Form Submitted:", formData);
    alert("Onboarding completed successfully!");
    onOnboardingComplete(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AadhaarVerification data={formData} handleChange={handleChange} nextStep={nextStep} />;
      case 2:
        return <PersonalDetails data={formData} handleChange={handleChange} handleFileChange={handleFileChange} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <UploadResume data={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <LocationPreference data={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <Confirmation data={formData} handleSubmit={handleSubmit} prevStep={prevStep} />;
      default:
        return <div>Form complete!</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        {renderStep()}
      </div>
    </div>
  );
};

export default StudentOnboarding;