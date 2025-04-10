import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

// Ícones
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Componentes customizados
import AppBar from "../src/components/Layout/AppBar";
import ListView from "../src/components/Lists/ListView/ListView";
import { useCustomTheme } from "../src/contexts/ThemeProvider";
import {
  PageWrapper,
  StyledToolbar,
  StyledIconButton,
} from "../src/components/Pages/ComponentsPageStyled";

// Tempo de sessão antes de expirar (4h)
const SESSION_TIMEOUT = 4 * 60 * 60 * 1000;

const ComponentsPage = () => {
  const [viewMode, setViewMode] = useState("cards"); // Valor padrão seguro para SSR
  const [sessionExpired, setSessionExpired] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("date");
  const [sortDirection, setSortDirection] = useState("asc");
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const router = useRouter();
  const { toggleDarkMode } = useCustomTheme();

  // Define automaticamente "detailed" para telas pequenas no client-side
  useEffect(() => {
    const updateViewMode = () => {
      const width = window.innerWidth;
  
      if (width <= 400) {
        setViewMode("compact");
      } else if (width <= 600) {
        setViewMode("detailed");
      } else {
        setViewMode("cards");
      }
    };
  
    updateViewMode(); // inicial
    window.addEventListener("resize", updateViewMode);
  
    return () => window.removeEventListener("resize", updateViewMode);
  }, []);

  // Define o temporizador de inatividade da sessão (4 horas)
  useEffect(() => {
    let timeoutId;

    const resetSessionTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        console.info("Usuário inativo. Encerrando sessão...");
        signOut({ redirect: false });
        setSessionExpired(true);
      }, SESSION_TIMEOUT);
    };

    window.addEventListener("mousemove", resetSessionTimeout);
    window.addEventListener("keypress", resetSessionTimeout);
    window.addEventListener("scroll", resetSessionTimeout);
    resetSessionTimeout();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", resetSessionTimeout);
      window.removeEventListener("keypress", resetSessionTimeout);
      window.removeEventListener("scroll", resetSessionTimeout);
    };
  }, [router]);

  const redirectToLogin = () => {
    setSessionExpired(false);
    router.push("/login");
  };

  const handleMenuOpen = (event) => setMenuAnchorEl(event.currentTarget);
  const handleMenuClose = () => setMenuAnchorEl(null);

  const handleSortCriteriaChange = (criteria) => {
    setSortCriteria(criteria);
    handleMenuClose();
  };

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    handleMenuClose();
  };

  return (
    <PageWrapper>
      {/* Barra superior personalizada */}
      <AppBar onToggleDarkMode={toggleDarkMode} />
      <Box sx={{ mt: 1.5 }}> {/* ao invés de paddingTop global */}

      {/* Barra de filtros e visualizações */}
      <StyledToolbar>
        <StyledIconButton onClick={() => setViewMode("cards")}>
          <ViewModuleIcon />
        </StyledIconButton>
        <StyledIconButton onClick={() => setViewMode("detailed")}>
          <ViewListIcon />
        </StyledIconButton>
        <StyledIconButton onClick={() => setViewMode("compact")}>
          <ViewCompactIcon />
        </StyledIconButton>
        <StyledIconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </StyledIconButton>

        {/* Menu de ordenação */}
        <Menu
          id="filter-menu"
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleSortCriteriaChange("date")}>
            Data de Criação
          </MenuItem>
          <MenuItem onClick={() => handleSortCriteriaChange("alphabetical")}>
            Ordem Alfabética
          </MenuItem>
          <MenuItem onClick={() => handleSortCriteriaChange("updateDate")}>
            Data de Atualização
          </MenuItem>
          <MenuItem onClick={toggleSortDirection}>
            Direção: {sortDirection === "asc" ? "Ascendente" : "Descendente"}
          </MenuItem>
        </Menu>
      </StyledToolbar>
      </Box>

      {/* Lista renderizada dinamicamente */}
      <ListView
        viewMode={viewMode}
        sortCriteria={sortCriteria}
        sortDirection={sortDirection}
      />

      {/* Rodapé fixo como assinatura */}
      <Box
        component="footer"
        sx={{
          mt: 'auto',
          py: 2,
          textAlign: 'center',
          position: 'fixed',
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

      {/* Modal para sessão expirada */}
      {sessionExpired && (
        <Dialog open onClose={redirectToLogin}>
          <DialogTitle>Sessão Expirada</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Sua sessão expirou devido à inatividade (mais de 4 horas).
              Por favor, faça login novamente.
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

export default ComponentsPage;

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}