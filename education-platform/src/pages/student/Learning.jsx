import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundCourse = courses.find(c => c.id === parseInt(courseId));
    setCourse(foundCourse);
    if (foundCourse && foundCourse.lessons.length > 0) {
      setCurrentLesson(foundCourse.lessons[0]);
    }
  }, [courseId]);

  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson);
  };

  const handleLessonComplete = () => {
    if (currentLesson && !completedLessons.includes(currentLesson.id)) {
      setCompletedLessons([...completedLessons, currentLesson.id]);
    }
  };

  if (!course || !currentLesson) {
    return <div>Loading...</div>;
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
