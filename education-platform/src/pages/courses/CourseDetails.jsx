import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Divider,
  Chip,
  Box,
} from '@mui/material';
import {
  PlayCircleOutline,
  AccessTime,
  Assignment,
  School,
  Language,
  CheckCircleOutline,
  Favorite,
  FavoriteBorder,
  Person,
  Star,
} from '@mui/icons-material';

import { courses } from '../../data/mockData';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const { currentUser, isInFavorites, isEnrolled, addToFavorites, removeFromFavorites, enrollInCourse } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isUserEnrolled, setIsUserEnrolled] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundCourse = courses.find(c => c.id === parseInt(id));
    setCourse(foundCourse);
    document.title = `${foundCourse?.title || 'Course'} - Education Platform`;
    
    // Check if course is in user's favorites
    if (currentUser) {
      setIsFavorite(isInFavorites(id));
      setIsUserEnrolled(isEnrolled(id));
    }
  }, [id, currentUser, isInFavorites, isEnrolled]);

  if (!course) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Typography variant="h5">Loading...</Typography>
      </Box>
    );
  }

  const handleEnroll = () => {
    if (!currentUser) {
      // Redirect to login if not logged in
      navigate(`/login?redirect=/course/${id}`);
      return;
    }
    
    if (isUserEnrolled) {
      // If already enrolled, go to learning page
      navigate(`/learning/${id}`);
    } else {
      // Otherwise go to payment page
      navigate(`/payment/${id}`);
    }
  };

  const toggleFavorite = () => {
    if (!currentUser) {
      // Redirect to login if not logged in
      navigate(`/login?redirect=/course/${id}`);
      return;
    }
    
    if (isFavorite) {
      // Remove from favorites
      const result = removeFromFavorites(id);
      if (result.success) {
        setIsFavorite(false);
      }
    } else {
      // Add to favorites
      const result = addToFavorites(id);
      if (result.success) {
        setIsFavorite(true);
      }
    }
  };

  return (
    <Box sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, sm: 4, md: 6 }}>
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: { xs: 4, sm: 5, md: 6 } }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 700, 
                mb: { xs: 1.5, sm: 2 },
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                lineHeight: 1.2
              }}>
                {course.title}
              </Typography>
              <Typography 
                variant="subtitle1" 
                color="text.secondary" 
                sx={{ 
                  mb: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '1rem', sm: '1.1rem' }
                }}
              >
                By {course.instructor}
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' }, 
                gap: { xs: 1, sm: 3 },
                mb: { xs: 2, sm: 0 }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Rating 
                    value={course.rating} 
                    precision={0.1} 
                    readOnly 
                    size={window.innerWidth < 600 ? 'small' : 'medium'}
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({course.rating})
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {course.duration} hours total
                </Typography>
              </Box>
            </Box>

          <Card sx={{ mb: { xs: 4, sm: 5, md: 6 }, borderRadius: { xs: 1, sm: 2 }, overflow: 'hidden' }}>
            <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 4 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: { xs: 2, sm: 3, md: 4 } }}>
                Course Description
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: { xs: 2.5, sm: 3.5, md: 4 },
                  lineHeight: 1.7,
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }}
              >
                {course.description}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip 
                  label={course.category} 
                  color="primary" 
                  size={window.innerWidth < 600 ? 'small' : 'medium'}
                  sx={{ fontWeight: 500 }}
                />
                {course.level && (
                  <Chip 
                    label={course.level} 
                    color="secondary" 
                    variant="outlined"
                    size={window.innerWidth < 600 ? 'small' : 'medium'}
                  />
                )}
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: { xs: 1, sm: 2 }, overflow: 'hidden' }}>
            <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 4 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: { xs: 2, sm: 3, md: 4 } }}>
                What you'll learn
              </Typography>
              <List sx={{ p: 0 }}>
                {course.learningObjectives?.map((outcome, index) => (
                  <ListItem 
                    key={index} 
                    sx={{ 
                      py: { xs: 0.75, sm: 1 },
                      px: { xs: 0, sm: 1 },
                      alignItems: 'flex-start'
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: { xs: 36, sm: 42 }, mt: { xs: 0.5, sm: 0 } }}>
                      <CheckCircleOutline color="primary" fontSize={window.innerWidth < 600 ? 'small' : 'medium'} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={outcome} 
                      primaryTypographyProps={{ 
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        lineHeight: 1.5
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ 
            position: { md: 'sticky' }, 
            top: { md: '24px' },
            mb: { xs: 3, md: 0 },
            borderRadius: { xs: 1, sm: 2 },
            overflow: 'hidden',
            boxShadow: { xs: '0 2px 8px rgba(0,0,0,0.1)', md: '0 4px 12px rgba(0,0,0,0.15)' }
          }}>
            <CardContent sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: { xs: 2, sm: 3 },
              p: { xs: 2.5, sm: 3, md: 4 }
            }}>
              <Box
                component="img"
                src={course.image}
                alt={course.title}
                sx={{
                  width: '100%',
                  borderRadius: { xs: 1, sm: 2 },
                  mb: { xs: 1, sm: 2 },
                  aspectRatio: '16/9',
                  objectFit: 'cover',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
              />
              <Typography variant="h4" sx={{ 
                fontWeight: 700, 
                textAlign: 'center',
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                color: 'primary.main',
                py: { xs: 1, sm: 1.5 }
              }}>
                ${course.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size={window.innerWidth < 600 ? 'medium' : 'large'}
                fullWidth
                onClick={handleEnroll}
                sx={{ 
                  mb: { xs: 1, sm: 2 },
                  py: { xs: 1, sm: 1.5 },
                  borderRadius: { xs: 1, sm: 1.5 },
                  fontWeight: 600,
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }}
              >
                {isUserEnrolled ? 'Continue Learning' : 'Enroll Now'}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size={window.innerWidth < 600 ? 'medium' : 'large'}
                fullWidth
                startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                onClick={toggleFavorite}
                sx={{ 
                  borderRadius: { xs: 1, sm: 1.5 },
                  py: { xs: 0.75, sm: 1.25 }
                }}
              >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>

              <List sx={{ mt: 4 }}>
                {[
                  { icon: <AccessTime />, text: `${course.duration} total hours` },
                  { icon: <Assignment />, text: `${course.lessons} lessons` },
                  { icon: <Language />, text: course.language },
                  { icon: <PlayCircleOutline />, text: 'Full lifetime access' },
                ].map((item, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36, color: 'var(--text-secondary)' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ '& .MuiListItemText-primary': { color: 'var(--text-secondary)' } }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  </Box>
  );
}
