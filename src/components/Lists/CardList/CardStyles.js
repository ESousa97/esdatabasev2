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

// Estilo para botão-base interativo do card
export const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  display: 'block',
  textAlign: 'inherit',
  borderRadius: theme.shape.borderRadius,
  // Remova ou altere overflow para evitar cortar a sombra:
  overflow: 'visible',
  width: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-12px)',
    // Se preferir, remova a sombra do ButtonBase para não conflitar com a do Card
    // boxShadow: 'none',
  },
}));

// Container principal do card
export const StyledCard = styled(Card)(({ theme }) => ({
  width: 260,
  minHeight: 160,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  animation: `${fadeIn} 0.5s ease-out`,
  position: 'relative',
  overflow: 'hidden',
  // Sombra uniforme ao redor do card
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.75)',

  '&:hover': {
    // Aplica um translate para cima e um scale para dar o efeito de zoom
    transform: 'translateY(10px) scale(1.05)',
    // Sombra ajustada para realçar o efeito
    boxShadow: '0 0 30px rgba(0, 0, 0, 0.85)',
  },
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 180,
  objectFit: 'cover',
  borderTopLeftRadius: theme.spacing(2),
  borderTopRightRadius: theme.spacing(2),
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  flexGrow: 1,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&:last-child': {
    paddingBottom: theme.spacing(3),
  },
}));

// Título do card
export const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  color: theme.palette.text.primary,
}));

// Descrição do card (limita em 3 linhas)
export const CardDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.925rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.5,
  height: '2rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
}));
