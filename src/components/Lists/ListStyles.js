import { styled, keyframes } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const StyledButtonBase = styled(ButtonBase)(({ theme, viewMode }) => ({
  display: 'block',
  textAlign: 'inherit',
  borderRadius: '10px',
  overflow: 'hidden',
  transition: 'transform 0.3s, box-shadow 0.3s',
  width: viewMode === 'compact' ? '200px' : '300px',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0px 10px 20px rgba(0,0,0,0.2)',
  },
}));

export const StyledCard = styled(Card)(({ theme, viewMode }) => ({
  borderRadius: '10px',
  boxShadow: '0px 3px 10px rgba(0,0,0,0.15)',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  animation: `${fadeIn} 0.5s ease-out`,
  '&:hover': {
    boxShadow: '0px 12px 24px rgba(0,0,0,0.2)',
    transform: 'translateY(-3px)',
  },
  padding: viewMode === 'detailed' ? theme.spacing(2) : theme.spacing(1),
}));

export const StyledCardMedia = styled(CardMedia)(({ theme, viewMode }) => ({
  height: viewMode === 'compact' ? 100 : 160,
  width: '100%',
  objectFit: 'cover',
}));

export const StyledCardContent = styled(CardContent)(({ theme, viewMode }) => ({
  padding: theme.spacing(2),
  textAlign: 'left',
  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },
}));
