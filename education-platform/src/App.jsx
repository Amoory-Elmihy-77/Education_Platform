import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import CourseDetails from './pages/courses/CourseDetails';
import Favorites from './pages/student/Favorites';
import Learning from './pages/student/Learning';
import MyLearning from './pages/student/MyLearning';
import AddCourse from './pages/instructor/AddCourse';
import InstructorCourses from './pages/instructor/InstructorCourses';
import CourseManagement from './pages/instructor/CourseManagement';
import CategoryPage from './pages/CategoryPage';
import Profile from './pages/Profile';
import Payment from './pages/Payment';
import HomeButton from './components/common/HomeButton';
import ThemeButton from './components/common/ThemeButton';

function AppContent() {
  const { darkMode } = useTheme();
  const { currentUser } = useAuth();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#60a5fa' : '#1976d2',
        light: darkMode ? '#93c5fd' : '#42a5f5',
        dark: darkMode ? '#3b82f6' : '#1565c0',
      },
      secondary: {
        main: darkMode ? '#3b82f6' : '#9c27b0',
        light: darkMode ? '#60a5fa' : '#ba68c8',
        dark: darkMode ? '#2563eb' : '#7b1fa2',
      },
      background: {
        default: darkMode ? '#111827' : '#f3f4f6',
        paper: darkMode ? '#1f2937' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#f9fafb' : '#1f2937',
        secondary: darkMode ? '#d1d5db' : '#4b5563',
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    spacing: 8,
    typography: {
      h1: {
        fontSize: '2.5rem',
        '@media (min-width:600px)': {
          fontSize: '3rem',
        },
        '@media (min-width:960px)': {
          fontSize: '3.5rem',
        },
      },
      h2: {
        fontSize: '2rem',
        '@media (min-width:600px)': {
          fontSize: '2.5rem',
        },
        '@media (min-width:960px)': {
          fontSize: '3rem',
        },
      },
      h3: {
        fontSize: '1.5rem',
        '@media (min-width:600px)': {
          fontSize: '1.75rem',
        },
        '@media (min-width:960px)': {
          fontSize: '2rem',
        },
      },
      h4: {
        fontSize: '1.25rem',
        '@media (min-width:600px)': {
          fontSize: '1.5rem',
        },
        '@media (min-width:960px)': {
          fontSize: '1.75rem',
        },
      },
      h5: {
        fontSize: '1.1rem',
        '@media (min-width:600px)': {
          fontSize: '1.25rem',
        },
        '@media (min-width:960px)': {
          fontSize: '1.5rem',
        },
      },
      h6: {
        fontSize: '1rem',
        '@media (min-width:600px)': {
          fontSize: '1.1rem',
        },
        '@media (min-width:960px)': {
          fontSize: '1.25rem',
        },
      },
      body1: {
        fontSize: '0.95rem',
        '@media (min-width:600px)': {
          fontSize: '1rem',
        },
      },
      body2: {
        fontSize: '0.85rem',
        '@media (min-width:600px)': {
          fontSize: '0.9rem',
        },
      },
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: '16px',
            paddingRight: '16px',
            '@media (min-width: 600px)': {
              paddingLeft: '24px',
              paddingRight: '24px',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: darkMode 
              ? '0 4px 6px rgba(0, 0, 0, 0.3)'
              : '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
            '&:hover': {
              boxShadow: darkMode
                ? '0 8px 16px rgba(0, 0, 0, 0.4)'
                : '0 8px 16px rgba(0, 0, 0, 0.1)',
              transform: 'translateY(-4px)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="min-h-screen" style={{ maxWidth: '100vw', overflow: 'hidden' }}>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/course/:id" element={<CourseDetails />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/learning/:courseId" element={<Learning />} />
                <Route path="/my-learning" element={<MyLearning />} />
                <Route path="/add-course" element={<AddCourse />} />
                <Route path="/instructor-courses" element={<InstructorCourses />} />
                <Route path="/instructor/course/:courseId" element={<CourseManagement />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/payment/:courseId" element={<Payment />} />
              </Routes>
              <HomeButton />
              <ThemeButton />
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
