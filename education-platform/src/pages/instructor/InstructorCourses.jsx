import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Alert,
  Box,
  Rating,
  Chip,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

export default function InstructorCourses() {
  const navigate = useNavigate();
  const { currentUser, getInstructorCourses } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and is an instructor
    if (!currentUser) {
      navigate('/login?redirect=/instructor-courses');
      return;
    }
    
    if (currentUser.userType !== 'instructor') {
      navigate('/');
      return;
    }
    
    // Get instructor's courses
    const instructorCourses = getInstructorCourses();
    setCourses(instructorCourses);
    setLoading(false);
  }, [currentUser, navigate, getInstructorCourses]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography>Loading courses...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          My Courses
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          component={Link}
          to="/add-course"
        >
          Create New Course
        </Button>
      </Box>

      {courses.length === 0 ? (
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            You haven't created any courses yet
          </Typography>
          <Button
            component={Link}
            to="/add-course"
            variant="contained"
            color="primary"
          >
            Create Your First Course
          </Button>
        </Card>
      ) : (
        <Grid container spacing={4}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)'
                }
              }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={course.thumbnail || course.image}
                  alt={course.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {course.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={course.rating || 0} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({course.rating || 0})
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 1 }}>
                    <Chip 
                      label={course.category} 
                      size="small" 
                      color="primary" 
                      sx={{ mr: 1, mb: 1 }} 
                    />
                    <Chip 
                      label={`${course.students || 0} students`} 
                      size="small" 
                      variant="outlined"
                      sx={{ mb: 1 }} 
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {course.description.length > 100 
                      ? `${course.description.substring(0, 100)}...` 
                      : course.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                    <Typography variant="h6" color="primary">
                      ${course.price}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      component={Link}
                      to={`/instructor/course/${course.id}`}
                      size="small"
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
