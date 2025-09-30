// src/components/StudentDashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const StudentDashboard = () => {
  const { logout } = useAuth();
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-800">Student Dashboard</h1>
      <p className="mt-2 text-blue-600">Welcome, Student!</p>
      <button onClick={logout} className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Logout
      </button>
    </div>
  );
};

export default StudentDashboard;