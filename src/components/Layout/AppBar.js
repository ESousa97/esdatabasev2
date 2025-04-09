import React from 'react';
import { Toolbar, IconButton, Typography, Box } from '@mui/material';
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
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        
        {/* Esquerda: ícones + título */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.2 } }}>
          <IconButton color="inherit" onClick={onDrawerToggle} size="small">
            <MenuIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleHomeClick} size="small">
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit" onClick={toggleDarkMode} size="small">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton color="inherit" onClick={onLogout} size="small">
            <LogoutIcon sx={{ transform: 'rotate(-180deg)' }} />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ ml: 1, fontSize: { xs: '0.9rem', sm: '1.1rem' } }}>
            Data Base
          </Typography>
        </Box>

        {/* Direita: caixa de busca */}
        <Box sx={{ flexShrink: 0 }}>
          <SearchBox />
        </Box>
      </Toolbar>
    </HeaderContainer>
  );
};

export default AppBar;
