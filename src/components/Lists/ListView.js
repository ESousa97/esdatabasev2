import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Snackbar, Alert, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { StyledButtonBase, StyledCard, StyledCardMedia, StyledCardContent } from './ListStyles';

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

const ListView = ({ viewMode, sortCriteria, sortDirection }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://serverdatabase.vercel.app/api/cardlist');
        const sorted = sortData(response.data, sortCriteria, sortDirection);
        setData(sorted);
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

  if (loading) return <CircularProgress />;
  if (error) return (
    <Snackbar open autoHideDuration={6000}>
      <Alert severity="error">Erro ao carregar dados!</Alert>
    </Snackbar>
  );

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
      {data.map((item) => (
        <StyledButtonBase key={item.id} onClick={() => handleClick(item.id)} viewMode={viewMode}>
          <StyledCard viewMode={viewMode}>
            {item.imageurl && (
              <StyledCardMedia
                component="img"
                image={item.imageurl}
                alt={item.title}
                loading="lazy"
              />
            )}
            <StyledCardContent viewMode={viewMode}>
              <Typography variant={viewMode === 'detailed' ? 'h5' : 'h6'}>
                {item.title}
              </Typography>
              {viewMode === 'detailed' && (
                <Typography variant="body2" color="textSecondary">
                  {item.description}
                </Typography>
              )}
            </StyledCardContent>
          </StyledCard>
        </StyledButtonBase>
      ))}
    </div>
  );
};

export default ListView;
