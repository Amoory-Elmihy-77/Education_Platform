import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { courses } from '../data/mockData';

import { useTheme } from '../context/ThemeContext';
import Categories from '../components/home/Categories';

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
        <Grid container spacing={{ xs: 2.5, sm: 3, md: 4 }}>
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
                  borderRadius: { xs: 1.5, sm: 2 },
                  overflow: 'hidden',
                  transition: 'all 0.3s ease-in-out',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height={window.innerWidth < 600 ? "180" : "200"}
                  image={course.image}
                  alt={course.title}
                  sx={{
                    objectFit: 'cover',
                  }}
                />
                <CardContent sx={{ 
                  flexGrow: 1, 
                  p: { xs: 2, sm: 2.5, md: 3 },
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  gap: { xs: 0.75, sm: 1 }
                }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    sx={{ 
                      fontWeight: 600, 
                      color: 'var(--text-primary)',
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                      lineHeight: 1.3,
                      mb: { xs: 0.5, sm: 1 }
                    }}
                  >
                    {course.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ 
                      mb: { xs: 1.5, sm: 2 }, 
                      color: 'var(--text-secondary)',
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {course.description}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      mt: 'auto',
                      pt: { xs: 1, sm: 1.5 }
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      gap: { xs: 0.75, sm: 1 }
                    }}>
                      <Typography
                        variant="caption"
                        sx={{
                          px: { xs: 1, sm: 1.5 },
                          py: { xs: 0.5, sm: 0.75 },
                          borderRadius: 1,
                          backgroundColor: 'var(--bg-secondary)',
                          color: 'var(--text-secondary)',
                          fontWeight: 500,
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          display: 'inline-block',
                          width: 'fit-content'
                        }}
                      >
                        {course.category}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography
                          variant="body2"
                          sx={{ 
                            color: 'var(--accent-primary)', 
                            fontWeight: 600,
                            fontSize: { xs: '0.8rem', sm: '0.9rem' },
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Box component="span" sx={{ color: '#fbbf24', mr: 0.5 }}>★</Box> {course.rating}
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

      {/* Categories Section */}
      <Categories />
    </Box>
  );
}
