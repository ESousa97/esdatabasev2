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
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  width: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.25)',
  },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 360, // Ajuste para ficar menor
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  animation: `${fadeIn} 0.5s ease-out`,
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    boxShadow: '0px 16px 40px rgb(0, 17, 145)',
    transform: 'translateY(-4px)',
  },
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 250,
  width: '100%',
  objectFit: 'cover',
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'left',
  backgroundColor: theme.palette.background.default,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(0.5),
}));

export const CardDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.3,
}));
