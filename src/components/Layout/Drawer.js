// Drawer.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { apiClient } from '../../utils/apiClient';
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
import {
  ExpandLess,
  ExpandMore,
  ChevronRight,
} from '@mui/icons-material';
import {
  StyledDrawer,
  StyledListItemButton,
  CustomListItemIcon,
} from '../Common/SideMenuStyles';
import { CategoryIcon } from '../Common/CategoryIconMapper';
import { Layers } from 'lucide-react';

const Drawer = ({ open, onClose, marginTop }) => {
  const [categories, setCategories] = useState({});
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    apiClient
      .get('/categories')
      .then((response) => {
        const grouped = response.data.reduce((acc, item) => {
          if (!acc[item.categoria]) acc[item.categoria] = [];
          acc[item.categoria].push(item);
          return acc;
        }, {});
        setCategories(grouped);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao carregar categorias:', err);
        setError(err);
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
            backdropFilter: 'blur(8px)', // Adiciona o efeito de desfoque
          }}
        />
      )}

      {/* Drawer posicionado logo abaixo do AppBar */}
      <StyledDrawer
        variant="persistent"
        anchor="left"
        open={open}
        onClose={onClose}
        marginTop={marginTop} // valor passado pelo MainLayout (ex: "64px")
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Título do Drawer */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, px: 2, py: 2 }}>
            <Layers size={20} />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', letterSpacing: '0.5px' }}>
              Categorias
            </Typography>
          </Box>

          <Divider sx={{ mb: 1 }} />

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <CircularProgress size={20} />
            </Box>
          )}

          {error && (
            <Typography align="center" color="error" sx={{ mt: 2 }}>
              Erro ao carregar categorias.
            </Typography>
          )}

          {!loading && !error && Object.keys(categories).length === 0 && (
            <Typography align="center" sx={{ mt: 2 }}>
              Nenhum item encontrado.
            </Typography>
          )}

          <List component="nav" sx={{ px: 1, py: 0 }}>
            {Object.keys(categories).map((category) => (
              <React.Fragment key={category}>
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
                    <CategoryIcon category={category} />
                  </ListItemIcon>

                  <ListItemText
                    primary={category}
                    primaryTypographyProps={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  />

                  {openSubmenus[category] ? (
                    <ExpandLess fontSize="small" />
                  ) : (
                    <ExpandMore fontSize="small" />
                  )}
                </StyledListItemButton>

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

          <Divider sx={{ mt: 'auto', mx: 2 }} />
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="caption" color="text.secondary">
            By José Enoque ✦ Powered by React & Next.js
            </Typography>
          </Box>
        </Box>
      </StyledDrawer>
    </>
  );
};

export default Drawer;

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  marginTop: PropTypes.string,
};
