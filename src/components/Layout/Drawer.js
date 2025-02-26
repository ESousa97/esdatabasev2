// src/components/Layout/Drawer.js
import React from 'react';
import { List, ListItemText } from '@mui/material';
import { StyledDrawer, StyledListItemButton, CustomListItemIcon } from '../Common/SideMenuStyles';
import { useRouter } from 'next/router';

const Drawer = ({ open, onClose }) => {
  const router = useRouter();
  const menuItems = [
    { text: 'Home', icon: '🏠', route: '/' },
    { text: 'Projetos', icon: '📁', route: '/projects' },
    // Acrescente outros itens conforme necessário
  ];

  return (
    <StyledDrawer open={open} onClose={onClose}>
      <List>
        {menuItems.map((item, index) => (
          <StyledListItemButton key={index} onClick={() => { router.push(item.route); onClose(); }}>
            <CustomListItemIcon>{item.icon}</CustomListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItemButton>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Drawer;
