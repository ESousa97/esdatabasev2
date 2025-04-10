// Drawer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  List,
  ListItemIcon,
  ListItemText,
  Collapse,
  CircularProgress,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { ExpandLess, ExpandMore, ChevronRight } from '@mui/icons-material';
import { StyledDrawer, StyledListItemButton, CustomListItemIcon } from '../Common/SideMenuStyles';

// Importa a função que mapeia categorias para ícones
import { getCategoryIcon } from '../Common/CategoryIconMapper';

// Ícone padrão para o cabeçalho do menu
import { Layers } from 'lucide-react';

const Drawer = ({ open, onClose, marginTop }) => {
  const [categories, setCategories] = useState({});
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  // Carrega as categorias e organiza por nome
  useEffect(() => {
    axios
      .get('https://serverdatabase.onrender.com/api/v1/categories')
      .then((response) => {
        const fetchedCategories = response.data.reduce((acc, item) => {
          if (!acc[item.categoria]) {
            acc[item.categoria] = [];
          }
          acc[item.categoria].push(item);
          return acc;
        }, {});
        setCategories(fetchedCategories);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar itens do menu lateral:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleToggle = (category, event) => {
    event.stopPropagation();
    setOpenSubmenus((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleMenuItemClick = (id, event) => {
    event.stopPropagation();
    router.push(`/procedimentos/${id}`);
    onClose();
  };

  return (
    <>
      {open && (
        <Box
          onClick={onClose}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: (theme) => theme.zIndex.drawer - 1,
          }}
        />
      )}

      <StyledDrawer
        variant="persistent"
        anchor="left"
        open={open}
        onClose={onClose}
        marginTop={marginTop}
      >
        {/* --- Cabeçalho minimalista --- */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, px: 2, py: 2 }}>
          <Layers size={20} />
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', letterSpacing: '0.5px' }}>
            Proj Portfólio
          </Typography>
        </Box>
        <Divider sx={{ mb: 1 }} />

        {/* Se estiver carregando */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <CircularProgress size={20} />
          </Box>
        )}

        {/* Se houve erro */}
        {error && (
          <Typography align="center" color="error" sx={{ mt: 2 }}>
            Erro ao carregar categorias.
          </Typography>
        )}

        {/* Se não há categorias */}
        {!loading && !error && Object.keys(categories).length === 0 && (
          <Typography align="center" sx={{ mt: 2 }}>
            Nenhum item encontrado.
          </Typography>
        )}

        {/* --- Conteúdo principal (categorias) --- */}
        <List component="nav" sx={{ px: 1, py: 0 }}>
          {Object.keys(categories).map((category) => (
            <React.Fragment key={category}>
              {/* BOTÃO DE CATEGORIA */}
              <StyledListItemButton
                onClick={(event) => handleToggle(category, event)}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                  backgroundColor: openSubmenus[category] ? 'action.selected' : 'transparent',
                  transition: 'all 0.15s ease',
                }}
              >
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {/* Aqui mapeia a categoria para o ícone */}
                  {getCategoryIcon(category)}
                </ListItemIcon>

                <ListItemText
                  primary={category}
                  primaryTypographyProps={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                />

                {/* Ícones de expandir/recolher */}
                {openSubmenus[category] ? (
                  <ExpandLess fontSize="small" />
                ) : (
                  <ExpandMore fontSize="small" />
                )}
              </StyledListItemButton>

              {/* SUBITENS */}
              <Collapse in={openSubmenus[category]} timeout="auto" unmountOnExit>
                {categories[category].map((item, index) => (
                  <StyledListItemButton
                    key={`${item.id}-${index}`}
                    sx={{
                      pl: 4,
                      mx: 2,
                      my: 0.2,
                      borderLeft: (theme) => `2px solid ${theme.palette.divider}`,
                    }}
                    onClick={(event) => handleMenuItemClick(item.id, event)}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CustomListItemIcon variant="body1" component="span">
                      <ChevronRight fontSize="small" sx={{ color: 'primary.main' }} />
                      </CustomListItemIcon>
                    </ListItemIcon>
                    <ListItemText
                      primary={item.titulo}
                      primaryTypographyProps={{ fontSize: '0.8rem', fontWeight: 400 }}
                    />
                  </StyledListItemButton>
                ))}
              </Collapse>
            </React.Fragment>
          ))}
        </List>

        {/* Rodapé do menu, ex.: Versão, copyright */}
        <Divider sx={{ mt: 'auto', mx: 2 }} />
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="caption" color="text.secondary">
            © 2025 by José Enoque
          </Typography>
        </Box>
      </StyledDrawer>
    </>
  );
};

export default Drawer;
