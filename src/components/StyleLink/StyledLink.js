// links.js
import { styled } from '@mui/material/styles';

export const StyledLink = styled('a')(({ theme }) => ({
  position: 'relative',
  color:
    theme.palette.mode === 'light'
      ? theme.palette.primary.main
      : theme.palette.primary.light,
  textDecoration: 'none',
  fontWeight: 600,
  transition: 'color 0.3s ease-in-out',

  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: -2,
    height: 2,
    width: 0,
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.primary.main
        : theme.palette.primary.light,
    transition: 'width 0.3s ease-in-out',
  },

  '&:hover': {
    color:
      theme.palette.mode === 'light'
        ? theme.palette.primary.light // Usa uma cor mais clara no hover para o modo light
        : theme.palette.primary.main,
    '&::after': {
      width: '100%',
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.primary.light // Altera para uma cor mais clara
          : theme.palette.primary.main,
    },
  },

  '&:focus': {
    outline: '2px dashed',
    outlineColor: theme.palette.primary.main,
    outlineOffset: '4px',
  },
}));

export const animatedLink = (theme) => ({
  position: 'relative',
  color:
    theme.palette.mode === 'light'
      ? theme.palette.primary.main
      : theme.palette.primary.light,
  textDecoration: 'none',
  fontWeight: 600,
  transition: 'color 0.3s ease-in-out',

  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: -2,
    height: 2,
    width: 0,
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.primary.main
        : theme.palette.primary.light,
    transition: 'width 0.3s ease-in-out',
  },

  '&:hover': {
    color:
      theme.palette.mode === 'light'
        ? theme.palette.primary.light
        : theme.palette.primary.main,
    '&::after': {
      width: '100%',
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.primary.light
          : theme.palette.primary.main,
    },
  },

  '&:focus': {
    outline: '2px dashed',
    outlineColor: theme.palette.primary.main,
    outlineOffset: '4px',
  },
});
