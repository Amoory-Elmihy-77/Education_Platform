import React, { createContext, useContext, useState } from 'react';
import { users } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    // In a real app, we would hash the password. For mock data, we'll just check email
    const student = users.students.find(user => user.email === email);
    if (student) {
      setCurrentUser(student);
      return { success: true, user: student };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const signup = (name, email, password) => {
    // Check if user already exists
    const existingUser = users.students.find(user => user.email === email);
    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }

    // Create new user
    const newUser = {
      id: users.students.length + 1,
      name,
      email,
      enrolledCourses: [],
      favorites: [],
      progress: {}
    };

    // Add to mock data
    users.students.push(newUser);
    
    return { success: true };
  };

  const value = {
    currentUser,
    login,
    logout,
    signup
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
