import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [lessons, setLessons] = useState([
    { id: 1, title: '', duration: '', videoUrl: '' }
  ]);

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
      // In a real app, this would be an API call
      console.log('Course values:', {
        ...values,
        lessons: lessons.filter(lesson => lesson.title && lesson.duration),
      });
      navigate('/');
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
