import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { Typography, CircularProgress, Snackbar, Grid, Alert } from '@mui/material';
import { useRouter } from 'next/router';
import MainLayout from '../../Layout/MainLayout';
import { useTheme } from '@mui/material/styles';
import {
  StyledButtonBase,
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  CardTitle,
  CardDescription,
} from './CardStyles';

/**
 * Função para ordenar os dados conforme critério (sortCriteria) e direção (sortDirection).
 */
const sortData = (data, sortCriteria, sortDirection) => {
  return data.sort((a, b) => {
    let itemA, itemB;
    switch (sortCriteria) {
      case 'date':
        itemA = new Date(a.data_criacao);
        itemB = new Date(b.data_criacao);
        break;
      case 'alphabetical':
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

/**
 * Hook para buscar os cards e manter estado de carregamento/erro.
 */
const useCardList = (sortCriteria, sortDirection) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://serverdatabase.onrender.com/api/cards');
        const sorted = sortData(response.data, sortCriteria, sortDirection);
        setCards(sorted);
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
          Erro ao carregar os cards!
        </Alert>
      </Snackbar>
    );
  }

  return (
    <MainLayout>
      <Grid container spacing={3} justifyContent="center" sx={{ p: 2 }}>
        {cards.map((card) => {
          // Exemplo: Se o banco não armazena caminho completo, mas apenas 'projects0001__1.png',
          // podemos montar o caminho final:
          // Se já estiver completo (http://..., ou /assets/...), comente esse if.
          let finalImageUrl = card.imageurl || '';
          if (
            finalImageUrl &&
            !finalImageUrl.startsWith('http') &&
            !finalImageUrl.startsWith('/assets/')
          ) {
            finalImageUrl = `/assets/${finalImageUrl}`;
          }

          // Sanitiza HTML da descrição
          let safeDescription = DOMPurify.sanitize(card.descricao || '', {
            ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'span', 'a', 'ul', 'li', 'img'],
            ALLOWED_ATTR: ['src', 'href', 'alt', 'style', 'target'],
          });

          // Remove headings (h1..h6) e mantém texto interno
          safeDescription = safeDescription.replace(
            /<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi,
            '$1'
          );

          // Ajusta imagens embutidas, caso existam
          safeDescription = safeDescription.replace(
            /<img /g,
            '<img style="max-width:100%; height:auto; object-fit:cover;" '
          );

          return (
            <Grid item key={card.id}>
              <StyledButtonBase onClick={() => handleCardClick(card.id)}>
                <StyledCard>
                  {finalImageUrl && (
                    <StyledCardMedia
                      component="img"
                      image={finalImageUrl}
                      alt={card.titulo}
                      loading="lazy"
                    />
                  )}

                  <StyledCardContent>
                    <CardTitle>{card.titulo}</CardTitle>
                    <CardDescription dangerouslySetInnerHTML={{ __html: safeDescription }} />
                  </StyledCardContent>
                </StyledCard>
              </StyledButtonBase>
            </Grid>
          );
        })}
      </Grid>
    </MainLayout>
  );
});

CardList.propTypes = {
  sortCriteria: PropTypes.oneOf(['date', 'alphabetical', 'updateDate']).isRequired,
  sortDirection: PropTypes.oneOf(['asc', 'desc']).isRequired,
};

export default CardList;
