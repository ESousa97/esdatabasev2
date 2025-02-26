// src/contexts/ThemeProvider.js
import React, { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '../styles/theme';

const ThemeContext = createContext();

export const useCustomTheme = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const theme = useMemo(() => {
    const themeOptions = darkMode ? darkTheme : lightTheme;
    return createTheme({
      ...themeOptions,
      palette: {
        ...themeOptions.palette,
        mode: darkMode ? 'dark' : 'light',
      },
    });
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
