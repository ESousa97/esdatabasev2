// src/components/Common/SideMenuStyles.js
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';

export const StyledDrawer = styled(({ marginTop, ...otherProps }) => <Drawer {...otherProps} />)(({ theme, marginTop }) => ({
  '& .MuiDrawer-paper': {
    position: 'fixed',
    marginTop: marginTop || '65px',
    height: `calc(100% - ${marginTop || '65px'})`,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[4],
    zIndex: theme.zIndex.drawer + 2,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '6px',
      borderRadius: '6px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.grey[300],
      borderRadius: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[500],
      borderRadius: '6px',
    },
  },
}));

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  '&:hover': { backgroundColor: theme.palette.action.hover },
  '& .MuiListItemIcon-root': {
    minWidth: '32px',
  },
  '& .MuiListItemText-primary': {
    fontWeight: 'bold',
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
  },
}));

export const CustomListItemIcon = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 'small',
  marginLeft: '12px',
}));
