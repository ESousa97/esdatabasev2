import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Snackbar, Grid } from '@mui/material';
import { Alert } from '@mui/material';
import { useRouter } from 'next/router';
import {
  StyledButtonBase,
  StyledCard,
  StyledCardMedia,
  StyledCardContent
} from './ListStyles';

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

const ListView = ({ sortCriteria, sortDirection }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://serverdatabase.vercel.app/api/cardlist');
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
      <Snackbar open autoHideDuration={6000}>
        <Alert severity="error" variant="filled">
          Erro ao carregar os projetos!
        </Alert>
      </Snackbar>
    );
  }

  return (
    <Grid container spacing={3} justifyContent="center" style={{ padding: 16 }}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
          <StyledButtonBase onClick={() => handleCardClick(card.id)}>
            <StyledCard>
              {card.imageurl && (
                <StyledCardMedia
                  component="img"
                  image={card.imageurl}
                  alt={card.title}
                  loading="lazy"
                />
              )}
              <StyledCardContent>
                <Typography variant="h6" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {card.description}
                </Typography>
              </StyledCardContent>
            </StyledCard>
          </StyledButtonBase>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListView;
