import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Rating,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Favorite } from '@mui/icons-material';
import { courses, users } from '../../data/mockData';

export default function Favorites() {
  const [favoriteCourses, setFavoriteCourses] = useState([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const student = users.students[0]; // Mock current user
    const favorites = courses.filter(course => 
      student.favorites.includes(course.id)
    );
    setFavoriteCourses(favorites);
  }, []);

  const handleRemoveFromFavorites = (courseId) => {
    setFavoriteCourses(favoriteCourses.filter(course => course.id !== courseId));
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" className="mb-6 font-bold">
        My Favorites
      </Typography>

      {favoriteCourses.length === 0 ? (
        <Card className="p-6 text-center">
          <Typography variant="h6" className="mb-4">
            You haven't added any courses to your favorites yet
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
          >
            Browse Courses
          </Button>
        </Card>
      ) : (
        <Grid container spacing={4}>
          {favoriteCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card className="h-full relative">
                <IconButton
                  className="absolute top-2 right-2 z-10"
                  onClick={() => handleRemoveFromFavorites(course.id)}
                >
                  <Favorite color="error" />
                </IconButton>
                <CardMedia
                  component="img"
                  height="200"
                  image={course.thumbnail}
                  alt={course.title}
                  className="h-48 object-cover"
                />
                <CardContent>
                  <Typography variant="h6" className="font-semibold mb-2">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className="mb-2">
                    By {course.instructor}
                  </Typography>
                  <div className="flex items-center mb-2">
                    <Rating value={course.rating} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" className="ml-1">
                      ({course.rating})
                    </Typography>
                  </div>
                  <Typography variant="h6" color="primary" className="mb-4">
                    ${course.price}
                  </Typography>
                  <Button
                    component={Link}
                    to={'/course/' + course.id}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    View Course
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
