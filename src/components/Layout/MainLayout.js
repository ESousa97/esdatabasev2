// src/components/Layout/MainLayout.js
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import AppBar from './AppBar';
import Drawer from './Drawer';
import Modal from '../Common/Modal';
import { signOut } from 'next-auth/react';

const drawerWidth = 320;

const MainLayout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const handleLogout = () => setLogoutModalOpen(true);
  const handleConfirmLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };
  const handleCloseLogoutModal = () => setLogoutModalOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar onDrawerToggle={handleDrawerToggle} onLogout={handleLogout} />
      <Drawer open={drawerOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { md: drawerOpen ? `${drawerWidth}px` : 0 },
          mt: 8,
        }}
      >
        {children}
      </Box>
      <Modal
        open={logoutModalOpen}
        onClose={handleCloseLogoutModal}
        title="Logout"
        content="Deseja realmente sair?"
        actions={
          <>
            <Button onClick={handleCloseLogoutModal} color="primary">Cancelar</Button>
            <Button onClick={handleConfirmLogout} color="primary">Sair</Button>
          </>
        }
      />
    </Box>
  );
};

export default MainLayout;
