import { styled, keyframes } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  display: 'block',
  textAlign: 'inherit',
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'visible',
  width: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-12px)',
  },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 260,
  height: 260,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  animation: `${fadeIn} 0.5s ease-out`,
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',

  '&:hover': {
    transform: 'translateY(10px) scale(1.05)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
  },

  [theme.breakpoints.down('md')]: {
    maxWidth: 220,
    height: 220,
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: 170,
    height: 170,
  },
  '@media (max-width: 400px)': {
    maxWidth: 150,
    height: 150,
  },
  '@media (max-width: 330px)': {
    maxWidth: 135,
    height: 135,
  },
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  flex: '1 1 50%',
  minHeight: '50%',
  width: '100%',
  objectFit: 'cover',
  borderTopLeftRadius: theme.shape.borderRadius * 2,
  borderTopRightRadius: theme.shape.borderRadius * 2,
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flex: '1 1 50%',
  minHeight: '50%',
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'left',

  '&:last-child': {
    paddingBottom: theme.spacing(1.5),
  },

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  fontWeight: 700,
  marginBottom: theme.spacing(0.5),
  color: theme.palette.text.primary,
  lineHeight: 1.3,

  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
  '@media (max-width: 400px)': {
    fontSize: '0.8rem',
  },
}));

export const CardDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.925rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.4,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',

  [theme.breakpoints.down('md')]: {
    fontSize: '0.85rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
  '@media (max-width: 400px)': {
    fontSize: '0.7rem',
  },
}));
