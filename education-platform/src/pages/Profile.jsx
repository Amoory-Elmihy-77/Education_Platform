import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  bio: yup.string(),
});

const passwordValidationSchema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function Profile() {
  const { currentUser, updateProfile, changePassword } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  // Profile update form
  const formik = useFormik({
    initialValues: {
      name: currentUser.name || '',
      email: currentUser.email || '',
      bio: currentUser.bio || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setError('');
      setSuccess('');
      
      // Update the user's profile using the updateProfile method from AuthContext
      const result = updateProfile({
        name: values.name,
        email: values.email,
        bio: values.bio
      });
      
      if (result.success) {
        setSuccess('Profile updated successfully!');
      } else {
        setError(result.error || 'Failed to update profile');
      }
    },
  });
  
  // Password change form
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: passwordValidationSchema,
    onSubmit: (values) => {
      setPasswordError('');
      setPasswordSuccess('');
      
      // Change password using the changePassword method from AuthContext
      const result = changePassword(values.currentPassword, values.newPassword);
      
      if (result.success) {
        setPasswordSuccess(result.message || 'Password changed successfully!');
        // Reset form fields
        passwordFormik.resetForm();
        
        // Close modal after a delay
        setTimeout(() => {
          setPasswordModalOpen(false);
          setPasswordSuccess('');
        }, 2000);
      } else {
        setPasswordError(result.error || 'Failed to change password');
      }
    },
  });
  
  // Handle opening the password change modal
  const handleOpenPasswordModal = () => {
    setPasswordModalOpen(true);
    setPasswordError('');
    setPasswordSuccess('');
    passwordFormik.resetForm();
  };
  
  // Handle closing the password change modal
  const handleClosePasswordModal = () => {
    setPasswordModalOpen(false);
    setPasswordError('');
    setPasswordSuccess('');
    passwordFormik.resetForm();
  };

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 3 } 
      }}
    >
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center', p: { xs: 2, sm: 3 } }}>
              <Avatar
                sx={{ 
                  width: { xs: 100, sm: 120, md: 128 },
                  height: { xs: 100, sm: 120, md: 128 },
                  mx: 'auto',
                  mb: { xs: 2, sm: 3, md: 4 },
                  bgcolor: 'primary.main'
                }}
                src={currentUser.avatar}
              >
                {currentUser.name.charAt(0)}
              </Avatar>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 600,
                  mb: 2,
                  fontSize: { xs: '1.25rem', sm: '1.5rem' }
                }}
              >
                {currentUser.name}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'text.secondary',
                  mb: { xs: 2, sm: 3, md: 4 }
                }}
              >
                {currentUser.userType === 'instructor' ? 'Instructor' : 'Student'}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mb: { xs: 2, sm: 3, md: 4 } }}
              >
                Change Avatar
              </Button>
              <Divider sx={{ my: { xs: 2, sm: 3, md: 4 } }} />
              {currentUser.role === 'instructor' && (
                <Box sx={{ textAlign: 'left' }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      mb: { xs: 1, sm: 2 },
                      fontSize: { xs: '0.9rem', sm: '1rem' }
                    }}
                  >
                    Statistics
                  </Typography>
                  <Box sx={{ '& > *': { mb: 2 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Total Courses</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        {currentUser.enrolledCourses?.length || 0}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Total Students</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        {/* This would come from the API */}
                        142
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
              {currentUser.role === 'student' && (
                <Box sx={{ textAlign: 'left' }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      mb: { xs: 1, sm: 2 },
                      fontSize: { xs: '0.9rem', sm: '1rem' }
                    }}
                  >
                    Learning Progress
                  </Typography>
                  <Box sx={{ '& > *': { mb: 2 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Enrolled Courses</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        {currentUser.enrolledCourses?.length || 0}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Completed Courses</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        {/* This would come from the API */}
                        1
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Profile Settings
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}
            <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                fullWidth
                label="Bio"
                name="bio"
                multiline
                rows={4}
                value={formik.values.bio}
                onChange={formik.handleChange}
                error={formik.touched.bio && Boolean(formik.errors.bio)}
                helperText={formik.touched.bio && formik.errors.bio}
              />

              <Box 
                sx={{ 
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 2, sm: 3 },
                  mt: { xs: 2, sm: 3 },
                  '& .MuiButton-root': {
                    flex: { sm: 1 }
                  }
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleOpenPasswordModal}
                  sx={{ order: { xs: 2, sm: 1 } }}
                >
                  Change Password
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ order: { xs: 1, sm: 2 } }}
                >
                  Save Changes
                </Button>
              </Box>
            </form>
          </Paper>

          <Paper sx={{ 
            p: { xs: 2, sm: 3, md: 4 },
            mt: { xs: 2, sm: 3, md: 4 }
          }}>
            <Typography variant="h6" className="mb-4">
              Notification Settings
            </Typography>
            {/* Add notification settings here */}
          </Paper>
        </Grid>
      </Grid>
      
      {/* Password Change Modal */}
      <Dialog open={passwordModalOpen} onClose={handleClosePasswordModal}>
        <DialogTitle>Change Password</DialogTitle>
        <form onSubmit={passwordFormik.handleSubmit}>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Please enter your current password and a new password to update your account security.
            </DialogContentText>
            
            {passwordError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {passwordError}
              </Alert>
            )}
            
            {passwordSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {passwordSuccess}
              </Alert>
            )}
            
            <TextField
              margin="dense"
              id="currentPassword"
              name="currentPassword"
              label="Current Password"
              type="password"
              fullWidth
              variant="outlined"
              value={passwordFormik.values.currentPassword}
              onChange={passwordFormik.handleChange}
              error={passwordFormik.touched.currentPassword && Boolean(passwordFormik.errors.currentPassword)}
              helperText={passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              id="newPassword"
              name="newPassword"
              label="New Password"
              type="password"
              fullWidth
              variant="outlined"
              value={passwordFormik.values.newPassword}
              onChange={passwordFormik.handleChange}
              error={passwordFormik.touched.newPassword && Boolean(passwordFormik.errors.newPassword)}
              helperText={passwordFormik.touched.newPassword && passwordFormik.errors.newPassword}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              fullWidth
              variant="outlined"
              value={passwordFormik.values.confirmPassword}
              onChange={passwordFormik.handleChange}
              error={passwordFormik.touched.confirmPassword && Boolean(passwordFormik.errors.confirmPassword)}
              helperText={passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleClosePasswordModal} color="primary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Change Password
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}
