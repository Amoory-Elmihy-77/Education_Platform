import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Card,
  CardContent,
  MenuItem,
  Alert,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required').min(0, 'Price must be positive'),
  category: yup.string().required('Category is required'),
  thumbnail: yup.string().required('Thumbnail URL is required'),
});

const categories = [
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Machine Learning',
  'DevOps',
  'Design',
  'Business',
  'Marketing',
];

export default function AddCourse() {
  const navigate = useNavigate();
  const { currentUser, addCourse } = useAuth();
  const [lessons, setLessons] = useState([
    { id: 1, title: '', duration: '', videoUrl: '' }
  ]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Check if user is logged in and is an instructor
  useEffect(() => {
    if (!currentUser) {
      navigate('/login?redirect=/add-course');
      return;
    }
    
    if (currentUser.userType !== 'instructor') {
      navigate('/');
      return;
    }
  }, [currentUser, navigate]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      category: '',
      thumbnail: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setError('');
      setSuccess('');
      
      // Filter out empty lessons
      const filteredLessons = lessons.filter(lesson => lesson.title && lesson.duration);
      
      if (filteredLessons.length === 0) {
        setError('Please add at least one lesson with title and duration');
        return;
      }
      
      // Create course data object
      const courseData = {
        ...values,
        price: parseFloat(values.price),
        lessons: filteredLessons,
        image: values.thumbnail, // For consistency with other course data
        thumbnail: values.thumbnail,
        duration: filteredLessons.reduce((total, lesson) => {
          // Extract minutes from duration string (e.g., "15:00" -> 15)
          const minutes = parseInt(lesson.duration.split(':')[0]) || 0;
          return total + minutes;
        }, 0),
        language: 'English', // Default language
        learningObjectives: [], // Can be added in a future enhancement
      };
      
      // Add the course using the addCourse method from AuthContext
      const result = addCourse(courseData);
      
      if (result.success) {
        setSuccess('Course created successfully!');
        // Reset form
        formik.resetForm();
        setLessons([{ id: 1, title: '', duration: '', videoUrl: '' }]);
        
        // Navigate to instructor courses page after a delay
        setTimeout(() => {
          navigate('/instructor-courses');
        }, 2000);
      } else {
        setError(result.error || 'Failed to create course');
      }
    },
  });

  const handleAddLesson = () => {
    setLessons([
      ...lessons,
      {
        id: lessons.length + 1,
        title: '',
        duration: '',
        videoUrl: '',
      }
    ]);
  };

  const handleRemoveLesson = (lessonId) => {
    if (lessons.length > 1) {
      setLessons(lessons.filter(lesson => lesson.id !== lessonId));
    }
  };

  const handleLessonChange = (lessonId, field, value) => {
    setLessons(lessons.map(lesson =>
      lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
    ));
  };

  return (
    <Container maxWidth="md" className="py-8">
      <Typography variant="h4" className="mb-6 font-bold text-center">
        Create New Course
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <Paper className="p-6 mb-6">
          <Typography variant="h6" className="mb-4">
            Course Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Course Title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price ($)"
                name="price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Thumbnail URL"
                name="thumbnail"
                value={formik.values.thumbnail}
                onChange={formik.handleChange}
                error={formik.touched.thumbnail && Boolean(formik.errors.thumbnail)}
                helperText={formik.touched.thumbnail && formik.errors.thumbnail}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper className="p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6">
              Course Content
            </Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddLesson}
              color="primary"
            >
              Add Lesson
            </Button>
          </div>

          {lessons.map((lesson, index) => (
            <Card key={lesson.id} className="mb-4">
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <div className="flex justify-between items-center mb-2">
                      <Typography variant="subtitle1">
                        Lesson {index + 1}
                      </Typography>
                      {lessons.length > 1 && (
                        <IconButton
                          onClick={() => handleRemoveLesson(lesson.id)}
                          color="error"
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Lesson Title"
                      value={lesson.title}
                      onChange={(e) => handleLessonChange(lesson.id, 'title', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Duration (e.g., 15:00)"
                      value={lesson.duration}
                      onChange={(e) => handleLessonChange(lesson.id, 'duration', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Video URL"
                      value={lesson.videoUrl}
                      onChange={(e) => handleLessonChange(lesson.id, 'videoUrl', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Paper>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Create Course
          </Button>
        </div>
      </form>
    </Container>
  );
}
