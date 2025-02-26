import React from 'react';
import Head from 'next/head';
import { Button, Box } from '@mui/material';
import { useCustomTheme } from '../src/contexts/ThemeProvider';

const HomePage = () => {
  const { darkMode, toggleDarkMode } = useCustomTheme();

  return (
    <>
      <Head>
        <title>Data Base</title>
      </Head>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Button variant="contained" onClick={toggleDarkMode}>
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Button>
      </Box>
    </>
  );
};

export default HomePage;
