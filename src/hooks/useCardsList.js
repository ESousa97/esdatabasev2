import { useEffect, useState } from 'react';
import { apiClient } from '../utils/apiClient';

const sortData = (data, sortCriteria, sortDirection) =>
  data.sort((a, b) => {
    let itemA;
    let itemB;
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

export function useCardsList(sortCriteria, sortDirection) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get('/cards')
      .then((response) => {
        const sortedData = sortData(response.data, sortCriteria, sortDirection);
        setItems(sortedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching card list:', err);
        setError(err);
        setLoading(false);
      });
  }, [sortCriteria, sortDirection]);

  return { items, loading, error };
}
