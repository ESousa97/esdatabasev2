// src/components/Layout/AppBar.js
import React from 'react';
import { Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useRouter } from 'next/router';
import SearchBox from '../Common/SearchBox/SearchBox';
import { useCustomTheme } from '../../contexts/ThemeProvider';
import { HeaderContainer } from '../../styles/layout/_layoutStyles';

const AppBar = ({ onDrawerToggle, onLogout }) => {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useCustomTheme();

  const handleHomeClick = () => router.push('/components');

  return (
    <HeaderContainer position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton color="inherit" onClick={onDrawerToggle} size="large">
          <MenuIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleHomeClick} size="large">
          <HomeIcon />
        </IconButton>
        <IconButton color="inherit" onClick={toggleDarkMode} size="large">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <IconButton color="inherit" onClick={onLogout} size="large">
          <LogoutIcon sx={{ transform: 'rotate(-180deg)' }} />
        </IconButton>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1, ml: 2 }}>
          Data Base
        </Typography>
        <SearchBox />
      </Toolbar>
    </HeaderContainer>
  );
};

export default AppBar;
