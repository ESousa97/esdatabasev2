import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Toolbar
} from "@mui/material";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AppBar from "../src/components/Layout/AppBar";
import ListView from "../src/components/Lists/ListView";
import { useCustomTheme } from "../src/contexts/ThemeProvider";

const TIMEOUT = 60 * 60 * 4000; // 4 horas em milissegundos

const ComponentsPage = () => {
  const [viewMode, setViewMode] = useState("cards");
  const [sessionExpired, setSessionExpired] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("date");
  const [sortDirection, setSortDirection] = useState("asc");
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useCustomTheme();

  // Timeout para detectar inatividade e encerrar a sessão
  useEffect(() => {
    let timeoutId;
    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        console.log("Usuário inativo. Encerrando sessão...");
        signOut({ redirect: false });
        setSessionExpired(true);
      }, TIMEOUT);
    };

    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keypress", resetTimeout);
    window.addEventListener("scroll", resetTimeout);
    resetTimeout();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", resetTimeout);
      window.removeEventListener("keypress", resetTimeout);
      window.removeEventListener("scroll", resetTimeout);
    };
  }, [router]);

  const redirectToLogin = () => {
    setSessionExpired(false);
    router.push("/login");
  };

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSortCriteriaChange = (criteria) => {
    setSortCriteria(criteria);
    handleClose();
  };
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    handleClose();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* AppBar atualizado */}
      <AppBar onToggleDarkMode={toggleDarkMode} />

      {/* Toolbar com botões para alternar visualizações e filtros */}
      <Toolbar sx={{ mt: 8, mb: 2, gap: 1 }}>
        <IconButton onClick={() => setViewMode("cards")} color="inherit">
          <ViewModuleIcon />
        </IconButton>
        <IconButton onClick={() => setViewMode("detailed")} color="inherit">
          <ViewListIcon />
        </IconButton>
        <IconButton onClick={() => setViewMode("compact")} color="inherit">
          <ViewCompactIcon />
        </IconButton>
        <IconButton onClick={handleMenuClick} color="inherit">
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="filter-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
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
      </Toolbar>

      {/* ListView unificado */}
      <ListView
        viewMode={viewMode}
        sortCriteria={sortCriteria}
        sortDirection={sortDirection}
      />

      {/* Diálogo de sessão expirada */}
      {sessionExpired && (
        <Dialog open onClose={redirectToLogin}>
          <DialogTitle>Sessão Expirada</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Sua sessão expirou devido à inatividade (mais de 4 horas). Por favor, faça login novamente.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={redirectToLogin} color="primary">
              Fazer login novamente
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ComponentsPage;

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
