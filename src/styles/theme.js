// src/styles/theme.js
const lightTheme = {
  palette: {
    primary: {
      main: '#283593',
    },
    secondary: {
      main: '#f44336',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
};

const darkTheme = {
  palette: {
    primary: {
      main: '#283593',
    },
    secondary: {
      main: '#f44336',
    },
    background: {
      default: '#121212', // fundo escuro
      paper: '#1d1d1d',   // fundo de cards, dialogs etc.
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
};

export { lightTheme, darkTheme };
