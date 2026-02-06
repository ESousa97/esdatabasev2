import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import nookies from 'nookies';
import {
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Tooltip,
  Snackbar,
  Alert,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

// Ícones do Material-UI
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

// Componentes customizados
import AppBar from '../src/components/Layout/AppBar';
import ListView from '../src/components/Lists/ListView/ListView';
import { useCustomTheme } from '../src/contexts/ThemeProvider';
import {
  PageWrapper,
  StyledToolbar,
  StyledIconButton,
} from '../src/components/pages/ComponentsPageStyled';
import useMediaQuery from '@mui/material/useMediaQuery';

// Ícones do pacote lucide-react
import { CalendarPlus, Clock, ArrowUpAZ, ArrowDownAZ } from 'lucide-react';

// Timeout de sessão em 4 horas
const SESSION_TIMEOUT = 4 * 60 * 60 * 1000;

const ComponentsPage = ({
  initialViewMode,
  initialSortCriteria = 'date',
  initialSortDirection = 'asc',
}) => {
  // Estados
  const [viewMode, setViewMode] = useState('cards'); // Modo de visualização: cards, detailed ou compact
  const [sortCriteria, setSortCriteria] = useState(initialSortCriteria);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isAuto, setIsAuto] = useState(initialViewMode === null);
  const [showResetMessage, setShowResetMessage] = useState(false);

  // Hooks e utilitários
  const router = useRouter();
  const { toggleDarkMode } = useCustomTheme();
  const theme = useTheme();
  const _isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Define o modo de visualização inicial com base na largura da tela ou cookie
  useEffect(() => {
    const width = window.innerWidth;
    let newMode = 'cards';

    if (width <= 400) {
      newMode = 'compact';
    } else if (width <= 600) {
      newMode = 'detailed';
    }

    if (initialViewMode) {
      setViewMode(initialViewMode); // Utiliza o cookie salvo
    } else {
      setViewMode(newMode); // Define automaticamente com base na tela
      Cookies.set('viewMode', newMode, { expires: 30 });
    }
  }, [initialViewMode]);

  // Atualiza o modo de visualização dinamicamente se estiver no modo automático
  useEffect(() => {
    const updateViewMode = () => {
      if (!isAuto) return;

      const width = window.innerWidth;
      let newMode = 'cards';

      if (width <= 400) newMode = 'compact';
      else if (width <= 600) newMode = 'detailed';

      setViewMode(newMode);
      Cookies.set('viewMode', newMode, { expires: 30 });
    };

    window.addEventListener('resize', updateViewMode);
    return () => window.removeEventListener('resize', updateViewMode);
  }, [isAuto]);

  // Controla o timeout de sessão e logout automático após inatividade
  useEffect(() => {
    let timeoutId;
    const resetSessionTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        console.info('Usuário inativo. Encerrando sessão...');
        signOut({ redirect: false });
        setSessionExpired(true);
      }, SESSION_TIMEOUT);
    };

    window.addEventListener('mousemove', resetSessionTimeout);
    window.addEventListener('keypress', resetSessionTimeout);
    window.addEventListener('scroll', resetSessionTimeout);
    resetSessionTimeout();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetSessionTimeout);
      window.removeEventListener('keypress', resetSessionTimeout);
      window.removeEventListener('scroll', resetSessionTimeout);
    };
  }, [router]);

  // Redireciona para a página de login após expiração da sessão
  const redirectToLogin = () => {
    setSessionExpired(false);
    router.push('/login');
  };

  // Abre e fecha o menu
  const handleMenuOpen = (event) => setMenuAnchorEl(event.currentTarget);
  const handleMenuClose = () => setMenuAnchorEl(null);

  // Altera o critério de ordenação e salva nos cookies
  const handleSortCriteriaChange = (criteria) => {
    setSortCriteria(criteria);
    Cookies.set('sortCriteria', criteria, { expires: 30 });
    handleMenuClose();
  };

  // Alterna a direção de ordenação (asc/desc)
  const toggleSortDirection = () => {
    setSortDirection((prev) => {
      const newDir = prev === 'asc' ? 'desc' : 'asc';
      Cookies.set('sortDirection', newDir, { expires: 30 });
      return newDir;
    });
    handleMenuClose();
  };

  // Altera o modo de visualização e salva nos cookies
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setIsAuto(false);
    Cookies.set('viewMode', mode, { expires: 30 });
  };

  // Restaura o modo de visualização automático com base na largura da tela
  const handleResetAutoView = () => {
    Cookies.remove('viewMode');
    const width = window.innerWidth;
    let newMode = 'cards';

    if (width <= 400) {
      newMode = 'compact';
    } else if (width <= 600) {
      newMode = 'detailed';
    }

    setIsAuto(true);
    setViewMode(newMode);
    Cookies.set('viewMode', newMode, { expires: 30 });
    setShowResetMessage(true);
  };

  return (
    <PageWrapper>
      {/* Barra de navegação */}
      <AppBar onToggleDarkMode={toggleDarkMode} />

      <Box sx={{ mt: 1.5 }}>
        <StyledToolbar>
          {/* Botões de mudança de visualização */}
          <Tooltip title="Cards">
            <StyledIconButton onClick={() => handleViewModeChange('cards')}>
              <ViewModuleIcon />
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="Lista detalhada">
            <StyledIconButton onClick={() => handleViewModeChange('detailed')}>
              <ViewListIcon />
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="Lista compacta">
            <StyledIconButton onClick={() => handleViewModeChange('compact')}>
              <ViewCompactIcon />
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="Redefinir para automático">
            <StyledIconButton onClick={handleResetAutoView}>
              <RestartAltIcon />
            </StyledIconButton>
          </Tooltip>
          {/* Botão de abrir menu */}
          <StyledIconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </StyledIconButton>

          {/* Menu para definição dos critérios e direção de ordenação */}
          <Menu
            id="filter-menu"
            Tooltip="Filtros de pesquisa"
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                mt: 1,
                px: 1,
                py: 0.5,
                width: 170,
                borderRadius: 2,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                transform: 'scale(0.98)',
                animation: 'fadeIn 0.15s ease-in-out',
                '@keyframes fadeIn': {
                  from: { opacity: 0, transform: 'scale(0.95)' },
                  to: { opacity: 1, transform: 'scale(1)' },
                },
              },
            }}
            MenuListProps={{
              dense: true,
              sx: {
                '& .MuiMenuItem-root': {
                  fontSize: '0.85rem',
                  paddingY: 0.7,
                  borderRadius: 1,
                  gap: 1,
                  display: 'flex',
                  alignItems: 'center',
                },
              },
            }}
          >
            {/* Critério: Data de Criação */}
            <MenuItem onClick={() => handleSortCriteriaChange('date')}>
              <CalendarPlus size={16} />
              <Typography variant="body2">Data Criação</Typography>
            </MenuItem>

            {/* Critério: Ordem Alfabética */}
            <MenuItem onClick={() => handleSortCriteriaChange('alphabetical')}>
              <ArrowUpAZ size={16} />
              <Typography variant="body2">Ordem de A - Z</Typography>
            </MenuItem>

            {/* Critério: Data de Atualização */}
            <MenuItem onClick={() => handleSortCriteriaChange('updateDate')}>
              <Clock size={16} />
              <Typography variant="body2">Último Update</Typography>
            </MenuItem>

            {/* Toggle: Direção de Ordenação */}
            <MenuItem onClick={toggleSortDirection}>
              {sortDirection === 'asc' ? (
                <>
                  <ArrowUpAZ size={16} />
                  <Typography variant="body2">
                    {sortCriteria === 'alphabetical' ? 'Mais Recente' : 'Mais recente'}
                  </Typography>
                </>
              ) : (
                <>
                  <ArrowDownAZ size={16} />
                  <Typography variant="body2">
                    {sortCriteria === 'alphabetical' ? 'Mais Antigo' : 'Mais antigo'}
                  </Typography>
                </>
              )}
            </MenuItem>
          </Menu>
        </StyledToolbar>
      </Box>

      {/* Lista principal */}
      <ListView viewMode={viewMode} sortCriteria={sortCriteria} sortDirection={sortDirection} />

      {/* Rodapé */}
      <Box
        component="footer"
        sx={{
          mt: 'auto',
          py: 2,
          textAlign: 'center',
          bottom: 0,
          width: '100%',
          fontSize: '0.75rem',
          color: 'text.secondary',
          background: 'transparent',
          zIndex: 999,
        }}
      >
        Desenvolvido por José Enoque ✦ Powered by React & Next.js
      </Box>

      {/* Feedback visual para restauração do modo automático */}
      <Snackbar
        open={showResetMessage}
        autoHideDuration={3000}
        onClose={() => setShowResetMessage(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="info" variant="filled" sx={{ width: '100%' }}>
          Modo automático restaurado com sucesso.
        </Alert>
      </Snackbar>

      {/* Diálogo exibido quando a sessão expira */}
      {sessionExpired && (
        <Dialog open onClose={redirectToLogin}>
          <DialogTitle>Sessão Expirada</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Sua sessão expirou devido à inatividade (mais de 4 horas). Por favor, faça login
              novamente.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={redirectToLogin} color="primary">
              Fazer login novamente
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </PageWrapper>
  );
};

ComponentsPage.propTypes = {
  initialViewMode: PropTypes.string,
  initialSortCriteria: PropTypes.string,
  initialSortDirection: PropTypes.string,
};

export default ComponentsPage;

// Busca as props iniciais a partir dos cookies
export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const initialViewMode = cookies.viewMode || null;

  return {
    props: {
      initialViewMode,
      initialSortCriteria: cookies.sortCriteria || 'date',
      initialSortDirection: cookies.sortDirection || 'asc',
    },
  };
}
