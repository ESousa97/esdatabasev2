import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const commonButtonStyles = {
  borderRadius: '10px',
  padding: '8px 16px',
  margin: '4px',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '1rem',
};

const createButtonStyles = (bg, hoverBg) => ({
  backgroundColor: bg,
  color: '#fff',
  '&:hover': {
    backgroundColor: hoverBg,
  },
});

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
  textAlign: 'center', // centraliza a imagem
}));

// Adicione a definição de ContentContainer
export const ContentContainer = styled('div')(({ theme }) => ({
  margin: theme.spacing(1, 0),
  lineHeight: 1.6,
  color: theme.palette.text.secondary,
}));

export const StyledImage = styled('img')(({ theme }) => ({
  width: '300px', // ou maxWidth: '300px'
  height: 'auto',
  display: 'block',
  margin: theme.spacing(2, 'auto'),
}));

export const MarkdownStyles = styled('div')(({ theme }) => ({
  '& h1': {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  '& h2': {
    fontSize: '2rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1.5),
    color: theme.palette.text.primary,
  },
  '& h3': {
    fontSize: '1.75rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1.2),
    color: theme.palette.text.primary,
  },
  '& p': {
    fontSize: '1rem',
    lineHeight: 1.6,
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  '& strong': {
    fontWeight: 700,
  },
  '& em': {
    fontStyle: 'italic',
  },
  '& code': {
    backgroundColor: '#272822',
    color: '#a6e22e',
    padding: '4px 8px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    border: '1px solid #1e1e1e',
    overflowX: 'auto',
  },
  '& pre': {
    backgroundColor: '#272822',
    color: '#a6e22e',
    padding: theme.spacing(1),
    borderRadius: '4px',
    overflowX: 'auto',
    border: '1px solid #1e1e1e',
    marginBottom: theme.spacing(2),
  },
  '& ul, & ol': {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  '& li': {
    marginBottom: theme.spacing(0.5),
  },
  '& table': {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: theme.spacing(2),
  },
  '& th, & td': {
    border: '1px solid #ddd',
    padding: theme.spacing(1),
    textAlign: 'left',
  },
  '& th': {
    backgroundColor: '#f2f2f2',
  },
  '& a': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  '& img': {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    margin: theme.spacing(2, 'auto'),
  },
}));
