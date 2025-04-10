// SideMenuStyles.js
import { styled, keyframes } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';

const DRAWER_WIDTH = '350px';
const DRAWER_WIDTH_MOBILE = '100vw';
const SCROLLBAR_WIDTH = '6px';
const DEFAULT_MARGIN_TOP = '64px';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// 🔥 Corrigido: posiciona o DRAWER a partir do topo do AppBar
export const StyledDrawer = styled(({ marginTop, ...props }) => <Drawer {...props} />)(
  ({ theme, marginTop }) => {
    const topValue = marginTop || DEFAULT_MARGIN_TOP;
    return {
      '& .MuiDrawer-paper': {
        position: 'fixed',
        top: topValue,
        height: `calc(100% - ${topValue})`,
        width: DRAWER_WIDTH,
        backgroundColor: theme.palette.background.default,
        boxShadow: theme.shadows[4],
        overflowY: 'auto',
        animation: `${fadeIn} 0.3s ease-out`,
        borderRight: `1px solid ${theme.palette.divider}`,

        '&::-webkit-scrollbar': {
          width: SCROLLBAR_WIDTH,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.grey[300],
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.grey[500],
        },

        [theme.breakpoints.down('sm')]: {
          width: DRAWER_WIDTH_MOBILE,
        },
      },
    };
  }
);

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  transition: 'background-color 0.2s ease',
  padding: theme.spacing(1.5, 2),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiListItemIcon-root': {
    minWidth: '40px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '32px',
    },
  },
  '& .MuiListItemText-primary': {
    fontWeight: 600,
    fontSize: '0.95rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
    },
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
}));

export const CustomListItemIcon = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '0.85rem',
  marginLeft: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',    // ✅ centraliza verticalmente
  justifyContent: 'center',
  height: '100%',          // ocupa toda a altura do container
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.7rem',
    marginLeft: theme.spacing(1),
  },
}));
