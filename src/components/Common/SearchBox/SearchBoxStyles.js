import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import ListItemText from '@mui/material/ListItemText';

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

// Componentes adicionais que estavam faltando

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

export const CenteredItem = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
  '& .MuiListItemText-secondary': {
    color: theme.palette.text.secondary,
  },
}));
