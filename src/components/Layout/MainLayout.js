import React, { useState } from 'react';
import { Box, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import AppBar from './AppBar';
import Drawer from './Drawer';
import Modal from '../Common/Modal';
import { signOut } from 'next-auth/react';

const drawerWidth = 350;

const MainLayout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const appBarHeight = isMobile ? 56 : 64;

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const handleLogout = () => setLogoutModalOpen(true);
  const handleConfirmLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };
  const handleCloseLogoutModal = () => setLogoutModalOpen(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar onDrawerToggle={handleDrawerToggle} onLogout={handleLogout} />

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', pt: `${appBarHeight}px` }}>
        <Drawer open={drawerOpen} onClose={handleDrawerToggle} marginTop={`${appBarHeight}px`} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: '100%',
            maxWidth: '100vw',
            overflowY: 'auto',
            px: 3,
            pt: 3,
            ml: {
              md: drawerOpen ? `${drawerWidth}px` : 0,
            },
            transition: 'margin 0.3s ease',
          }}
        >
          {children}
        </Box>
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
