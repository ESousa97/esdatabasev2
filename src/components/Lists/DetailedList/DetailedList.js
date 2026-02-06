import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { apiClient } from '../../../utils/apiClient';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import MainLayout from '../../Layout/MainLayout';
import {
  StyledListItem,
  StyledPaper,
  StyledAvatar,
  StyledListItemText,
} from './DetailedListStyles';
import { LoadingContainer, LoadingSpinner } from '../../Common/LoadingState';

const DetailedList = ({ sortCriteria, sortDirection }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    apiClient
      .get('/cards')
      .then((response) => {
        const sortedData = response.data.sort((a, b) => {
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
        setItems(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching card list:', error);
        setLoading(false);
      });
  }, [sortCriteria, sortDirection]);

  const handleCardClick = (id) => {
    router.push(`/procedimentos/${id}`);
  };

  return (
    <MainLayout>
      <LoadingContainer>
        {loading ? (
          <LoadingSpinner size={50} />
        ) : (
          <StyledPaper elevation={0}>
            <List>
              {items.map((item) => (
                <StyledListItem button key={item.id} onClick={() => handleCardClick(item.id)}>
                  <ListItemIcon sx={{ marginRight: 2 }}>
                    {item.imageurl ? (
                      <StyledAvatar src={item.imageurl} alt={item.titulo} />
                    ) : (
                      <StyledAvatar />
                    )}
                  </ListItemIcon>
                  <StyledListItemText
                    primary={item.titulo}
                    secondary={
                      <>
                        {item.descricao}
                        <br />
                        {'Criado em: ' + format(new Date(item.data_criacao), 'dd/MM/yyyy HH:mm:ss')}
                      </>
                    }
                  />
                </StyledListItem>
              ))}
            </List>
          </StyledPaper>
        )}
      </LoadingContainer>
    </MainLayout>
  );
};

DetailedList.propTypes = {
  sortCriteria: PropTypes.oneOf(['date', 'alphabetical', 'updateDate']).isRequired,
  sortDirection: PropTypes.oneOf(['asc', 'desc']).isRequired,
};

export default DetailedList;
