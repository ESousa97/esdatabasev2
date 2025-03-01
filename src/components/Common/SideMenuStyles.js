// src/components/Common/SideMenuStyles.js
import React from 'react';
import PropTypes from 'prop-types';
import { styled, keyframes } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';

// Constantes para padronização
const DRAWER_WIDTH = '350px';
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
 * - Drawer com largura fixa e altura dinâmica (baseada em marginTop).
 * - Aplica animação de fade-in e personaliza o scrollbar.
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
      // Estilização personalizada para o scrollbar
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
 * - Botão para itens de lista com transição suave no hover.
 * - Define espaçamentos e destaca o texto em foco.
 */
export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  transition: 'background-color 0.2s ease',
  padding: theme.spacing(1.5, 2),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiListItemIcon-root': {
    minWidth: '40px',
  },
  '& .MuiListItemText-primary': {
    fontWeight: 600,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
}));

/**
 * CustomListItemIcon:
 * - Ícone ou texto complementar com cor e espaçamento consistentes.
 */
export const CustomListItemIcon = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 'small',
  marginLeft: theme.spacing(1.5),
}));
