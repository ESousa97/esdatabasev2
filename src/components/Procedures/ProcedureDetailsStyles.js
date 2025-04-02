import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {animatedLink} from '../StyleLink/StyledLink';

const commonButtonStyles = {
  borderRadius: '8px',
  padding: '6px 12px',
  margin: '4px',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.9rem',
};

const createButtonStyles = (bg, hoverBg) => ({
  backgroundColor: bg,
  color: '#fff',
  '&:hover': {
    backgroundColor: hoverBg,
  },
});

// Contêiner principal para centralizar e limitar a largura do conteúdo
export const MainContent = styled('div')(({ theme }) => ({
  maxWidth: '90%',
  margin: '0 auto',
  padding: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  ...commonButtonStyles,
  ...createButtonStyles(theme.palette.primary.main, theme.palette.primary.dark),
}));

export const StyledCopyButton = styled(Button)(({ theme }) => ({
  ...commonButtonStyles,
  ...createButtonStyles(theme.palette.success.main, theme.palette.success.dark),
}));

export const ImageContainer = styled('div')(({ theme }) => ({
  margin: theme.spacing(2, 0),
  textAlign: 'center',
}));

export const ContentContainer = styled('div')(({ theme }) => ({
  margin: theme.spacing(1, 0),
  lineHeight: 1.5,
  color: theme.palette.text.secondary,
}));

export const MarkdownStyles = styled('div')(({ theme }) => ({
  '& h1': {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: theme.spacing(1.5),
    color: theme.palette.text.primary,
    borderBottom: `2px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(0.5),
  },
  '& h2': {
    fontSize: '1.75rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1.25),
    color: theme.palette.text.primary,
  },
  '& h3': {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  '& p': {
    fontSize: '1rem',
    lineHeight: 1.7,
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  '& strong': {
    fontWeight: 700,
  },
  '& em': {
    fontStyle: 'italic',
  },

  // BLOCO DE CÓDIGO - VAMPIRO DARK/LIGHT
  '& pre': {
    backgroundColor: theme.palette.mode === 'dark' ? '#1e1e2e' : '#5b5b5b',
    color: theme.palette.mode === 'dark' ? '#f8f8f2' : '#ffffff',
    borderRadius: '12px',
    padding: theme.spacing(2),
    overflowX: 'auto',
    margin: theme.spacing(2, 0),
    fontSize: '0.95rem',
    fontFamily: 'monospace',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 4px 12px rgba(0,0,0,0.25)'
      : '0 2px 6px rgba(0,0,0,0.05)',
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
      boxShadow: theme.palette.mode === 'dark'
        ? '0 6px 18px rgba(0,0,0,0.4)'
        : '0 4px 12px rgba(0,0,0,0.1)',
    },
    maxWidth: '90%',
    height: 'auto',
    display: 'block',
    margin: theme.spacing(2, 'auto'),
  },
  '& pre code': {
    background: 'none',
    padding: 0,
    color: 'inherit',
    fontFamily: 'inherit',
    // Highlight.js estilos por tema:
    '.hljs-keyword': {
      color: theme.palette.mode === 'dark' ? '#ff79c6' : '#d81b60',
      fontWeight: 500,
    },
    '.hljs-string': {
      color: theme.palette.mode === 'dark' ? '#f1fa8c' : '#bc5100',
    },
    '.hljs-number': {
      color: theme.palette.mode === 'dark' ? '#bd93f9' : '#5e35b1',
    },
    '.hljs-comment': {
      color: theme.palette.mode === 'dark' ? '#6272a4' : '#919191',
      fontStyle: 'italic',
    },
    '.hljs-built_in': {
      color: theme.palette.mode === 'dark' ? '#8be9fd' : '#1976d2',
    },
    '.hljs-title': {
      color: theme.palette.mode === 'dark' ? '#50fa7b' : '#388e3c',
    },
  },

  // CÓDIGO INLINE - ajustado para ambos modos
  '& code': {
    backgroundColor: theme.palette.mode === 'dark' ? '#2d2a45' : '#8a91c1',
    color: theme.palette.mode === 'dark' ? '#ff79c6' : '#2f3eac',
    fontFamily: 'monospace',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '0.85rem',
    fontWeight: 500,
    wordBreak: 'break-word',
  },

  '& .highlight-text': {
  backgroundColor: theme.palette.mode === 'dark' ? '#232323' : '#f1f1f1',
  color: theme.palette.mode === 'dark' ? '#4dd0e1' : '#c62828',
  fontFamily: 'inherit',
  fontStyle: 'italic',
  fontWeight: 'bold',
  padding: '2px 6px',
  borderRadius: '6px',
  fontSize: '0.9rem',
  border: `1px dashed ${theme.palette.divider}`,
  display: 'inline-block',
  },

  // LISTAS
  '& ul, & ol': {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  '& li': {
    marginBottom: theme.spacing(0.75),
    lineHeight: 1.6,
  },

  // TABELAS
  '& table': {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: theme.spacing(2),
    fontSize: '0.95rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  '& th, & td': {
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
    textAlign: 'left',
  },
  '& th': {
    backgroundColor: theme.palette.mode === 'dark' ? '#3a3a3a' : '#f9f9f9',
    fontWeight: 600,
  },

  // IMAGENS
  '& img': {
    maxWidth: '90%',
    height: 'auto',
    display: 'block',
    margin: theme.spacing(2, 'auto'),
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },

  '& a': {
  ...animatedLink(theme),
  },

  // SELEÇÃO DE TEXTO
  '& *::selection': {
    backgroundColor: theme.palette.primary.light,
    color: '#fff',
  },
}));
