import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { HomeOutlined } from '@mui/icons-material';

export default function HomeButton() {
  return (
    <Button
      variant="contained"
      color="primary"
      component={Link}
      to="/"
      sx={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        borderRadius: '50%',
        minWidth: '56px',
        width: '56px',
        height: '56px',
        padding: '0',
        zIndex: 1000,
        boxShadow: '0 4px 8px var(--shadow-color)',
        '&:hover': {
          boxShadow: '0 6px 12px var(--shadow-color)'
        }
      }}
      aria-label="Return to home"
    >
      <HomeOutlined />
    </Button>
  );
}
