import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundCourse = courses.find(c => c.id === parseInt(id));
    setCourse(foundCourse);
    document.title = `${foundCourse?.title || 'Course'} - Education Platform`;
  }, [id]);

  if (!course) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Typography variant="h5">Loading...</Typography>
      </Box>
    );
  }

  const handleEnroll = () => {
    navigate(`/payment/${id}`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Box sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 700, 
                mb: 2,
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' } 
              }}>
                {course.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                By {course.instructor}
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' }, 
                gap: { xs: 2, sm: 4 } 
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Rating value={course.rating} precision={0.1} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({course.rating})
                  </Typography>
                </Box>
                <Typography variant="body2">
                  {course.duration} hours total
                </Typography>
              </Box>
            </Box>

          <Card sx={{ mb: { xs: 4, sm: 5, md: 6 } }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 4 }}>
                Course Description
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                {course.description}
              </Typography>
              <Chip label={course.category} color="primary" />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 4 }}>
                What you'll learn
              </Typography>
              <Grid container spacing={2}>
                {course.learningObjectives?.map((objective, index) => (
                  <Grid item xs={12} sm={6} key={index} sx={{ mb: { xs: 2, sm: 0 } }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <CheckCircleOutline sx={{ color: 'var(--accent-primary)' }} />
                      <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                        {objective}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ 
            position: { md: 'sticky' }, 
            top: '24px',
            mb: { xs: 3, md: 0 } 
          }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box
                component="img"
                src={course.image}
                alt={course.title}
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  mb: 2,
                  aspectRatio: '16/9',
                  objectFit: 'cover',
                }}
              />
              <Typography variant="h4" sx={{ 
                fontWeight: 700, 
                textAlign: 'center',
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' } 
              }}>
                ${course.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleEnroll}
                sx={{ mb: 2 }}
              >
                Enroll Now
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                fullWidth
                startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                onClick={toggleFavorite}
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
