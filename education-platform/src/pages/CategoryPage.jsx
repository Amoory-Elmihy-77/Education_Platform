import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Rating,
  Chip,
  Button,
  Breadcrumbs,
  Divider,
} from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { courses } from '../data/mockData';
import { categoryCourses } from '../data/categoryCoursesData';
import { categories } from '../components/home/Categories';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [categoryCourses, setCategoryCourses] = useState([]);
  const [category, setCategory] = useState(null);
  
  useEffect(() => {
    // Find the category
    const foundCategory = categories.find(cat => cat.id === categoryId);
    setCategory(foundCategory);
    
    if (foundCategory) {
      // For demonstration purposes, just display all courses from both sources
      // In a real app, you would filter by actual category
      const allCourses = [...courses, ...categoryCourses];
      
      // Take a subset of courses to display for each category
      // This ensures each category has some courses to show
      const startIndex = parseInt(categoryId.charCodeAt(0)) % 5;
      const categorySpecificCourses = allCourses.slice(startIndex, startIndex + 6);
      
      setCategoryCourses(categorySpecificCourses);
    }
  }, [categoryId]);
  
  if (!category) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography>Category not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
        sx={{ mb: 4 }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Home
        </Link>
        <Typography color="text.primary">{category.title}</Typography>
      </Breadcrumbs>
      
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 4,
          p: 4,
          borderRadius: 2,
          bgcolor: 'rgba(0, 0, 0, 0.02)',
          backgroundImage: `linear-gradient(to right, ${category.color}22, ${category.color}11)`,
          border: `1px solid ${category.color}33`,
        }}
      >
        <Box 
          sx={{ 
            color: 'white',
            bgcolor: category.color,
            p: 2,
            borderRadius: 2,
            mr: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {React.cloneElement(category.icon, { style: { fontSize: 40 } })}
        </Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {category.title} Courses
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {category.description}
          </Typography>
        </Box>
      </Box>
      
      <Divider sx={{ mb: 4 }} />
      
      {categoryCourses.length > 0 ? (
        <Grid container spacing={4}>
          {categoryCourses.map((course) => (
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
                      to={`/course/${course.id}`}
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
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            No courses found in this category
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
          >
            Browse All Courses
          </Button>
        </Box>
      )}
    </Container>
  );
}
