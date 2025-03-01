import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import ListItemText from '@mui/material/ListItemText';

/**
 * SearchBoxWrapper
 *
 * Container estilizado que envolve a searchbox.
 * Apresenta:
 * - Layout flexível com alinhamento central.
 * - Transições suaves de largura, sombra e cor de fundo.
 * - Responsividade para diferentes tamanhos de tela.
 *
 * @param {boolean} isExpanded - Define se a searchbox está expandida.
 */
export const SearchBoxWrapper = styled('div')(({ theme, isExpanded }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '20px',
  backgroundColor: theme.palette.background.default,
  border: '1px solid',
  borderColor: theme.palette.divider,
  boxShadow: theme.shadows[2],
  transition: 'width 300ms ease, box-shadow 200ms ease, background-color 200ms linear',
  width: isExpanded ? '20%' : '40px',
  maxWidth: isExpanded ? '360px' : undefined,
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
  [theme.breakpoints.down('sm')]: {
    width: isExpanded ? '20%' : '40px',
    maxWidth: '280px',
  },
}));

/**
 * StyledInputBase
 *
 * Componente de entrada personalizado para a searchbox.
 * Aplica:
 * - Cor de texto consistente com o tema.
 * - Transição suave na largura do input e destaque ao foco.
 */
export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  '& .MuiInputBase-input': {
    transition: theme.transitions.create('width'),
    width: '20%',
    [theme.breakpoints.up('sm')]: {
      width: '35ch',
      '&:focus': {
        width: '35ch',
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
}));

/**
 * SearchResults
 *
 * Container para exibição dos resultados da busca.
 * Características:
 * - Posição absoluta para sobrepor o layout.
 * - Máxima altura com scroll vertical, garantindo a visibilidade dos itens.
 * - Sombreamento e bordas suaves para realce visual.
 */
export const SearchResults = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '115%',
  left: 0,
  right: 0,
  zIndex: 2,
  maxHeight: '300px',
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    boxShadow: '0 6px 10px rgba(0,0,0,0.15)',
  },
}));

/**
 * StyledIconButton
 *
 * Botão de ícone customizado para uso na searchbox.
 * Destaca-se por:
 * - Padding consistente com o espaçamento do tema.
 * - Cores em conformidade com o esquema de cores primário.
 * - Feedback visual ao passar o mouse.
 */
export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

/**
 * CenteredItem
 *
 * Container que centraliza seu conteúdo tanto horizontal quanto verticalmente,
 * utilizando o espaçamento definido pelo tema.
 */
export const CenteredItem = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

/**
 * StyledListItemText
 *
 * Estilização customizada para os textos dos itens de lista.
 * Aplica:
 * - Peso de fonte em negrito para o texto principal.
 * - Cores padronizadas para os textos principal e secundário.
 */
export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
  '& .MuiListItemText-secondary': {
    color: theme.palette.text.secondary,
  },
}));
