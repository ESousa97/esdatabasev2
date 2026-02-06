import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

// LOADER RESPONSIVO
export const StyledLoader = styled(CircularProgress)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontSize: '1rem', // backup para browsers que usam fontSize ao invés de size
  width: 19,
  height: 19,

  [theme.breakpoints.down('sm')]: {
    width: 16,
    height: 16,
  },
  '@media (max-width: 400px)': {
    width: 12,
    height: 12,
  },
}));

// ITEM DE LISTA DE RESULTADO
export const StyledOption = styled('li')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.3), // reduz o espaço entre título e descrição
  padding: theme.spacing(0.8),
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },

  // Telas menores (menos padding)
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5),
    gap: theme.spacing(0.2),
  },

  // Telas muito pequenas (mínimo absoluto)
  '@media (max-width: 400px)': {
    padding: theme.spacing(0.2),
    gap: theme.spacing(0.1),
  },
}));

export const LoadingMessage = styled('span')(({ theme }) => ({
  display: 'inline-block',
  textAlign: 'center',
  fontSize: '0.75rem',
  padding: theme.spacing(0.6, 1.2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800],
  color: theme.palette.mode === 'light' ? '#111827' : '#f9fafb',
  border: `1px solid ${theme.palette.divider}`,
  margin: theme.spacing(1),
  width: '100%',
  boxSizing: 'border-box',

  [theme.breakpoints.down('sm')]: {
    fontSize: '0.65rem',
    padding: theme.spacing(0.4, 1),
    margin: theme.spacing(0.8),
  },

  '@media (max-width: 400px)': {
    fontSize: '0.6rem',
    padding: theme.spacing(0.3, 0.8),
    margin: theme.spacing(0.6),
  },
}));

// AUTOCOMPLETE RESPONSIVO
export const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: 'clamp(140px, 30vw, 260px)', // 👈 se adapta à tela
  flexShrink: 0,

  '& .MuiInputBase-root': {
    height: 38,
    [theme.breakpoints.down('sm')]: {
      height: 34,
    },
    '@media (max-width: 400px)': {
      height: 30,
    },
    '& input': {
      padding: '8px 12px',
      fontSize: '0.9rem',
      [theme.breakpoints.down('sm')]: {
        padding: '6px 10px',
        fontSize: '0.75rem',
      },
      '@media (max-width: 400px)': {
        padding: '4px 8px',
        fontSize: '0.65rem',
      },
    },
  },

  '& .MuiAutocomplete-listbox': {
    padding: 0,
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },

  '& .MuiAutocomplete-option': {
    padding: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.8),
    },
    '@media (max-width: 400px)': {
      padding: theme.spacing(0.3),
    },
  },
}));

// TEXTFIELD (INPUT DE BUSCA)
export const StyledTextField = styled(TextField)(({ theme }) => {
  const isLight = theme.palette.mode === 'light';

  return {
    width: '100%',

    '& .MuiInputLabel-root': {
      color: isLight ? '#111827' : '#f9fafb',
      '&.Mui-focused': {
        color: isLight ? '#111827' : '#f9fafb',
      },
      fontSize: '0.9rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.75rem',
      },
      '@media (max-width: 400px)': {
        fontSize: '0.6rem',
      },
    },

    '& .MuiOutlinedInput-root': {
      color: isLight ? '#111827' : '#f9fafb',
      height: 38, // altura padrão (desktop)

      '& input': {
        padding: '8px 12px',
        fontSize: '0.9rem',
        [theme.breakpoints.down('sm')]: {
          padding: '6px 10px',
          fontSize: '0.75rem',
        },
        '@media (max-width: 400px)': {
          padding: '4px 8px',
          fontSize: '0.65rem',
        },
      },

      [theme.breakpoints.down('sm')]: {
        height: 34, // altura menor em telas pequenas
      },
      '@media (max-width: 400px)': {
        height: 30, // ainda mais fina
      },

      '& fieldset': {
        borderColor: isLight ? '#111827' : '#f9fafb',
      },
      '&:hover fieldset': {
        borderColor: isLight ? '#111827' : '#f9fafb',
      },
      '&.Mui-focused fieldset': {
        borderColor: isLight ? '#111827' : '#f9fafb',
      },
    },
  };
});

// TÍTULO DA OPÇÃO
export const OptionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#111827' : '#f9fafb',
  fontSize: '0.8rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.7rem',
  },
  '@media (max-width: 400px)': {
    fontSize: '0.6rem',
  },
}));

// DESCRIÇÃO DA OPÇÃO
export const OptionDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#111827' : '#f9fafb',
  fontSize: '0.7rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.6rem',
  },
  '@media (max-width: 400px)': {
    fontSize: '0.5rem',
  },
}));
