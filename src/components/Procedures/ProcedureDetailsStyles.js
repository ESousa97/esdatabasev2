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

export const MainContent = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  margin: '0 auto',
  padding: theme.spacing(2),
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  boxSizing: 'border-box',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '95%',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '85%',
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
    fontSize: '1.8rem',
    fontWeight: 700,
    marginBottom: theme.spacing(1.5),
    color: theme.palette.text.primary,
    borderBottom: `2px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(0.5),
  },
  '& h2': {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1.25),
    color: theme.palette.text.primary,
  },
  '& h3': {
    fontSize: '1.3rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  '& p': {
    fontSize: '0.95rem',
    lineHeight: 1.7,
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
  },
  '& strong': {
    fontWeight: 700,
  },
  '& em': {
    fontStyle: 'italic',
  },
  '& pre': {
    backgroundColor: theme.palette.mode === 'dark' ? '#1e1e2e' : '#5b5b5b',
    color: theme.palette.mode === 'dark' ? '#f8f8f2' : '#ffffff',
    borderRadius: '12px',
    padding: theme.spacing(2),
    overflowX: 'auto',
    margin: theme.spacing(2, 0),
    fontSize: '0.9rem',
    fontFamily: 'monospace',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 4px 12px rgba(0,0,0,0.25)'
      : '0 2px 6px rgba(0,0,0,0.05)',
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  '& pre code': {
    background: 'none',
    padding: 0,
    color: 'inherit',
    fontFamily: 'inherit',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
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
  '& ul, & ol': {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  '& li': {
    marginBottom: theme.spacing(0.75),
    lineHeight: 1.6,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
  },
  '& a': {
    ...animatedLink(theme),
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
  },
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
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
  },
  '& th': {
    backgroundColor: theme.palette.mode === 'dark' ? '#3a3a3a' : '#f9f9f9',
    fontWeight: 600,
  },
  '& img': {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    margin: theme.spacing(2, 'auto'),
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  '& *::selection': {
    backgroundColor: theme.palette.primary.light,
    color: '#fff',
  },
  overflowWrap: 'break-word',
  wordWrap: 'break-word',
  wordBreak: 'break-word',
  hyphens: 'auto',
  [theme.breakpoints.down('sm')]: {
    '& h1': {
      fontSize: '0.95rem',
    },
    '& h2': {
      fontSize: '0.9rem',
    },
    '& h3': {
      fontSize: '0.85rem',
    },
    '& p': {
      fontSize: '0.7rem',
    },
    '& pre': {
      fontSize: '0.65rem',
    },
    '& code': {
      fontSize: '0.65rem',
    },
    '& .highlight-text': {
      fontSize: '0.7rem',
    },
    '& table': {
      fontSize: '0.7rem',
    },
    '& th, & td': {
      fontSize: '0.7rem',
    },
    '& li': {
      fontSize: '0.7rem',
    },
  },  
}));

export const FixedFooter = styled('footer')(({ theme }) => ({
  marginTop: theme.spacing(4),
  paddingBottom: theme.spacing(2),
  textAlign: 'center',
  fontSize: '0.8rem',
  color: theme.palette.text.secondary,
  opacity: 0.6,
  userSelect: 'none',
}));