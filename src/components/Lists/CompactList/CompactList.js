import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import MainLayout from '../../Layout/MainLayout';
import { useTheme } from '@mui/material/styles';
import { StyledListItem, StyledPaper } from './CompactListStyles';

const CompactList = ({ sortCriteria, sortDirection }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/api/cards')
      .then(response => {
        const sortedData = response.data.sort((a, b) => {
          let itemA, itemB;
          switch (sortCriteria) {
            case 'date':
              // Usa data_criacao
              itemA = new Date(a.data_criacao);
              itemB = new Date(b.data_criacao);
              break;
            case 'alphabetical':
              // Usa titulo
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
      .catch(error => {
        console.error('Error fetching card list:', error);
        setLoading(false);
      });
  }, [sortCriteria, sortDirection]);

  const handleListItemClick = (id) => {
    router.push(`/procedimentos/${id}`);
  };

  return (
    <MainLayout>
      <div style={{ display: 'flex', justifyContent: 'center', padding: theme.spacing(2) }}>
        {loading ? (
          <CircularProgress size={50} />
        ) : (
          <StyledPaper elevation={0}>
            <List>
              {items.map((item) => (
                <StyledListItem
                  button
                  key={item.id}
                  onClick={() => handleListItemClick(item.id)}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                      {item.titulo ? item.titulo[0] : '?'}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
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
      </div>
    </MainLayout>
  );
};

export default CompactList;
