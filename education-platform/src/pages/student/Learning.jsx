import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  LinearProgress,
  Divider,
  Button,
} from '@mui/material';
import { PlayCircleOutline, CheckCircle } from '@mui/icons-material';
import { courses } from '../../data/mockData';

export default function Learning() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currentUser, updateCourseProgress, isEnrolled } = useAuth();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    
    // Check if user is enrolled in this course
    if (!isEnrolled(courseId)) {
      setLoading(false);
      return;
    }
    
    // Get course data
    const foundCourse = courses.find(c => c.id === parseInt(courseId));
    setCourse(foundCourse);
    
    if (foundCourse && foundCourse.lessons && foundCourse.lessons.length > 0) {
      // Get user's progress for this course
      const userProgress = currentUser.progress[courseId] || { completed: [], current: "1" };
      
      // Set completed lessons from user's progress
      setCompletedLessons(userProgress.completed || []);
      
      // Find current lesson based on user's progress
      const currentLessonId = userProgress.current;
      const currentLessonObj = foundCourse.lessons.find(l => l.id.toString() === currentLessonId.toString());
      
      // If current lesson is found, set it, otherwise use the first lesson
      if (currentLessonObj) {
        setCurrentLesson(currentLessonObj);
      } else {
        setCurrentLesson(foundCourse.lessons[0]);
      }
    }
    
    setLoading(false);
  }, [courseId, currentUser, isEnrolled]);

  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson);
    
    // Update current lesson in user's progress without marking as completed
    if (currentUser) {
      updateCourseProgress(courseId, lesson.id, false);
    }
  };

  const handleLessonComplete = () => {
    if (!currentUser) {
      navigate(`/login?redirect=/learning/${courseId}`);
      return;
    }
    
    if (currentLesson && !completedLessons.includes(currentLesson.id)) {
      // Update local state
      setCompletedLessons([...completedLessons, currentLesson.id]);
      
      // Update user's progress in AuthContext
      updateCourseProgress(courseId, currentLesson.id, true);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <Typography>Loading course content...</Typography>
      </Container>
    );
  }
  
  // Redirect to login if not logged in
  if (!currentUser) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="info" sx={{ mb: 4 }}>
          Please log in to access this course
        </Alert>
        <Button
          component={Link}
          to={`/login?redirect=/learning/${courseId}`}
          variant="contained"
          color="primary"
        >
          Log In
        </Button>
      </Container>
    );
  }
  
  // Redirect to course details if not enrolled
  if (!isEnrolled(courseId)) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="info" sx={{ mb: 4 }}>
          You need to enroll in this course to access the content
        </Alert>
        <Button
          component={Link}
          to={`/course/${courseId}`}
          variant="contained"
          color="primary"
        >
          Go to Course
        </Button>
      </Container>
    );
  }
  
  // Course or lesson not found
  if (!course || !currentLesson) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <Typography>Course content not found</Typography>
      </Container>
    );
  }

  const progress = (completedLessons.length / course.lessons.length) * 100;

  return (
    <Container maxWidth="lg" className="py-8">
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card className="mb-4">
            <div className="aspect-w-16 aspect-h-9 bg-black">
              <div className="w-full h-[400px] bg-gray-800 flex items-center justify-center">
                <Typography variant="h6" className="text-white">
                  Video Player: {currentLesson.title}
                </Typography>
              </div>
            </div>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h5" className="font-semibold mb-4">
                {currentLesson.title}
              </Typography>
              <Typography variant="body1" className="mb-4">
                Duration: {currentLesson.duration}
              </Typography>
              <Typography variant="body1" className="mb-4">
                This is where the lesson description and any additional materials would go.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLessonComplete}
                disabled={completedLessons.includes(currentLesson.id)}
              >
                {completedLessons.includes(currentLesson.id)
                  ? 'Completed'
                  : 'Mark as Complete'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-2">
                Course Progress
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                className="mb-4"
              />
              <Typography variant="body2" className="mb-4">
                {completedLessons.length} of {course.lessons.length} lessons completed
              </Typography>

              <Typography variant="h6" className="font-semibold mb-2">
                Course Content
              </Typography>
              <List>
                {course.lessons.map((lesson) => (
                  <div key={lesson.id}>
                    <ListItemButton
                      selected={currentLesson.id === lesson.id}
                      onClick={() => handleLessonClick(lesson)}
                    >
                      <ListItemIcon>
                        {completedLessons.includes(lesson.id) ? (
                          <CheckCircle color="primary" />
                        ) : (
                          <PlayCircleOutline />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={lesson.title}
                        secondary={lesson.duration}
                      />
                    </ListItemButton>
                    <Divider />
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
