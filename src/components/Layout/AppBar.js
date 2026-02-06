// AppBar.js
import React from 'react';
import PropTypes from 'prop-types';
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
    <HeaderContainer
      position="fixed"
      elevation={0}
      sx={{
        backdropFilter: 'blur(6px)',
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 1, sm: 2 },
          minHeight: { xs: 48, sm: 61.5 },
        }}
      >
        {/* Esquerda: ícones + título */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 0.5, sm: 1.2 },
            overflow: 'hidden',
            flexShrink: 1,
            minWidth: 0, // permite overflow controlado
          }}
        >
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

          <Typography
            variant="h6"
            noWrap
            className="header-title"
            sx={{
              ml: 1,
              fontWeight: 600,
              letterSpacing: '0.5px',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Proj Portfólio
          </Typography>
        </Box>

        {/* Direita: caixa de busca fixa */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            minWidth: 150,
            maxWidth: 240,
            flexShrink: 0,
            mr: { xs: 0.5, sm: 1 }, // 👈 afasta da lateral direita
          }}
        >
          <SearchBox />
        </Box>
      </Toolbar>
    </HeaderContainer>
  );
};

AppBar.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default AppBar;
