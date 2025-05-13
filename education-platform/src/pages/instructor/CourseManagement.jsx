import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  Divider,
  Chip,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  IconButton,
  Alert,
  Tabs,
  Tab,
  Rating,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PlayCircleOutline,
  AccessTime,
  Assignment,
  School,
  Language,
  Person,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { courses } from '../../data/mockData';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`course-tabpanel-${index}`}
      aria-labelledby={`course-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function CourseManagement() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currentUser, updateCourse, getEnrolledStudents } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    thumbnail: '',
    lessons: []
  });

  useEffect(() => {
    // Check if user is logged in and is an instructor
    if (!currentUser) {
      navigate('/login?redirect=/instructor/course/' + courseId);
      return;
    }
    
    if (currentUser.userType !== 'instructor') {
      navigate('/');
      return;
    }
    
    // Find the course
    const foundCourse = courses.find(c => c.id === parseInt(courseId));
    
    // Check if course exists and belongs to this instructor
    if (!foundCourse || foundCourse.instructorId !== currentUser.id) {
      navigate('/instructor-courses');
      return;
    }
    
    setCourse(foundCourse);
    setFormData({
      title: foundCourse.title || '',
      description: foundCourse.description || '',
      price: foundCourse.price || '',
      category: foundCourse.category || '',
      thumbnail: foundCourse.thumbnail || foundCourse.image || '',
      lessons: foundCourse.lessons || []
    });
    
    // Get enrolled students
    const result = getEnrolledStudents(parseInt(courseId));
    if (result.success) {
      setEnrolledStudents(result.students);
    }
    
    setLoading(false);
  }, [courseId, currentUser, navigate, getEnrolledStudents]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditToggle = () => {
    if (editMode) {
      // Cancel edit mode - reset form data
      setFormData({
        title: course.title || '',
        description: course.description || '',
        price: course.price || '',
        category: course.category || '',
        thumbnail: course.thumbnail || course.image || '',
        lessons: course.lessons || []
      });
    }
    setEditMode(!editMode);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseFloat(value) || value : value
    });
  };

  const handleLessonChange = (index, field, value) => {
    const updatedLessons = [...formData.lessons];
    updatedLessons[index] = {
      ...updatedLessons[index],
      [field]: value
    };
    setFormData({
      ...formData,
      lessons: updatedLessons
    });
  };

  const handleAddLesson = () => {
    setFormData({
      ...formData,
      lessons: [
        ...formData.lessons,
        {
          id: formData.lessons.length + 1,
          title: '',
          duration: '',
          videoUrl: ''
        }
      ]
    });
  };

  const handleRemoveLesson = (index) => {
    if (formData.lessons.length > 1) {
      const updatedLessons = [...formData.lessons];
      updatedLessons.splice(index, 1);
      setFormData({
        ...formData,
        lessons: updatedLessons
      });
    }
  };

  const handleSave = () => {
    setError('');
    setSuccess('');
    
    // Validate form data
    if (!formData.title.trim()) {
      setError('Course title is required');
      return;
    }
    
    if (!formData.description.trim()) {
      setError('Course description is required');
      return;
    }
    
    if (!formData.price && formData.price !== 0) {
      setError('Course price is required');
      return;
    }
    
    if (!formData.category.trim()) {
      setError('Course category is required');
      return;
    }
    
    // Filter out empty lessons
    const filteredLessons = formData.lessons.filter(lesson => 
      lesson.title.trim() && lesson.duration.trim()
    );
    
    if (filteredLessons.length === 0) {
      setError('At least one lesson with title and duration is required');
      return;
    }
    
    // Update course
    // In a real app, this would call an API endpoint
    // For now, we'll just update the course in the mock data
    const updatedCourse = {
      ...course,
      ...formData,
      lessons: filteredLessons
    };
    
    // Find the course in the courses array and update it
    const courseIndex = courses.findIndex(c => c.id === parseInt(courseId));
    if (courseIndex !== -1) {
      courses[courseIndex] = updatedCourse;
      setCourse(updatedCourse);
      setSuccess('Course updated successfully');
      setEditMode(false);
    } else {
      setError('Failed to update course');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography>Loading course details...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          component={Link}
          to="/instructor-courses"
          variant="outlined"
          sx={{ mb: 2 }}
        >
          Back to My Courses
        </Button>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {editMode ? 'Edit Course' : 'Course Details'}
          </Typography>
          <Button
            variant={editMode ? "outlined" : "contained"}
            color={editMode ? "error" : "primary"}
            startIcon={editMode ? <CancelIcon /> : <EditIcon />}
            onClick={handleEditToggle}
          >
            {editMode ? 'Cancel' : 'Edit Course'}
          </Button>
        </Box>
      </Box>
      
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
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="course management tabs">
          <Tab label="Overview" />
          <Tab label="Content" />
          <Tab label="Students" />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 4 }}>
              {editMode ? (
                <Box component="form" sx={{ '& .MuiTextField-root': { mb: 3 } }}>
                  <TextField
                    fullWidth
                    label="Course Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Price ($)"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                  </Grid>
                  
                  <TextField
                    fullWidth
                    label="Thumbnail URL"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      onClick={handleSave}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Box>
              ) : (
                <>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    {course.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={course.rating || 0} precision={0.1} readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({course.rating || 0})
                    </Typography>
                  </Box>
                  
                  <Chip 
                    label={course.category} 
                    color="primary" 
                    sx={{ mb: 3 }} 
                  />
                  
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {course.description}
                  </Typography>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Course Details
                  </Typography>
                  
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTime sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography>
                          Duration: {course.duration || 0} hours
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Assignment sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography>
                          Lessons: {course.lessons?.length || 0}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Language sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography>
                          Language: {course.language || 'English'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Person sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography>
                          Students: {course.students || 0}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </>
              )}
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Box
                  component="img"
                  src={course.thumbnail || course.image}
                  alt={course.title}
                  sx={{
                    width: '100%',
                    borderRadius: 1,
                    mb: 2,
                    aspectRatio: '16/9',
                    objectFit: 'cover',
                  }}
                />
                
                <Typography variant="h5" sx={{ 
                  fontWeight: 700, 
                  textAlign: 'center',
                  mb: 2
                }}>
                  ${course.price}
                </Typography>
                
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  component={Link}
                  to={`/course/${course.id}`}
                  sx={{ mb: 1 }}
                >
                  View Public Page
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              Course Content
            </Typography>
            
            {editMode && (
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddLesson}
                variant="outlined"
                color="primary"
              >
                Add Lesson
              </Button>
            )}
          </Box>
          
          {editMode ? (
            <>
              {formData.lessons.map((lesson, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="subtitle1">
                        Lesson {index + 1}
                      </Typography>
                      
                      {formData.lessons.length > 1 && (
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveLesson(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Lesson Title"
                          value={lesson.title}
                          onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Duration (e.g., 15:00)"
                          value={lesson.duration}
                          onChange={(e) => handleLessonChange(index, 'duration', e.target.value)}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Video URL"
                          value={lesson.videoUrl}
                          onChange={(e) => handleLessonChange(index, 'videoUrl', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </Box>
            </>
          ) : (
            <List>
              {course.lessons?.map((lesson, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <PlayCircleOutline />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${index + 1}. ${lesson.title}`}
                      secondary={lesson.duration}
                    />
                  </ListItem>
                  {index < course.lessons.length - 1 && <Divider />}
                </React.Fragment>
              ))}
              
              {(!course.lessons || course.lessons.length === 0) && (
                <Typography variant="body2" sx={{ py: 2, textAlign: 'center' }}>
                  No lessons available
                </Typography>
              )}
            </List>
          )}
        </Paper>
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Enrolled Students
          </Typography>
          
          {enrolledStudents.length > 0 ? (
            <>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Total enrolled: {enrolledStudents.length} students
              </Typography>
              
              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Name</th>
                      <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Email</th>
                      <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Enrollment Date</th>
                      <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrolledStudents.map((student) => (
                      <tr key={student.id}>
                        <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>{student.name}</td>
                        <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>{student.email}</td>
                        <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>{student.enrollmentDate}</td>
                        <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                              sx={{
                                width: '100%',
                                mr: 1,
                                height: 8,
                                borderRadius: 5,
                                bgcolor: 'background.paper',
                                border: '1px solid rgba(0, 0, 0, 0.12)'
                              }}
                            >
                              <Box
                                sx={{
                                  width: `${student.progress}%`,
                                  height: '100%',
                                  borderRadius: 5,
                                  bgcolor: 'primary.main',
                                }}
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {student.progress}%
                            </Typography>
                          </Box>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </>
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
              No students enrolled yet
            </Typography>
          )}
        </Paper>
      </TabPanel>
    </Container>
  );
}
