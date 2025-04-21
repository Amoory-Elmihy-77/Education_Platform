import React from 'react';
import { Fab } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';

function ThemeButton() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <Fab
      size="medium"
      aria-label="toggle theme"
      onClick={toggleDarkMode}
      sx={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        borderRadius: '50%',
        minWidth: '56px',
        width: '56px',
        height: '56px',
        padding: '0',
        zIndex: 1000,
        boxShadow: theme => theme.palette.mode === 'dark'
          ? '0 4px 8px rgba(0, 0, 0, 0.3)'
          : '0 4px 8px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          boxShadow: theme => theme.palette.mode === 'dark'
            ? '0 6px 12px rgba(0, 0, 0, 0.4)'
            : '0 6px 12px rgba(0, 0, 0, 0.2)',
          transform: 'translateY(-2px)'
        },
        transition: 'all 0.3s ease-in-out'
      }}
    >
      {darkMode ? <Brightness7 /> : <Brightness4 />}
    </Fab>
  );
}

export default ThemeButton;
