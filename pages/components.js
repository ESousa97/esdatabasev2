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
  Toolbar,
} from "@mui/material";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AppBar from "../src/components/Layout/AppBar";
import ListView from "../src/components/Lists/ListView/ListView";
import { useCustomTheme } from "../src/contexts/ThemeProvider";

// Define o tempo limite de inatividade (4 horas em milissegundos)
const SESSION_TIMEOUT = 4 * 60 * 60 * 1000;

const ComponentsPage = () => {
  // Estado para gerenciar a visualização, ordenação e expiração da sessão
  const [viewMode, setViewMode] = useState("cards");
  const [sessionExpired, setSessionExpired] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("date");
  const [sortDirection, setSortDirection] = useState("asc");
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const router = useRouter();
  const { toggleDarkMode } = useCustomTheme();

  /**
   * useEffect para monitorar a atividade do usuário.
   * Em caso de inatividade por mais de 4 horas, a sessão é encerrada.
   */
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

    // Adiciona os ouvintes de eventos para reiniciar o timer de inatividade
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

  /**
   * Redireciona o usuário para a página de login após a expiração da sessão.
   */
  const redirectToLogin = () => {
    setSessionExpired(false);
    router.push("/login");
  };

  /**
   * Manipuladores de eventos do menu de filtros e ordenação.
   */
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
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Barra de navegação personalizada com opção de alternar para modo escuro */}
      <AppBar onToggleDarkMode={toggleDarkMode} />

      {/* Toolbar com botões para alternar a visualização e acessar filtros */}
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
        <IconButton onClick={handleMenuOpen} color="inherit">
          <MoreVertIcon />
        </IconButton>
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
      </Toolbar>

      {/* Renderiza a lista com os parâmetros de visualização e ordenação definidos */}
      <ListView
        viewMode={viewMode}
        sortCriteria={sortCriteria}
        sortDirection={sortDirection}
      />

      {/* Diálogo para informar a expiração da sessão */}
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
