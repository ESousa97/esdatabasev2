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
  Box
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  StyledDrawer,
  StyledListItemButton,
  CustomListItemIcon
} from '../Common/SideMenuStyles';

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
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ pt: 1.5, fontWeight: 'bold' }}
        >
          Conteúdo
        </Typography>

        {loading && (
          <Typography align="center" sx={{ mt: 2 }}>
            <CircularProgress size={24} />
          </Typography>
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

        <List component="nav" sx={{ px: 2 }}>
          {Object.keys(categories).map((category) => (
            <React.Fragment key={category}>
              <StyledListItemButton
                onClick={(event) => handleToggle(category, event)}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon
                    sx={{ color: 'primary.main', fontSize: 'small' }}
                  />
                </ListItemIcon>
                <ListItemText primary={category} />
                {openSubmenus[category] ? <ExpandLess /> : <ExpandMore />}
              </StyledListItemButton>

              <Collapse in={openSubmenus[category]} timeout="auto" unmountOnExit>
                {categories[category].map((item, index) => (
                  <StyledListItemButton
                    key={`${item.id}-${index}`}
                    sx={{ pl: 4 }}
                    onClick={(event) => handleMenuItemClick(item.id, event)}
                  >
                    <ListItemIcon>
                      <CustomListItemIcon variant="body1" component="span">
                        ➤
                      </CustomListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary={item.titulo} />
                  </StyledListItemButton>
                ))}
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </StyledDrawer>
    </>
  );
};

export default Drawer;
