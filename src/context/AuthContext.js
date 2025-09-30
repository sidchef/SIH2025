// src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // On initial load, check if user data exists in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      // ⬇️ API CALL TO YOUR BACKEND ⬇️
      // This is a mocked API call. Replace with your actual fetch logic.
      // Your backend should return a token and the user's role.
      const response = {
        success: true,
        // This role would come from your database
        role: email.includes('student') ? 'student' : email.includes('company') ? 'company' : 'admin',
        token: 'fake-jwt-token',
      };

      if (response.success) {
        const userData = { token: response.token, role: response.role };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);

        // Redirect based on role
        switch (response.role) {
          case 'student':
            navigate('/student/dashboard');
            break;
          case 'company':
            navigate('/company/dashboard');
            break;
          case 'admin':
            navigate('/admin/dashboard');
            break;
          default:
            navigate('/login');
        }
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};