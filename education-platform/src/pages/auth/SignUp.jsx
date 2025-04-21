import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, FormControlLabel, Radio, RadioGroup, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function SignUp() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('student');
  const [error, setError] = useState('');
  const { signup } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setError('');
      const result = signup(values.name, values.email, values.password);
      if (result.success) {
        navigate('/login');
      } else {
        setError(result.error || 'Failed to create account');
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
          Create Account
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
            id="name"
            name="name"
            label="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

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

          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />

          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            size="large"
            sx={{
              py: { xs: 1.5, sm: 2 },
              mt: { xs: 1, sm: 2 }
            }}
          >
            Sign Up
          </Button>
        </form>

        <Typography 
          sx={{ 
            textAlign: 'center', 
            mt: { xs: 2, sm: 3 },
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
        >
          Already have an account?{' '}
          <Link 
            to="/login" 
            style={{ 
              color: 'var(--accent-primary)',
              textDecoration: 'none'
            }}
            onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.target.style.textDecoration = 'none'}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
