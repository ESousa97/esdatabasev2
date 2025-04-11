import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import nookies from "nookies";
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
} from "@mui/material";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

// Ícones
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Componentes customizados
import AppBar from "../src/components/Layout/AppBar";
import ListView from "../src/components/Lists/ListView/ListView";
import { useCustomTheme } from "../src/contexts/ThemeProvider";
import {
  PageWrapper,
  StyledToolbar,
  StyledIconButton,
} from "../src/components/pages/ComponentsPageStyled";

const SESSION_TIMEOUT = 4 * 60 * 60 * 1000;

const ComponentsPage = ({
  initialViewMode,
  initialSortCriteria = "date",
  initialSortDirection = "asc",
}) => {
  const [viewMode, setViewMode] = useState("cards"); // será sobrescrito abaixo
  const [sortCriteria, setSortCriteria] = useState(initialSortCriteria);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isAuto, setIsAuto] = useState(initialViewMode === null);
  const [showResetMessage, setShowResetMessage] = useState(false);

  const router = useRouter();
  const { toggleDarkMode } = useCustomTheme();

  // Define modo inicial baseado na tela apenas se for automático
  useEffect(() => {
    const width = window.innerWidth;
    let newMode = "cards";

    if (width <= 400) {
      newMode = "compact";
    } else if (width <= 600) {
      newMode = "detailed";
    }

    if (initialViewMode) {
      setViewMode(initialViewMode); // cookie do usuário → manual
    } else {
      setViewMode(newMode); // sem cookie → automático
      Cookies.set("viewMode", newMode, { expires: 30 });
    }
  }, []);

  // Atualiza dinamicamente se estiver em modo automático
  useEffect(() => {
    const updateViewMode = () => {
      if (!isAuto) return;

      const width = window.innerWidth;
      let newMode = "cards";
      if (width <= 400) newMode = "compact";
      else if (width <= 600) newMode = "detailed";

      setViewMode(newMode);
      Cookies.set("viewMode", newMode, { expires: 30 });
    };

    window.addEventListener("resize", updateViewMode);
    return () => window.removeEventListener("resize", updateViewMode);
  }, [isAuto]);

  // Sessão
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
    Cookies.set("sortCriteria", criteria, { expires: 30 });
    handleMenuClose();
  };

  const toggleSortDirection = () => {
    setSortDirection((prev) => {
      const newDir = prev === "asc" ? "desc" : "asc";
      Cookies.set("sortDirection", newDir, { expires: 30 });
      return newDir;
    });
    handleMenuClose();
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setIsAuto(false);
    Cookies.set("viewMode", mode, { expires: 30 });
  };

  const handleResetAutoView = () => {
    Cookies.remove("viewMode");
  
    const width = window.innerWidth;
    let newMode = "cards";
  
    if (width <= 400) {
      newMode = "compact";
    } else if (width <= 600) {
      newMode = "detailed";
    }
  
    setIsAuto(true);
    setViewMode(newMode);
    Cookies.set("viewMode", newMode, { expires: 30 }); // opcional: salvar imediatamente
    setShowResetMessage(true);
  };

  return (
    <PageWrapper>
      <AppBar onToggleDarkMode={toggleDarkMode} />
      <Box sx={{ mt: 1.5 }}>
        <StyledToolbar>
          <StyledIconButton onClick={() => handleViewModeChange("cards")}>
            <ViewModuleIcon />
          </StyledIconButton>
          <StyledIconButton onClick={() => handleViewModeChange("detailed")}>
            <ViewListIcon />
          </StyledIconButton>
          <StyledIconButton onClick={() => handleViewModeChange("compact")}>
            <ViewCompactIcon />
          </StyledIconButton>
          <Tooltip title="Redefinir para automático">
            <StyledIconButton onClick={handleResetAutoView}>
              <RestartAltIcon />
            </StyledIconButton>
          </Tooltip>
          <StyledIconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </StyledIconButton>

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

      <ListView
        viewMode={viewMode}
        sortCriteria={sortCriteria}
        sortDirection={sortDirection}
      />

      <Box
        component="footer"
        sx={{
          mt: "auto",
          py: 2,
          textAlign: "center",
          position: "fixed",
          bottom: 0,
          width: "100%",
          fontSize: "0.75rem",
          color: "text.secondary",
          background: "transparent",
          zIndex: 999,
        }}
      >
        Desenvolvido por José Enoque ✦ Powered by React & Next.js
      </Box>

      {/* Feedback visual do reset */}
      <Snackbar
        open={showResetMessage}
        autoHideDuration={3000}
        onClose={() => setShowResetMessage(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="info" variant="filled" sx={{ width: "100%" }}>
          Modo automático restaurado com sucesso.
        </Alert>
      </Snackbar>

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
  const cookies = nookies.get(context);
  const initialViewMode = cookies.viewMode || null;

  return {
    props: {
      initialViewMode,
      initialSortCriteria: cookies.sortCriteria || "date",
      initialSortDirection: cookies.sortDirection || "asc",
    },
  };
}
