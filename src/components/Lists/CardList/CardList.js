import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { apiClient } from '../../../utils/apiClient';
import DOMPurify from 'dompurify';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import ErrorGateway from '../../Common/ErrorGateway'; // ✅ import corrigido
import MainLayout from '../../Layout/MainLayout';
import { LoadingContainer, LoadingSpinner } from '../../Common/LoadingState';
import {
  StyledButtonBase,
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  CardTitle,
  CardDescription,
} from './CardStyles';

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

const useCardList = (sortCriteria, sortDirection) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/cards');
        const sorted = sortData(response.data, sortCriteria, sortDirection);
        setCards(sorted);
      } catch (err) {
        console.error('Erro ao buscar os cards:', err);
        setError(err);
        setStatusCode(err.response?.status || 500);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sortCriteria, sortDirection]);

  return { cards, loading, error, statusCode };
};

const CardList = memo(({ sortCriteria, sortDirection }) => {
  const { cards, loading, error, statusCode } = useCardList(sortCriteria, sortDirection);
  const router = useRouter();

  const handleCardClick = (id) => {
    router.push(`/procedimentos/${id}`);
  };

  // ⏳ Carregamento
  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  // ❌ Erro
  if (error && statusCode) {
    return (
      <MainLayout>
        <ErrorGateway statusCode={statusCode} error={error} />
      </MainLayout>
    );
  }

  // ✅ Conteúdo
  return (
    <MainLayout>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ p: 3, backgroundColor: 'var(--color-bg-muted)' }}
      >
        {cards.map((card) => {
          let finalImageUrl = card.imageurl || '';
          if (
            finalImageUrl &&
            !finalImageUrl.startsWith('http') &&
            !finalImageUrl.startsWith('/assets/')
          ) {
            finalImageUrl = `/assets/${finalImageUrl}`;
          }

          let safeDescription = DOMPurify.sanitize(card.descricao || '', {
            ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'span', 'a', 'ul', 'li', 'img'],
            ALLOWED_ATTR: ['src', 'href', 'alt', 'style', 'target'],
          });

          safeDescription = safeDescription.replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, '$1');
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

CardList.displayName = 'CardList';

CardList.propTypes = {
  sortCriteria: PropTypes.string,
  sortDirection: PropTypes.string,
};

CardList.propTypes = {
  sortCriteria: PropTypes.oneOf(['date', 'alphabetical', 'updateDate']).isRequired,
  sortDirection: PropTypes.oneOf(['asc', 'desc']).isRequired,
};

export default CardList;
