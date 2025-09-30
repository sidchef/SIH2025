// src/components/SignupPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // --- Step 1: Handle Initial Signup and Send OTP ---
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      // API call to your backend to send the OTP
      const response = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // We only need to send the email for the first step
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP.');
      }

      setMessage(data.message); // "OTP sent successfully..."
      setIsOtpSent(true); // Show the OTP verification form

    } catch (err) {
      setError(err.message);
    }
  };
  
  // --- Step 2: Handle OTP Verification and Final User Creation ---
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      // API call to your backend to verify OTP and create the user
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send the complete form data along with the OTP
        body: JSON.stringify({
          ...formData,
          otp: otp,
        }),
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid or expired OTP.');
      }
      
      alert('Signup successful! Please log in.');
      navigate('/login');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        
        {!isOtpSent ? (
          // --- SIGNUP FORM (Step 1) ---
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Create an Account</h1>
              <p className="text-gray-500">Enter your details to register.</p>
            </div>
            <form onSubmit={handleSignupSubmit} className="space-y-6">
              {/* Inputs for fullname, email, password */}
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleFormChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleFormChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleFormChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Send OTP</button>
              </div>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">Already have an account?{' '} <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Login</Link></p>
          </div>
        ) : (
          // --- OTP VERIFICATION FORM (Step 2) ---
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Verify Your Email</h1>
              <p className="text-gray-500">An OTP has been sent to <strong>{formData.email}</strong></p>
            </div>
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter 6-Digit OTP</label>
                <input type="text" id="otp" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Verify and Sign Up</button>
              </div>
            </form>
          </div>
        )}
        
        {/* Display success or error messages */}
        {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
        {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}

      </div>
    </div>
  );
};

export default SignupPage;