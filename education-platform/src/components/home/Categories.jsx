import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
} from '@mui/material';
import { 
  Code as CodeIcon, 
  Brush as BrushIcon,
  Business as BusinessIcon,
  Psychology as PsychologyIcon,
  Language as LanguageIcon,
  FitnessCenter as FitnessCenterIcon,
  MusicNote as MusicNoteIcon,
  Camera as CameraIcon
} from '@mui/icons-material';

export const categories = [
  {
    id: 'programming',
    title: 'Programming',
    description: 'Learn to code with popular programming languages',
    icon: <CodeIcon fontSize="large" />,
    color: '#3f51b5',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1031&q=80'
  },
  {
    id: 'design',
    title: 'Design',
    description: 'Master graphic, UI/UX, and web design skills',
    icon: <BrushIcon fontSize="large" />,
    color: '#e91e63',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80'
  },
  {
    id: 'business',
    title: 'Business',
    description: 'Develop entrepreneurship and management skills',
    icon: <BusinessIcon fontSize="large" />,
    color: '#ff9800',
    image: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    id: 'personal-development',
    title: 'Personal Development',
    description: 'Improve productivity and personal skills',
    icon: <PsychologyIcon fontSize="large" />,
    color: '#4caf50',
    image: 'https://images.unsplash.com/photo-1571425046056-2d768d0621f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    id: 'languages',
    title: 'Languages',
    description: 'Learn new languages and communication skills',
    icon: <LanguageIcon fontSize="large" />,
    color: '#2196f3',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80'
  },
  {
    id: 'health-fitness',
    title: 'Health & Fitness',
    description: 'Improve your health and fitness knowledge',
    icon: <FitnessCenterIcon fontSize="large" />,
    color: '#f44336',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    id: 'music',
    title: 'Music',
    description: 'Learn to play instruments and music theory',
    icon: <MusicNoteIcon fontSize="large" />,
    color: '#9c27b0',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    id: 'photography',
    title: 'Photography',
    description: 'Master photography and photo editing',
    icon: <CameraIcon fontSize="large" />,
    color: '#607d8b',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  }
];

export default function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography 
        variant="h4" 
        component="h2" 
        sx={{ 
          mb: 4, 
          fontWeight: 700,
          textAlign: 'center' 
        }}
      >
        Browse Categories
      </Typography>
      
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={3} key={category.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)'
                }
              }}
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardMedia
                component="img"
                height="140"
                image={category.image}
                alt={category.title}
                sx={{ objectFit: 'cover' }}
              />
              <Box 
                sx={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 2,
                  color: 'white',
                  bgcolor: category.color,
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
    </Container>
  );
}
