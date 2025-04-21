import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  InputBase,
  Paper,
  List,
  ListItem,
  Typography,
  Box,
  Drawer,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Close, 
  Menu as MenuIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import logo from '../../assets/logo.svg';
import { courses } from '../../data/mockData';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  // Apply dark mode to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    // Filter courses based on search query
    const filteredResults = courses.filter(course =>
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase()) ||
      course.category.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResults);
    setShowResults(true);
  };

  const handleSearchItemClick = (courseId) => {
    setShowResults(false);
    setSearchQuery('');
    navigate(`/course/${courseId}`);
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          boxShadow: 'var(--card-shadow)',
          padding: { xs: '0.25rem 0', sm: '0.5rem 0' },
          transition: 'padding 0.2s ease'
        }}
      >
        <Toolbar 
          disableGutters 
          sx={{ 
            px: { xs: 1.5, sm: 2, md: 3 },
            minHeight: { xs: '56px', sm: '64px' }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                sx={{ 
                  display: { sm: 'none' },
                  padding: { xs: 1 }
                }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    component="img"
                    src={logo} 
                    alt="Logo" 
                    sx={{ 
                      height: { xs: '32px', sm: '40px' },
                      transition: 'height 0.2s ease'
                    }}
                  />
                </Link>
              </Box>
            </Box>

            <Box sx={{ 
              flexGrow: 1, 
              maxWidth: { sm: '32rem', md: '42rem' }, 
              position: 'relative',
              display: { xs: mobileSearchOpen ? 'block' : 'none', sm: 'block' },
              mx: { sm: 2, md: 4 }
            }}>
              <Box sx={{ position: 'relative', width: '100%' }}>
                <SearchIcon
                  sx={{ 
                    position: 'absolute', 
                    left: { xs: 1, sm: 1.5 }, 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: 'var(--text-secondary)',
                    zIndex: 1,
                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                  }}
                />
                <InputBase
                  placeholder="Search for courses..."
                  value={searchQuery}
                  onChange={handleSearch}
                  sx={{
                    width: '100%',
                    pl: { xs: 4, sm: 5 },
                    pr: { xs: 1, sm: 2 },
                    py: { xs: 0.75, sm: 1 },
                    borderRadius: { xs: 0.75, sm: 1 },
                    backgroundColor: 'var(--search-bg)',
                    color: 'var(--search-text)',
                    border: '1px solid var(--search-border)',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    '&:hover': {
                      borderColor: 'var(--search-hover)'
                    },
                    '&.Mui-focused': {
                      borderColor: 'var(--accent-primary)',
                      boxShadow: '0 0 0 2px rgba(var(--accent-primary-rgb), 0.2)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                  inputProps={{ 
                    'aria-label': 'search',
                  }}
                  onFocus={() => {
                    if (searchQuery.trim() !== '') {
                      setShowResults(true);
                    }
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                component={Link}
                to="/login"
                variant="text"
                sx={{
                  color: 'var(--text-primary)',
                  display: { xs: 'none', sm: 'flex' },
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  py: { xs: 0.5, sm: 0.75 },
                  px: { xs: 1, sm: 1.5 }
                }}
              >
                Sign In
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                sx={{
                  backgroundColor: 'var(--accent-primary)',
                  color: '#fff',
                  display: { xs: 'none', sm: 'flex' },
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  py: { xs: 0.5, sm: 0.75 },
                  px: { xs: 1.5, sm: 2 },
                  '&:hover': {
                    backgroundColor: 'var(--accent-secondary)'
                  }
                }}
              >
                Sign Up
              </Button>
            </Box>
            <Box sx={{ 
              display: { xs: !mobileSearchOpen ? 'flex' : 'none', sm: 'flex' }, 
              gap: { xs: 1, sm: 2 }, 
              alignItems: 'center'
            }}>
              <IconButton
                sx={{ display: { sm: 'none' } }}
                onClick={() => setMobileSearchOpen(true)}
                color="inherit"
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>

        {/* Mobile Menu */}
        <Box
          sx={{
            display: { xs: mobileMenuOpen ? 'block' : 'none', sm: 'none' },
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            bgcolor: 'var(--bg-primary)',
            borderTop: '1px solid var(--border-color)',
            zIndex: 1000,
          }}
        >
          <List>
            <ListItem button component={Link} to="/courses">
              <Typography>Courses</Typography>
            </ListItem>
            <ListItem button component={Link} to="/learning">
              <Typography>My Learning</Typography>
            </ListItem>
            <ListItem button component={Link} to="/favorites">
              <Typography>Favorites</Typography>
            </ListItem>
          </List>
        </Box>
      </AppBar>

      {/* Search Results Overlay */}
      {showResults && (
        <>
          <div 
            sx={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'var(--overlay-bg)',
              zIndex: 99998
            }}
            onClick={() => setShowResults(false)}
          />
          <Box
            sx={{ 
              position: 'fixed',
              left: 0,
              right: 0,
              top: '64px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              zIndex: 99999,
              p: 2
            }}
          >
          <Paper 
            sx={{
              width: '100%',
              maxWidth: '42rem',
              margin: '0 1rem',
              backgroundColor: 'var(--card-bg)',
              color: 'var(--text-primary)',
              maxHeight: { xs: '60vh', sm: '70vh' },
              overflow: 'auto'
            }}
            elevation={6}
          >
            <Box sx={{ minHeight: '100px' }}>
              {searchResults.length > 0 ? (
                <>
                  <Box sx={{ 
                    position: 'sticky',
                    top: 0,
                    p: 2, 
                    borderBottom: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    zIndex: 1
                  }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ color: 'var(--text-secondary)' }}
                    >
                      Found {searchResults.length} {searchResults.length === 1 ? 'course' : 'courses'}
                    </Typography>
                  </Box>
                  <List sx={{ p: 0, maxHeight: '100%', overflow: 'auto' }}>
                    {searchResults.map((course) => (
                      <ListItem
                        key={course.id}
                        onClick={() => handleSearchItemClick(course.id)}
                        sx={{
                          cursor: 'pointer',
                          p: { xs: 1.5, sm: 2 },
                          borderBottom: '1px solid var(--border-color)',
                          '&:last-child': {
                            borderBottom: 'none'
                          },
                          '&:hover': {
                            backgroundColor: 'var(--hover-bg)'
                          }
                        }}
                      >
                        <Box sx={{ width: '100%' }}>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            mb: { xs: 0.5, sm: 1 },
                            gap: 2
                          }}>
                            <Typography 
                              variant="subtitle1" 
                              sx={{ 
                                fontWeight: 500,
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {course.title}
                            </Typography>
                            <Typography 
                              variant="subtitle1" 
                              sx={{ 
                                fontWeight: 500,
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                whiteSpace: 'nowrap',
                                color: 'var(--accent-primary)',
                                flexShrink: 0
                              }}
                            >
                              ${course.price}
                            </Typography>
                          </Box>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              mb: { xs: 0.5, sm: 1 },
                              color: 'var(--text-secondary)',
                              fontSize: { xs: '0.8rem', sm: '0.875rem' },
                              display: '-webkit-box',
                              WebkitLineClamp: { xs: 1, sm: 2 },
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {course.description}
                          </Typography>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  color: 'var(--text-secondary)',
                                  opacity: 0.8,
                                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                  display: { xs: 'none', sm: 'inline' }
                                }}
                              >
                                {(course.students || 0).toLocaleString()} students
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography 
                                component="span" 
                                sx={{ 
                                  color: '#fbbf24',
                                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                  lineHeight: 1,
                                  display: { xs: 'none', sm: 'inline' }
                                }}
                              >
                                ★
                              </Typography>
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  color: 'var(--text-secondary)',
                                  fontWeight: 500,
                                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                  display: { xs: 'none', sm: 'inline' }
                                }}
                              >
                                {course.rating}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  px: { xs: 0.75, sm: 1 },
                                  py: { xs: 0.25, sm: 0.5 },
                                  borderRadius: '9999px',
                                  fontWeight: 500,
                                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                  backgroundColor: darkMode ? 'rgba(var(--accent-primary-rgb), 0.2)' : 'rgba(var(--accent-primary-rgb), 0.1)',
                                  color: 'var(--accent-primary)',
                                  display: 'inline-block',
                                  maxWidth: { xs: '100px', sm: '150px' },
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {course.category}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </>
              ) : (
                <Box sx={{ p: { xs: 3, sm: 4 }, textAlign: 'center' }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'var(--text-secondary)', 
                      mb: { xs: 0.5, sm: 1 },
                      fontSize: { xs: '0.9rem', sm: '1rem' }
                    }}
                  >
                    No courses found
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'var(--text-secondary)', 
                      opacity: 0.7,
                      fontSize: { xs: '0.75rem', sm: '0.8rem' }
                    }}
                  >
                    Try adjusting your search to find what you're looking for.
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
          </Box>
        </>
      )}
      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '280px',
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            borderRight: '1px solid var(--border-color)'
          }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <img src={logo} alt="Logo" style={{ height: '32px' }} />
          <IconButton 
            onClick={() => setMobileMenuOpen(false)}
            sx={{ ml: 'auto' }}
          >
            <Close />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'var(--border-color)' }} />
        <List sx={{ p: 2 }}>
          <ListItemButton 
            component={Link} 
            to="/courses"
            onClick={() => setMobileMenuOpen(false)}
            sx={{ borderRadius: 1, mb: 1 }}
          >
            <ListItemIcon>
              <SchoolIcon sx={{ color: 'var(--text-primary)' }} />
            </ListItemIcon>
            <ListItemText primary="Courses" />
          </ListItemButton>
          <ListItemButton 
            component={Link} 
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            sx={{ borderRadius: 1, mb: 1 }}
          >
            <ListItemIcon>
              <LoginIcon sx={{ color: 'var(--text-primary)' }} />
            </ListItemIcon>
            <ListItemText primary="Sign In" />
          </ListItemButton>
          <ListItemButton 
            component={Link} 
            to="/signup"
            onClick={() => setMobileMenuOpen(false)}
            sx={{ 
              borderRadius: 1,
              mb: 1,
              backgroundColor: 'var(--accent-primary)',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'var(--accent-secondary)'
              }
            }}
          >
            <ListItemIcon>
              <PersonAddIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Sign Up" />
          </ListItemButton>
          <ListItemButton 
            onClick={() => {
              toggleDarkMode();
              setMobileMenuOpen(false);
            }}
            sx={{ borderRadius: 1 }}
          >
            <ListItemIcon>
              {darkMode ? (
                <LightModeIcon sx={{ color: 'var(--text-primary)' }} />
              ) : (
                <DarkModeIcon sx={{ color: 'var(--text-primary)' }} />
              )}
            </ListItemIcon>
            <ListItemText primary={darkMode ? 'Light Mode' : 'Dark Mode'} />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}
