import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Grid,
  Card,
  CardContent,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  Category as CategoryIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { 
    currentUser, 
    getAllStudents, 
    getAllInstructors, 
    getAllCourses, 
    getAllCategories,
    deleteStudent,
    deleteInstructor,
    deleteCourse
  } = useAuth();
  
  const [tabValue, setTabValue] = useState(0);
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ type: '', id: null });
  
  useEffect(() => {
    // Check if user is logged in and is an admin
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (currentUser.userType !== 'admin') {
      navigate('/');
      return;
    }
    
    // Load data
    loadData();
  }, [currentUser, navigate]);
  
  const loadData = () => {
    setLoading(true);
    setError('');
    
    // Get students
    const studentsResult = getAllStudents();
    if (studentsResult.success) {
      setStudents(studentsResult.students);
    } else {
      setError(studentsResult.error || 'Failed to load students');
    }
    
    // Get instructors
    const instructorsResult = getAllInstructors();
    if (instructorsResult.success) {
      setInstructors(instructorsResult.instructors);
    } else {
      setError(instructorsResult.error || 'Failed to load instructors');
    }
    
    // Get courses
    const coursesResult = getAllCourses();
    if (coursesResult.success) {
      setCourses(coursesResult.courses);
    } else {
      setError(coursesResult.error || 'Failed to load courses');
    }
    
    // Get categories
    const categoriesResult = getAllCategories();
    if (categoriesResult.success) {
      setCategories(categoriesResult.categories);
    } else {
      setError(categoriesResult.error || 'Failed to load categories');
    }
    
    setLoading(false);
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleDeleteClick = (type, id) => {
    setItemToDelete({ type, id });
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    const { type, id } = itemToDelete;
    let result;
    
    if (type === 'student') {
      result = deleteStudent(id);
      if (result.success) {
        setStudents(students.filter(student => student.id !== id));
        setSuccess('Student deleted successfully');
      } else {
        setError(result.error || 'Failed to delete student');
      }
    } else if (type === 'instructor') {
      result = deleteInstructor(id);
      if (result.success) {
        setInstructors(instructors.filter(instructor => instructor.id !== id));
        setSuccess('Instructor deleted successfully');
      } else {
        setError(result.error || 'Failed to delete instructor');
      }
    } else if (type === 'course') {
      result = deleteCourse(id);
      if (result.success) {
        setCourses(courses.filter(course => course.id !== id));
        setSuccess('Course deleted successfully');
      } else {
        setError(result.error || 'Failed to delete course');
      }
    }
    
    setDeleteDialogOpen(false);
    
    // Clear success message after 3 seconds
    if (result && result.success) {
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    }
  };
  
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading dashboard data...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Admin Dashboard
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
      
      {/* Dashboard Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <PersonIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4">{students.length}</Typography>
              <Typography variant="body1">Students</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'secondary.main', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <SchoolIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4">{instructors.length}</Typography>
              <Typography variant="body1">Instructors</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <MenuBookIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4">{courses.length}</Typography>
              <Typography variant="body1">Courses</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'info.main', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <CategoryIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4">{categories.length}</Typography>
              <Typography variant="body1">Categories</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="dashboard tabs"
          centered
        >
          <Tab label="Students" icon={<PersonIcon />} iconPosition="start" />
          <Tab label="Instructors" icon={<SchoolIcon />} iconPosition="start" />
          <Tab label="Courses" icon={<MenuBookIcon />} iconPosition="start" />
          <Tab label="Categories" icon={<CategoryIcon />} iconPosition="start" />
        </Tabs>
        
        {/* Students Tab */}
        <TabPanel value={tabValue} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Enrolled Courses</TableCell>
                  <TableCell>Favorites</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.enrolledCourses}</TableCell>
                    <TableCell>{student.favorites}</TableCell>
                    <TableCell>
                      <IconButton 
                        color="error" 
                        onClick={() => handleDeleteClick('student', student.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        
        {/* Instructors Tab */}
        <TabPanel value={tabValue} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Courses</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {instructors.map((instructor) => (
                  <TableRow key={instructor.id}>
                    <TableCell>{instructor.id}</TableCell>
                    <TableCell>{instructor.name}</TableCell>
                    <TableCell>{instructor.email}</TableCell>
                    <TableCell>{instructor.courses}</TableCell>
                    <TableCell>
                      <IconButton 
                        color="error" 
                        onClick={() => handleDeleteClick('instructor', instructor.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        
        {/* Courses Tab */}
        <TabPanel value={tabValue} index={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Instructor</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Students</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.id}</TableCell>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>${course.price}</TableCell>
                    <TableCell>{course.rating}</TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell>
                      <IconButton 
                        color="error" 
                        onClick={() => handleDeleteClick('course', course.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        
        {/* Categories Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={4} key={category.id}>
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
                  <Box 
                    sx={{ 
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: 2,
                      color: 'white',
                      bgcolor: category.color || 'primary.main',
                    }}
                  >
                    {category.icon}
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600 }}>
                      {category.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Paper>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this {itemToDelete.type}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
