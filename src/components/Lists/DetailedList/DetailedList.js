import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import MainLayout from '../../Layout/MainLayout';
import { StyledListItem, StyledPaper, StyledAvatar, StyledListItemText } from './DetailedListStyles';
import { LoadingContainer, LoadingSpinner } from '../../Common/LoadingState';
import { useCardsList } from '../../../hooks/useCardsList';

const DetailedList = ({ sortCriteria, sortDirection }) => {
  const { items, loading } = useCardsList(sortCriteria, sortDirection);
  const router = useRouter();

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

export default DetailedList;

DetailedList.propTypes = {
  sortCriteria: PropTypes.string,
  sortDirection: PropTypes.string,
};
