import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Typography, CircularProgress, Snackbar, Grid, Alert } from '@mui/material';
import { useRouter } from 'next/router';
import MainLayout from '../../Layout/MainLayout';
import { useTheme } from '@mui/material/styles';
import { StyledButtonBase, StyledCard, StyledCardMedia, StyledCardContent } from './CardStyles';

const sortData = (data, sortCriteria, sortDirection) => {
  return data.sort((a, b) => {
    let itemA, itemB;
    switch (sortCriteria) {
      case 'date':
        // Agora usamos data_criacao do BD
        itemA = new Date(a.data_criacao);
        itemB = new Date(b.data_criacao);
        break;
      case 'alphabetical':
        // Agora usamos titulo do BD
        itemA = a.titulo?.toLowerCase() || '';
        itemB = b.titulo?.toLowerCase() || '';
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

const useCardList = (sortCriteria, sortDirection) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Requisição à rota que retorna os cards
        const response = await axios.get('http://localhost:8000/api/cards');
        // Ajuste da ordenação
        setCards(sortData(response.data, sortCriteria, sortDirection));
      } catch (err) {
        console.error('Error fetching card list:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sortCriteria, sortDirection]);

  return { cards, loading, error };
};

const CardList = memo(({ sortCriteria, sortDirection }) => {
  const { cards, loading, error } = useCardList(sortCriteria, sortDirection);
  const router = useRouter();
  const theme = useTheme();

  const handleCardClick = (id) => {
    router.push(`/procedimentos/${id}`);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Snackbar open={true} autoHideDuration={6000}>
        <Alert severity="error" variant="filled">
          Erro ao carregar os projetos!
        </Alert>
      </Snackbar>
    );
  }

  return (
    <MainLayout>
      <Grid container spacing={3} justifyContent="center" style={{ padding: theme.spacing(2) }}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
            <StyledButtonBase onClick={() => handleCardClick(card.id)}>
              <StyledCard>
                {/* Ajuste: exibe a imagem se imageurl existir */}
                {card.imageurl && (
                  <StyledCardMedia
                    component="img"
                    image={card.imageurl}
                    alt={card.titulo}
                    loading="lazy"
                  />
                )}
                <StyledCardContent>
                  <Typography variant="h6" component="div">
                    {/* Ajuste: usa 'titulo' do BD */}
                    {card.titulo}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {/* Ajuste: usa 'descricao' do BD */}
                    {card.descricao}
                  </Typography>
                </StyledCardContent>
              </StyledCard>
            </StyledButtonBase>
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  );
});

CardList.propTypes = {
  sortCriteria: PropTypes.oneOf(['date', 'alphabetical', 'updateDate']).isRequired,
  sortDirection: PropTypes.oneOf(['asc', 'desc']).isRequired,
};

export default CardList;
