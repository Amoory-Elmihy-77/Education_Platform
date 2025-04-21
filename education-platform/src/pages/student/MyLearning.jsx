import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  LinearProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { courses, users } from '../../data/mockData';

export default function MyLearning() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const student = users.students[0]; // Mock current user
    const enrolled = courses.filter(course => 
      student.enrolledCourses.includes(course.id)
    );
    setEnrolledCourses(enrolled);
  }, []);

  const getProgress = (courseId) => {
    const student = users.students[0]; // Mock current user
    const progress = student.progress[courseId];
    if (!progress) return 0;
    
    const course = courses.find(c => c.id === courseId);
    if (!course) return 0;
    
    return (progress.completed.length / course.lessons.length) * 100;
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" className="mb-6 font-bold">
        My Learning
      </Typography>

      {enrolledCourses.length === 0 ? (
        <Card className="p-6 text-center">
          <Typography variant="h6" className="mb-4">
            You haven't enrolled in any courses yet
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
          {enrolledCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card className="h-full">
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
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <Typography variant="body2">
                        Progress: {Math.round(getProgress(course.id))}%
                      </Typography>
                    </div>
                    <LinearProgress
                      variant="determinate"
                      value={getProgress(course.id)}
                    />
                  </div>
                  <Button
                    component={Link}
                    to={'/learning/' + course.id}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Continue Learning
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
