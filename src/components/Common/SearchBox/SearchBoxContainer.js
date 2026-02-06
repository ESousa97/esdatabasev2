// SearchBoxContainer.js
import React from 'react';
import Box from '@mui/material/Box';
import SearchBox from './SearchBox';

const SearchBoxContainer = () => (
  <Box
    sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end', // Alinha à direita
      px: 2,
    }}
  >
    <Box
      sx={{
        width: '100%',
        maxWidth: '260px',
        [(theme) => theme.breakpoints.down('sm')]: {
          maxWidth: '220px',
        },
      }}
    >
      <SearchBox />
    </Box>
  </Box>
);

export default SearchBoxContainer;
