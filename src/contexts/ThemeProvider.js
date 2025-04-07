import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '../styles/theme';

const ThemeContext = createContext();

export const useCustomTheme = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }) => {
  // Verifica a preferência do sistema para tema escuro
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // Inicializa o estado com a preferência do usuário
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  // Atualiza o estado se a preferência do sistema mudar
  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

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
