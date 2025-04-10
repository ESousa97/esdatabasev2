import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

const APPBAR_HEIGHT = {
  desktop: 64,
  mobile: 56,
};

export const PageWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  paddingTop: APPBAR_HEIGHT.desktop,
  paddingBottom: theme.spacing(4),
  paddingInline: theme.spacing(1),

  // 🔥 Corrige o espaço no mobile!
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(7), // era APPBAR_HEIGHT.mobile (56px), reduzido para ~56px → ~48px
    paddingBottom: theme.spacing(3),
  },
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(0), // ← IMPORTANTE: zera o espaço extra
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1.5),
  justifyContent: 'center',

  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(-9), // ← IMPORTANTE também aqui
    gap: theme.spacing(1),
    paddingInline: theme.spacing(0.5),
  },

  '@media (max-width: 400px)': {
    gap: theme.spacing(0.8),
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.75), // 🔽 padding reduzido
  minWidth: 36,
  minHeight: 36,
  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'scale(1.05)',
  },

  '& svg': {
    fontSize: '1.15rem', // 🔽 menor tamanho dos ícones
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
    '@media (max-width: 400px)': {
      fontSize: '0.9rem',
    },
  },
}));
