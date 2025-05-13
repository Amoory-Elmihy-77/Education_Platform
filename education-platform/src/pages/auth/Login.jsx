import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, FormControlLabel, Radio, RadioGroup, Alert } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState('student');
  const [error, setError] = useState('');
  const { login } = useAuth();
  
  // Get redirect URL from query parameters if available
  const [redirectUrl, setRedirectUrl] = useState('/');
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    // Get redirect URL if available
    const redirect = searchParams.get('redirect');
    if (redirect) {
      setRedirectUrl(redirect);
    }
    
    // Get user type if coming from signup page
    const userTypeParam = searchParams.get('userType');
    if (userTypeParam && (userTypeParam === 'student' || userTypeParam === 'instructor')) {
      setUserType(userTypeParam);
    }
  }, [location]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setError('');
      const result = login(values.email, values.password, userType);
      if (result.success) {
        // Redirect to appropriate page based on user type and redirect URL
        if (redirectUrl !== '/') {
          // If there's a specific redirect URL, use it
          navigate(redirectUrl);
        } else if (userType === 'instructor') {
          // Instructors go to add course page if no specific redirect
          navigate('/add-course');
        } else {
          // Students go to home page if no specific redirect
          navigate('/');
        }
      } else {
        setError(result.error || 'Invalid email or password');
      }
    },
  });

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 3 } 
      }}
    >
      <Paper 
        elevation={2}
        sx={{ 
          p: { xs: 3, sm: 4, md: 5 },
          borderRadius: { xs: 2, sm: 3 },
          boxShadow: (theme) => theme.shadows[3]
        }}
      >
        <Typography 
          variant="h5" 
          sx={{ 
            textAlign: 'center',
            mb: { xs: 2, sm: 3 },
            fontWeight: 700,
            fontSize: { xs: '1.5rem', sm: '1.75rem' }
          }}
        >
          Welcome Back
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <RadioGroup
            row
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            sx={{ 
              justifyContent: 'center', 
              mb: { xs: 2, sm: 3 },
              '.MuiFormControlLabel-label': {
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }
            }}
          >
            <FormControlLabel
              value="student"
              control={<Radio color="primary" />}
              label="Student"
            />
            <FormControlLabel
              value="instructor"
              control={<Radio color="primary" />}
              label="Instructor"
            />
          </RadioGroup>

          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            size="large"
          >
            Login
          </Button>
        </form>

        <Typography 
          sx={{ 
            textAlign: 'center', 
            mt: { xs: 2, sm: 3 },
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
        >
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            style={{ 
              color: 'var(--accent-primary)',
              textDecoration: 'none'
            }}
            onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.target.style.textDecoration = 'none'}
          >
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
