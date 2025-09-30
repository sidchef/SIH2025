import React, { useState, useEffect } from 'react';

// A simple simulated captcha
const SimulatedCaptcha = ({ onVerify }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    // Generate a random 6-character string for the captcha
    const randomText = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCaptchaText(randomText);
  }, []);

  const handleChange = (e) => {
    setUserInput(e.target.value);
    onVerify(e.target.value.toUpperCase() === captchaText);
  };

  return (
    <div>
      <div className="bg-gray-200 p-2 rounded-md text-center my-2">
        <span className="text-2xl font-bold tracking-widest select-none italic">{captchaText}</span>
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        placeholder="Enter captcha"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
      />
    </div>
  );
};

const AadhaarVerification = ({ data, handleChange, nextStep }) => {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Aadhaar Verification</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
          <input
            type="text"
            name="aadhaar"
            id="aadhaar"
            value={data.aadhaar || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="XXXX XXXX XXXX"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Captcha</label>
          <SimulatedCaptcha onVerify={setIsCaptchaVerified} />
          <p className="text-xs text-gray-500 mt-1">Note: This is a simulated captcha for demo purposes.</p>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={nextStep}
          disabled={!data.aadhaar || !isCaptchaVerified}
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AadhaarVerification;