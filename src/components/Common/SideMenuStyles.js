import React from 'react';
import PropTypes from 'prop-types';
import { styled, keyframes } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';

// Constantes para padronização
const DRAWER_WIDTH = '350px';
const DRAWER_WIDTH_MOBILE = '100vw';
const SCROLLBAR_WIDTH = '6px';
const DEFAULT_MARGIN_TOP = '65px';

/**
 * fadeIn Animation: Animação suave de entrada para o Drawer.
 */
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

/**
 * StyledDrawer:
 * - Responsivo para ocupar 100% da largura em mobile.
 * - Scrollbar customizado e animação.
 */
export const StyledDrawer = styled(({ marginTop, ...props }) => <Drawer {...props} />)(
  ({ theme, marginTop }) => ({
    '& .MuiDrawer-paper': {
      position: 'fixed',
      width: DRAWER_WIDTH,
      marginTop: marginTop || DEFAULT_MARGIN_TOP,
      height: `calc(100% - ${marginTop || DEFAULT_MARGIN_TOP})`,
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.shadows[4],
      zIndex: theme.zIndex.drawer + 2,
      overflowY: 'auto',
      animation: `${fadeIn} 0.3s ease-out`,
      borderRight: `1px solid ${theme.palette.divider}`,

      '&::-webkit-scrollbar': {
        width: SCROLLBAR_WIDTH,
        borderRadius: SCROLLBAR_WIDTH,
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.grey[300],
        borderRadius: SCROLLBAR_WIDTH,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.grey[500],
        borderRadius: SCROLLBAR_WIDTH,
      },

      [theme.breakpoints.down('sm')]: {
        width: DRAWER_WIDTH_MOBILE,
        marginTop: '56px',
        height: `calc(100% - 56px)`,
        fontSize: '0.75rem',
      },
    },
  })
);

StyledDrawer.propTypes = {
  marginTop: PropTypes.string,
};

StyledDrawer.defaultProps = {
  marginTop: DEFAULT_MARGIN_TOP,
};

/**
 * StyledListItemButton:
 * - Padding e fonte ajustáveis para mobile.
 */
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

/**
 * CustomListItemIcon:
 * - Ícone/indicador responsivo para mobile.
 */
export const CustomListItemIcon = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '0.85rem',
  marginLeft: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.7rem',
    marginLeft: theme.spacing(1),
  },
}));
