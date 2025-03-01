import { styled, keyframes } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

/**
 * fadeIn
 *
 * Animação para uma transição suave durante a aparição do componente Card.
 */
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

/**
 * StyledButtonBase
 *
 * Componente personalizado baseado em ButtonBase que incorpora:
 * - Transições suaves para transformações e sombra.
 * - Utilização do borderRadius definido no tema para manter consistência visual.
 */
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

/**
 * StyledCard
 *
 * Componente de cartão personalizado que apresenta:
 * - Fundo consistente com sombra sutil.
 * - Animação fadeIn durante a renderização.
 * - Efeito de elevação e sombra acentuada ao passar o mouse.
 */
export const StyledCard = styled(Card)(({ theme }) => ({
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

/**
 * StyledCardMedia
 *
 * Componente para exibição de mídia no cartão, que define:
 * - Altura otimizada para maximizar o espaço destinado ao conteúdo.
 * - Integração visual com os cantos superiores arredondados.
 */
export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 180,
  width: '100%',
  objectFit: 'cover',
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
}));

/**
 * StyledCardContent
 *
 * Componente que gerencia o conteúdo interno do cartão, aplicando:
 * - Espaçamento adequado e tipografia otimizada.
 * - Estilos consistentes nos elementos filhos para melhor aproveitamento do espaço.
 */
export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'left',
  backgroundColor: theme.palette.background.default,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },
  '& *': {
    fontSize: '0.8rem',
    lineHeight: 1.3,
  },
}));
