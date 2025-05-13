import React, { createContext, useContext, useState, useEffect } from 'react';
import { users, courses } from '../data/mockData';
import { categoryCourses } from '../data/categoryCoursesData';
import { categories } from '../components/home/Categories';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Add admin user if it doesn't exist
  useEffect(() => {
    if (!users.admins) {
      users.admins = [
        {
          id: 'admin1',
          name: 'Admin User',
          email: 'ammarelmihy@gmail.com',
          password: 'ammar2358',
          userType: 'admin'
        }
      ];
    }
  }, []);

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Find the user in our mock data to ensure it's up to date
        let foundUser = null;
        
        if (parsedUser.userType === 'student') {
          foundUser = users.students.find(u => u.id === parsedUser.id);
        } else if (parsedUser.userType === 'instructor') {
          foundUser = users.instructors.find(u => u.id === parsedUser.id);
        } else if (parsedUser.userType === 'admin') {
          foundUser = users.admins.find(u => u.id === parsedUser.id);
        }
        if (foundUser) {
          setCurrentUser(foundUser);
        }
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const login = (email, password, userType = 'student') => {
    let user;

    // Always check for admin credentials first if the email matches
    if (email === 'ammarelmihy@gmail.com') {
      user = users.admins.find(u => u.email === email && u.password === password);
      if (user) {
        const userWithType = { ...user, userType: 'admin' };
        setCurrentUser(userWithType);
        localStorage.setItem('currentUser', JSON.stringify(userWithType));
        return { success: true, user: userWithType };
      }
    }
    
    // Then check based on userType
    if (userType === 'student') {
      user = users.students.find(u => u.email === email && u.password === password);
    } else if (userType === 'instructor') {
      user = users.instructors.find(u => u.email === email && u.password === password);
    } else if (userType === 'admin') {
      user = users.admins.find(u => u.email === email && u.password === password);
    }

    if (user) {
      const userWithType = { ...user, userType };
      setCurrentUser(userWithType);
      localStorage.setItem('currentUser', JSON.stringify(userWithType));
      return { success: true, user: userWithType };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const signup = (name, email, password, userType = 'student') => {
    // Check if user already exists in either students or instructors
    const existingStudent = users.students.find(user => user.email === email);
    const existingInstructor = users.instructors.find(user => user.email === email);
    
    if (existingStudent || existingInstructor) {
      return { success: false, error: 'User already exists' };
    }

    if (userType === 'student') {
      // Create new student
      const newStudent = {
        id: users.students.length + 1,
        name,
        email,
        password,
        enrolledCourses: [],
        favorites: [],
        progress: {}
      };

      // Add to mock data
      users.students.push(newStudent);
      return { success: true, userType: 'student' };
    } else if (userType === 'instructor') {
      // Create new instructor
      const newInstructor = {
        id: users.instructors.length + 1,
        name,
        email,
        password,
        courses: [],
        bio: '',
        avatar: '' // Default avatar could be added here
      };

      // Add to mock data
      users.instructors.push(newInstructor);
      return { success: true, userType: 'instructor' };
    }
    
    return { success: false, error: 'Invalid user type' };
  };

  // Add a course to favorites
  const addToFavorites = (courseId) => {
    if (!currentUser) return { success: false, error: 'User not logged in' };
    
    // Convert to number if it's a string
    courseId = Number(courseId);
    
    // Check if course exists
    const courseExists = courses.some(course => course.id === courseId);
    if (!courseExists) return { success: false, error: 'Course not found' };
    
    // Check if already in favorites
    if (currentUser.favorites.includes(courseId)) {
      return { success: false, error: 'Course already in favorites' };
    }
    
    // Add to favorites
    const updatedUser = {
      ...currentUser,
      favorites: [...currentUser.favorites, courseId]
    };
    
    // Update in mock data
    const userIndex = users.students.findIndex(user => user.id === currentUser.id);
    if (userIndex !== -1) {
      users.students[userIndex].favorites.push(courseId);
    }
    
    // Update current user
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return { success: true };
  };
  
  // Remove a course from favorites
  const removeFromFavorites = (courseId) => {
    if (!currentUser) return { success: false, error: 'User not logged in' };
    
    // Convert to number if it's a string
    courseId = Number(courseId);
    
    // Check if in favorites
    if (!currentUser.favorites.includes(courseId)) {
      return { success: false, error: 'Course not in favorites' };
    }
    
    // Remove from favorites
    const updatedUser = {
      ...currentUser,
      favorites: currentUser.favorites.filter(id => id !== courseId)
    };
    
    // Update in mock data
    const userIndex = users.students.findIndex(user => user.id === currentUser.id);
    if (userIndex !== -1) {
      users.students[userIndex].favorites = users.students[userIndex].favorites.filter(id => id !== courseId);
    }
    
    // Update current user
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return { success: true };
  };
  
  // Enroll in a course
  const enrollInCourse = (courseId) => {
    if (!currentUser) return { success: false, error: 'User not logged in' };
    
    // Convert to number if it's a string
    courseId = Number(courseId);
    
    // Check if course exists
    const courseExists = courses.some(course => course.id === courseId);
    if (!courseExists) return { success: false, error: 'Course not found' };
    
    // Check if already enrolled
    if (currentUser.enrolledCourses.includes(courseId)) {
      return { success: false, error: 'Already enrolled in this course' };
    }
    
    // Add to enrolled courses
    const updatedUser = {
      ...currentUser,
      enrolledCourses: [...currentUser.enrolledCourses, courseId],
      progress: {
        ...currentUser.progress,
        [courseId]: { completed: [], current: "1" }
      }
    };
    
    // Update in mock data
    const userIndex = users.students.findIndex(user => user.id === currentUser.id);
    if (userIndex !== -1) {
      users.students[userIndex].enrolledCourses.push(courseId);
      users.students[userIndex].progress[courseId] = { completed: [], current: "1" };
    }
    
    // Update current user
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return { success: true };
  };

  // Check if a course is in favorites
  const isInFavorites = (courseId) => {
    if (!currentUser) return false;
    return currentUser.favorites.includes(Number(courseId));
  };
  
  // Check if enrolled in a course
  const isEnrolled = (courseId) => {
    if (!currentUser) return false;
    return currentUser.enrolledCourses.includes(Number(courseId));
  };
  
  // Update course progress
  const updateCourseProgress = (courseId, lessonId, completed = true) => {
    if (!currentUser) return { success: false, error: 'User not logged in' };
    
    // Convert to number if it's a string
    courseId = Number(courseId);
    
    // Check if enrolled in the course
    if (!currentUser.enrolledCourses.includes(courseId)) {
      return { success: false, error: 'Not enrolled in this course' };
    }
    
    // Get current progress
    const currentProgress = currentUser.progress[courseId] || { completed: [], current: "1" };
    
    // Update progress
    let updatedProgress;
    if (completed) {
      // Add to completed lessons if not already there
      if (!currentProgress.completed.includes(lessonId)) {
        updatedProgress = {
          ...currentProgress,
          completed: [...currentProgress.completed, lessonId],
          current: lessonId
        };
      } else {
        // Already completed, just update current
        updatedProgress = {
          ...currentProgress,
          current: lessonId
        };
      }
    } else {
      // Just update current lesson without marking as completed
      updatedProgress = {
        ...currentProgress,
        current: lessonId
      };
    }
    
    // Update user object
    const updatedUser = {
      ...currentUser,
      progress: {
        ...currentUser.progress,
        [courseId]: updatedProgress
      }
    };
    
    // Update in mock data
    const userIndex = users.students.findIndex(user => user.id === currentUser.id);
    if (userIndex !== -1) {
      users.students[userIndex].progress[courseId] = updatedProgress;
    }
    
    // Update current user
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return { success: true };
  };

  // Update user profile
  const updateProfile = (updatedData) => {
    if (!currentUser) return { success: false, error: 'User not logged in' };
    
    // Update user object
    const updatedUser = {
      ...currentUser,
      ...updatedData
    };
    
    // Update in mock data
    const userIndex = users.students.findIndex(user => user.id === currentUser.id);
    if (userIndex !== -1) {
      Object.assign(users.students[userIndex], updatedData);
    }
    
    // Update current user
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return { success: true };
  };
  
  // Change password
  const changePassword = (currentPassword, newPassword) => {
    if (!currentUser) return { success: false, error: 'User not logged in' };
    
    // In a real app, we would verify the current password
    // For this mock implementation, we'll just update the password
    
    // Update in mock data
    const userIndex = users.students.findIndex(user => user.id === currentUser.id);
    if (userIndex !== -1) {
      // In a real app, we would hash the password
      users.students[userIndex].password = newPassword;
    }
    
    return { success: true, message: 'Password changed successfully' };
  };

  // Add a new course (for instructors)
  const addCourse = (courseData) => {
    if (!currentUser) return { success: false, error: 'User not logged in' };
    if (currentUser.userType !== 'instructor') return { success: false, error: 'Only instructors can add courses' };
    
    // Create a new course with a unique ID
    const newCourse = {
      id: courses.length + 1,
      ...courseData,
      instructor: currentUser.name,
      instructorId: currentUser.id,
      rating: 0,
      students: 0
    };
    
    // Add to courses array
    courses.push(newCourse);
    
    // Update instructor's courses array
    const instructorIndex = users.instructors.findIndex(user => user.id === currentUser.id);
    if (instructorIndex !== -1) {
      if (!users.instructors[instructorIndex].courses) {
        users.instructors[instructorIndex].courses = [];
      }
      users.instructors[instructorIndex].courses.push(newCourse.id);
      
      // Update current user
      const updatedUser = {
        ...currentUser,
        courses: [...(currentUser.courses || []), newCourse.id]
      };
      
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
    
    return { success: true, courseId: newCourse.id };
  };
  
  // Get instructor's courses
  const getInstructorCourses = () => {
    if (!currentUser || currentUser.userType !== 'instructor') return [];
    
    const instructorCourses = courses.filter(course => 
      currentUser.courses && currentUser.courses.includes(course.id)
    );
    
    return instructorCourses;
  };
  
  // Update an existing course (for instructors)
  const updateCourse = (courseId, updatedData) => {
    if (!currentUser) return { success: false, error: 'User not logged in' };
    if (currentUser.userType !== 'instructor') return { success: false, error: 'Only instructors can update courses' };
    
    // Find the course
    const courseIndex = courses.findIndex(course => course.id === courseId);
    
    if (courseIndex === -1) {
      return { success: false, error: 'Course not found' };
    }
    
    // Check if the course belongs to this instructor
    if (courses[courseIndex].instructorId !== currentUser.id) {
      return { success: false, error: 'You do not have permission to update this course' };
    }
    
    // Update the course
    courses[courseIndex] = {
      ...courses[courseIndex],
      ...updatedData
    };
    
    return { success: true, message: 'Course updated successfully' };
  };
  
  // Get enrolled students for a course (for instructors)
  const getEnrolledStudents = (courseId) => {
    if (!currentUser) return { success: false, error: 'User not logged in', students: [] };
    if (currentUser.userType !== 'instructor' && currentUser.userType !== 'admin') {
      return { success: false, error: 'Only instructors or admins can view enrolled students', students: [] };
    }
    
    // Find the course
    const course = courses.find(course => course.id === parseInt(courseId));
    
    if (!course) {
      return { success: false, error: 'Course not found', students: [] };
    }
    
    // Check if the course belongs to this instructor (skip this check for admins)
    if (currentUser.userType === 'instructor' && course.instructorId !== currentUser.id) {
      return { success: false, error: 'You do not have permission to view this course', students: [] };
    }
    
    // Get enrolled students
    const enrolledStudents = users.students.filter(student => 
      student.enrolledCourses && student.enrolledCourses.includes(parseInt(courseId))
    );
    
    // Return only necessary student information (for privacy)
    const studentInfo = enrolledStudents.map(student => ({
      id: student.id,
      name: student.name,
      email: student.email,
      enrollmentDate: new Date().toISOString().split('T')[0], // Mock data - in a real app, this would be stored
      progress: student.courseProgress && student.courseProgress[courseId] ? 
        student.courseProgress[courseId].progress : 0
    }));
    
    return { 
      success: true, 
      students: studentInfo,
      count: studentInfo.length
    };
  };
  
  // ADMIN METHODS
  
  // Get all students (admin only)
  const getAllStudents = () => {
    if (!currentUser || currentUser.userType !== 'admin') {
      return { success: false, error: 'Only admins can access this information', students: [] };
    }
    
    const studentsList = users.students.map(student => ({
      id: student.id,
      name: student.name,
      email: student.email,
      enrolledCourses: student.enrolledCourses ? student.enrolledCourses.length : 0,
      favorites: student.favorites ? student.favorites.length : 0
    }));
    
    return { success: true, students: studentsList };
  };
  
  // Get all instructors (admin only)
  const getAllInstructors = () => {
    if (!currentUser || currentUser.userType !== 'admin') {
      return { success: false, error: 'Only admins can access this information', instructors: [] };
    }
    
    const instructorsList = users.instructors.map(instructor => ({
      id: instructor.id,
      name: instructor.name,
      email: instructor.email,
      courses: instructor.courses ? instructor.courses.length : 0
    }));
    
    return { success: true, instructors: instructorsList };
  };
  
  // Get all courses (admin only)
  const getAllCourses = () => {
    if (!currentUser || currentUser.userType !== 'admin') {
      return { success: false, error: 'Only admins can access this information', courses: [] };
    }
    
    // Combine regular courses and category courses
    const allCourses = [...courses, ...categoryCourses];
    
    // Remove duplicates
    const uniqueCourses = allCourses.filter((course, index, self) =>
      index === self.findIndex((c) => c.id === course.id)
    );
    
    return { success: true, courses: uniqueCourses };
  };
  
  // Get all categories (admin only)
  const getAllCategories = () => {
    if (!currentUser || currentUser.userType !== 'admin') {
      return { success: false, error: 'Only admins can access this information', categories: [] };
    }
    
    return { success: true, categories };
  };
  
  // Delete a student (admin only)
  const deleteStudent = (studentId) => {
    if (!currentUser || currentUser.userType !== 'admin') {
      return { success: false, error: 'Only admins can perform this action' };
    }
    
    const studentIndex = users.students.findIndex(student => student.id === studentId);
    
    if (studentIndex === -1) {
      return { success: false, error: 'Student not found' };
    }
    
    users.students.splice(studentIndex, 1);
    
    return { success: true, message: 'Student deleted successfully' };
  };
  
  // Delete an instructor (admin only)
  const deleteInstructor = (instructorId) => {
    if (!currentUser || currentUser.userType !== 'admin') {
      return { success: false, error: 'Only admins can perform this action' };
    }
    
    const instructorIndex = users.instructors.findIndex(instructor => instructor.id === instructorId);
    
    if (instructorIndex === -1) {
      return { success: false, error: 'Instructor not found' };
    }
    
    users.instructors.splice(instructorIndex, 1);
    
    return { success: true, message: 'Instructor deleted successfully' };
  };
  
  // Delete a course (admin only)
  const deleteCourse = (courseId) => {
    if (!currentUser || currentUser.userType !== 'admin') {
      return { success: false, error: 'Only admins can perform this action' };
    }
    
    // Try to find in regular courses
    const courseIndex = courses.findIndex(course => course.id === parseInt(courseId));
    
    if (courseIndex !== -1) {
      courses.splice(courseIndex, 1);
      return { success: true, message: 'Course deleted successfully' };
    }
    
    // If not found in regular courses, try category courses
    const categoryCourseIndex = categoryCourses.findIndex(course => course.id === parseInt(courseId));
    
    if (categoryCourseIndex !== -1) {
      categoryCourses.splice(categoryCourseIndex, 1);
      return { success: true, message: 'Course deleted successfully' };
    }
    
    return { success: false, error: 'Course not found' };
  };

  const value = {
    currentUser,
    login,
    logout,
    signup,
    addToFavorites,
    removeFromFavorites,
    enrollInCourse,
    isInFavorites,
    isEnrolled,
    updateCourseProgress,
    updateProfile,
    changePassword,
    addCourse,
    getInstructorCourses,
    updateCourse,
    getEnrolledStudents,
    // Admin methods
    getAllStudents,
    getAllInstructors,
    getAllCourses,
    getAllCategories,
    deleteStudent,
    deleteInstructor,
    deleteCourse
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
