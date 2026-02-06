import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';

// Linha da lista com sombra e efeito flutuante
export const StyledListItem = styled(ListItem)(({ theme }) => ({
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  borderRadius: theme.shape.borderRadius * 1.5,
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2], // Sombra leve padrão

  '&:hover': {
    transform: 'translateY(-4px) scale(1.015)', // 🔥 flutua para cima
    boxShadow: theme.shadows[6], // sombra mais intensa
    backgroundColor: theme.palette.background.paper,
  },
}));

// Estilo do texto (título + descrição)
export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    fontWeight: 600,
    fontSize: '1rem',
    color: theme.palette.text.primary,
  },
  '& .MuiListItemText-secondary': {
    fontSize: '0.85rem',
    color: theme.palette.text.secondary,
    lineHeight: 1.5,
    marginTop: theme.spacing(0.5),
  },
}));

// Container da lista com largura responsiva e leve arredondamento
export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100vw',
  maxWidth: 800,
  padding: theme.spacing(2),
  margin: `${theme.spacing(2)} auto`,
  backgroundColor: 'transparent',
  boxShadow: 'none',
  borderRadius: theme.shape.borderRadius * 1,
}));

// Avatar com leve sombra
export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));
