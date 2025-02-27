// src/components/Lists/UnifiedListView.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
  Box,
  List,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItem,
  Paper,
  ListItemIcon
} from '@mui/material';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { styled, keyframes } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

// --- Estilos para o modo "cards" (baseado em CardStyles.js) ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const CardButtonBase = styled(ButtonBase)(({ theme }) => ({
  display: 'block',
  textAlign: 'inherit',
  borderRadius: '10px',
  overflow: 'hidden',
  transition: 'transform 0.3s, box-shadow 0.3s',
  width: '100%',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0px 10px 20px rgba(0,0,0,0.2)',
  },
}));

const CardContainer = styled(Card)(({ theme }) => ({
  borderRadius: '10px',
  boxShadow: '0px 3px 10px rgba(0,0,0,0.15)',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  animation: `${fadeIn} 0.5s ease-out`,
  '&:hover': {
    boxShadow: '0px 12px 24px rgba(0,0,0,0.2)',
    transform: 'translateY(-3px)',
  },
}));

const CardImage = styled(CardMedia)({
  height: 160,
  width: '100%',
  objectFit: 'cover',
});

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'left',
  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },
}));

// --- Estilos para o modo "compact" (baseado em CompactListStyles.js) ---
const CompactListItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateX(4px)',
    boxShadow: theme.shadows[3],
  },
}));

const CompactPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  margin: `${theme.spacing(2)} auto`,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
}));

// --- Estilos para o modo "detailed" (baseado em DetailedListStyles.js) ---
const DetailedListItem = styled(ListItem)(({ theme }) => ({
  transition: 'background-color 0.4s, transform 0.4s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'scale(1.03)',
  },
  backgroundColor: theme.palette.background.default,
}));

const DetailedPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  margin: `${theme.spacing(1)} auto`,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
}));

const DetailedAvatar = styled(Avatar)({
  width: 56,
  height: 56,
});

const DetailedListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    color: theme.palette.text.primary,
  },
  '& .MuiListItemText-secondary': {
    color: theme.palette.text.secondary,
  },
}));

// Função para ordenar os dados
const sortData = (data, sortCriteria, sortDirection) => {
  return data.sort((a, b) => {
    let itemA, itemB;
    switch (sortCriteria) {
      case 'date':
        itemA = new Date(a.created_at);
        itemB = new Date(b.created_at);
        break;
      case 'alphabetical':
        itemA = a.title.toLowerCase();
        itemB = b.title.toLowerCase();
        break;
      case 'updateDate':
        itemA = new Date(a.data_modificacao);
        itemB = new Date(b.data_modificacao);
        break;
      default:
        return 0;
    }
    const comparison = itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
    return sortDirection === 'asc' ? comparison : -comparison;
  });
};

const UnifiedListView = ({ viewMode, sortCriteria, sortDirection }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://serverdatabase.vercel.app/api/cardlist');
        setData(sortData(response.data, sortCriteria, sortDirection));
      } catch (err) {
        console.error('Error fetching data', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sortCriteria, sortDirection]);

  const handleClick = (id) => {
    router.push(`/procedimentos/${id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Snackbar open autoHideDuration={6000}>
        <Alert severity="error">Erro ao carregar dados!</Alert>
      </Snackbar>
    );
  }

  // Renderização de acordo com o modo escolhido
  if (viewMode === 'cards') {
    return (
      <Grid container spacing={3} justifyContent="center" sx={{ p: 2 }}>
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <CardButtonBase onClick={() => handleClick(item.id)}>
              <CardContainer>
                {item.imageurl && (
                  <CardImage
                    component="img"
                    image={item.imageurl}
                    alt={item.title}
                    loading="lazy"
                  />
                )}
                <CardContentStyled>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                </CardContentStyled>
              </CardContainer>
            </CardButtonBase>
          </Grid>
        ))}
      </Grid>
    );
  } else if (viewMode === 'compact') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CompactPaper elevation={0}>
          <List>
            {data.map((item) => (
              <CompactListItem button key={item.id} onClick={() => handleClick(item.id)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {item.title.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={
                    item.description.length > 200
                      ? `${item.description.substring(0, 200)}...`
                      : item.description
                  }
                />
              </CompactListItem>
            ))}
          </List>
        </CompactPaper>
      </Box>
    );
  } else if (viewMode === 'detailed') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <DetailedPaper elevation={0}>
          <List>
            {data.map((item) => (
              <DetailedListItem button key={item.id} onClick={() => handleClick(item.id)}>
                <ListItemAvatar sx={{ mr: 2 }}>
                  {item.imageurl ? (
                    <DetailedAvatar src={item.imageurl} alt={item.title} />
                  ) : (
                    <DetailedAvatar>{item.title.charAt(0)}</DetailedAvatar>
                  )}
                </ListItemAvatar>
                <DetailedListItemText
                  primary={item.title}
                  secondary={
                    <>
                      {item.description}
                      <br />
                      {'Criado em: ' + format(new Date(item.created_at), 'dd/MM/yyyy HH:mm:ss')}
                    </>
                  }
                />
              </DetailedListItem>
            ))}
          </List>
        </DetailedPaper>
      </Box>
    );
  } else {
    return null;
  }
};

UnifiedListView.propTypes = {
  viewMode: PropTypes.oneOf(['cards', 'compact', 'detailed']).isRequired,
  sortCriteria: PropTypes.oneOf(['date', 'alphabetical', 'updateDate']).isRequired,
  sortDirection: PropTypes.oneOf(['asc', 'desc']).isRequired,
};

export default UnifiedListView;
