import React, { useState } from 'react';
import StudentOnboarding from '../components/onboarding/StudentOnboarding';
import ApplicationStatusDashboard from '../components/ApplicationStatusDashboard'; // Import the new dashboard

const StudentArea = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  // State to store the data from the onboarding form
  const [studentData, setStudentData] = useState(null);

  const handleOnboardingComplete = (formData) => {
    console.log("Onboarding has been completed with this data:", formData);
    setStudentData(formData); // Store the collected data
    setIsOnboardingComplete(true); // Update the state to show the dashboard
  };

  return (
    <div>
      {isOnboardingComplete ? (
        // If onboarding is complete, show the new dashboard and pass the data
        <ApplicationStatusDashboard studentData={studentData} />
      ) : (
        // Otherwise, show the multi-step onboarding form
        <StudentOnboarding onOnboardingComplete={handleOnboardingComplete} />
      )}
    </div>
  );
};

export default StudentArea;