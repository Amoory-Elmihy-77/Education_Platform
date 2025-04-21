import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { courses } from '../data/mockData';

import { useTheme } from '../context/ThemeContext';

export default function Home() {
  const { darkMode } = useTheme();
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    document.title = 'Home - Education Platform';
    setPopularCourses(courses.slice(0, 6));
  }, []);

  return (
    <Box component="main" sx={{ minHeight: '100vh', pt: { xs: 4, sm: 6, md: 8 } }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(45deg, var(--accent-primary), var(--accent-secondary))`,
          color: '#fff',
          py: { xs: 6, md: 10 },
          mb: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                  textAlign: { xs: 'center', md: 'left' },
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Unlock Your Learning Potential
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' },
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                Discover a world of knowledge with our expert-led courses
              </Typography>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Button
                variant="contained"
                color="secondary"
                size="large"
                component={Link}
                to="/#featured"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: theme => theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: '#fff',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                  },
                }}
              >
                Get Started
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://source.unsplash.com/800x600/?education"
                alt="Education"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Courses Section */}
      <Container maxWidth="lg" sx={{ mb: { xs: 6, md: 8 } }} id="featured">
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            mb: { xs: 3, md: 4 },
            color: 'var(--text-primary)',
          }}
        >
          Featured Courses
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {popularCourses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4}>
              <Card
                component={Link}
                to={`/course/${course.id}`}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  borderRadius: 2,
                  transition: 'box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 8px 16px var(--shadow-color)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={course.image}
                  alt={course.title}
                  sx={{
                    objectFit: 'cover',
                  }}
                />
                <CardContent sx={{ 
                  flexGrow: 1, 
                  p: { xs: 2, sm: 3 },
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    sx={{ fontWeight: 600, color: 'var(--text-primary)' }}
                  >
                    {course.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 2, color: 'var(--text-secondary)' }}
                  >
                    {course.description}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 'auto',
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' }, 
                      gap: { xs: 1, sm: 2 }, 
                      mt: 2 
                    }}>
                      <Typography
                        variant="caption"
                        sx={{
                          px: 1.5,
                          py: 0.75,
                          borderRadius: 1,
                          backgroundColor: 'var(--bg-secondary)',
                          color: 'var(--text-secondary)',
                          fontWeight: 500,
                        }}
                      >
                        {course.category}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography
                          variant="body2"
                          sx={{ color: 'var(--accent-primary)', fontWeight: 600 }}
                        >
                          ★ {course.rating}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: 'var(--text-secondary)' }}
                        >
                          ({course.students} students)
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
