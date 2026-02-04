import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/router';
import MainLayout from '../../Layout/MainLayout';
import { useTheme } from '@mui/material/styles';
import { LoadingContainer, LoadingSpinner } from '../../Common/LoadingState';
import { useCardsList } from '../../../hooks/useCardsList';
import {
  StyledListItem,
  StyledPaper,
  StyledListItemText // ← substituto responsivo para o título
} from './CompactListStyles';

const CompactList = ({ sortCriteria, sortDirection }) => {
  const { items, loading } = useCardsList(sortCriteria, sortDirection);
  const router = useRouter();
  const theme = useTheme();

  const handleListItemClick = (id) => {
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
                <StyledListItem button key={item.id} onClick={() => handleListItemClick(item.id)}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                      {item.titulo ? item.titulo[0] : '?'}
                    </Avatar>
                  </ListItemAvatar>
                  <StyledListItemText
                    primary={item.titulo}
                    secondary={
                      item.descricao?.length > 200
                        ? `${item.descricao.substring(0, 200)}...`
                        : item.descricao
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

export default CompactList;

CompactList.propTypes = {
  sortCriteria: PropTypes.string,
  sortDirection: PropTypes.string,
};
