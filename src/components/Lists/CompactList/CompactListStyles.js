// CompactListStyles.js
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import ListItemText from '@mui/material/ListItemText';

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateX(4px)',
    boxShadow: theme.shadows[3],
  },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '95vw', // 👈 agora usa 90% da viewport
  maxWidth: 700, // 👈 limite para telas grandes
  margin: `${theme.spacing(2)} auto`,
  overflow: 'hidden',
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
}));

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    fontWeight: 600,
    fontSize: '1rem', // padrão
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
    '@media (max-width: 400px)': {
      fontSize: '0.8rem',
    },
  },
  '& .MuiListItemText-secondary': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
    },
    '@media (max-width: 400px)': {
      fontSize: '0.7rem',
    },
  },
}));
