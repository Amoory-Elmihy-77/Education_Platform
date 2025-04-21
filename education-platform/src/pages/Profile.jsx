import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { users } from '../data/mockData';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  bio: yup.string(),
});

export default function Profile() {
  const [userType, setUserType] = useState('student');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // In a real app, this would be an API call
    // Mock getting current user data
    const mockUser = userType === 'student' ? users.students[0] : users.instructors[0];
    setUserData(mockUser);
  }, [userType]);

  const formik = useFormik({
    initialValues: {
      name: userData?.name || '',
      email: userData?.email || '',
      bio: userData?.bio || '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Updated profile:', values);
      // Handle profile update logic here
    },
  });

  if (!userData) {
    return <div>Loading...</div>;
  }

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
                src={userData.avatar}
              >
                {userData.name.charAt(0)}
              </Avatar>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 600,
                  mb: 2,
                  fontSize: { xs: '1.25rem', sm: '1.5rem' }
                }}
              >
                {userData.name}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'text.secondary',
                  mb: { xs: 2, sm: 3, md: 4 }
                }}
              >
                {userType === 'instructor' ? 'Instructor' : 'Student'}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mb: { xs: 2, sm: 3, md: 4 } }}
              >
                Change Avatar
              </Button>
              <Divider sx={{ my: { xs: 2, sm: 3, md: 4 } }} />
              {userType === 'instructor' && (
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
                        {userData.courses?.length || 0}
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
              {userType === 'student' && (
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
                        {userData.enrolledCourses?.length || 0}
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
            <Typography variant="h6" className="mb-4">
              Profile Settings
            </Typography>
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
                  onClick={() => {
                    // Handle password change logic
                  }}
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
    </Container>
  );
}
