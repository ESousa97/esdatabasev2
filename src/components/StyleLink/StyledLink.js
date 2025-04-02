// StyledLink.js
import { styled } from '@mui/material/styles';

const StyledLink = styled('a')(({ theme }) => ({
  position: 'relative',
  color: theme.palette.primary.main,
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
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.3s ease-in-out',
  },

  '&:hover': {
    color: theme.palette.primary.dark,
    '&::after': {
      width: '100%',
      backgroundColor: theme.palette.primary.dark,
    },
  },

  '&:focus': {
    outline: '2px dashed',
    outlineColor: theme.palette.primary.main,
    outlineOffset: '4px',
  },
}));

export default StyledLink;

// linkStyles.js
export const animatedLink = (theme) => ({
    position: 'relative',
    color: theme.palette.primary.main,
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
      backgroundColor: theme.palette.primary.main,
      transition: 'width 0.3s ease-in-out',
    },
    '&:hover': {
      color: theme.palette.primary.dark,
      '&::after': {
        width: '100%',
        backgroundColor: theme.palette.primary.dark,
      },
    },
    '&:focus': {
      outline: '2px dashed',
      outlineColor: theme.palette.primary.main,
      outlineOffset: '4px',
    },
  });
  