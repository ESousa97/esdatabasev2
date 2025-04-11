import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import nookies from "nookies";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import {
  Box,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

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
} from "../src/components/pages/ComponentsPageStyled";

// Tempo de sessão antes de expirar (4 horas)
const SESSION_TIMEOUT = 4 * 60 * 60 * 1000;

const ComponentsPage = ({
  initialViewMode,
  initialSortCriteria,
  initialSortDirection,
}) => {
  const router = useRouter();
  const { pathname } = router;
  // Cria uma chave de cookie específica para a rota atual
  const cookieKey = `viewMode_${pathname}`;
  // Se não houver viewMode salvo para esta tela, deixa a string vazia para que a lógica automática seja acionada
  const [viewMode, setViewMode] = useState(initialViewMode || "");
  const [sortCriteria, setSortCriteria] = useState(initialSortCriteria || "date");
  const [sortDirection, setSortDirection] = useState(initialSortDirection || "asc");
  const [sessionExpired, setSessionExpired] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  // Se não houver preferência inicial, consideramos o modo automático
  const [isAuto, setIsAuto] = useState(initialViewMode ? false : true);
  const { toggleDarkMode } = useCustomTheme();

  // Ajuste automático do viewMode se o usuário ainda não tiver escolhido manualmente
  useEffect(() => {
    const updateViewMode = () => {
      if (!isAuto) return; // Não altera se o usuário já selecionou manualmente
      const width = window.innerWidth;
      let newMode = "cards";
      if (width <= 400) {
        newMode = "compact";
      } else if (width <= 600) {
        newMode = "detailed";
      }
      setViewMode(newMode);
      Cookies.set(cookieKey, newMode, { expires: 30 });
    };

    updateViewMode(); // Chamada inicial
    window.addEventListener("resize", updateViewMode);
    return () => window.removeEventListener("resize", updateViewMode);
  }, [isAuto, cookieKey]);

  // Configura o temporizador de inatividade da sessão
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

  // Quando o usuário escolhe manualmente um viewMode, desabilita o ajuste automático
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setIsAuto(false);
    Cookies.set(cookieKey, mode, { expires: 30 });
  };

  return (
    <PageWrapper>
      {/* Barra superior personalizada */}
      <AppBar onToggleDarkMode={toggleDarkMode} />
      <Box sx={{ mt: 1.5 }}>
        {/* Barra de filtros e visualizações */}
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

      {/* Rodapé fixo */}
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

// No SSR, lemos os cookies e extraímos o viewMode específico para a rota atual
export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  // Utiliza o pathname da requisição para definir a chave do cookie (ignora a query string, se houver)
  const fullUrl = context.req.url || "";
  const pathname = fullUrl.split("?")[0];
  const cookieKey = `viewMode_${pathname}`;

  return {
    props: {
      initialViewMode: cookies[cookieKey] || "",
      initialSortCriteria: cookies.sortCriteria || "date",
      initialSortDirection: cookies.sortDirection || "asc",
    },
  };
}
