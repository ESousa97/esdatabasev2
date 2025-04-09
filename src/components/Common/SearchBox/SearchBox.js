import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

const StyledOption = styled('li')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SearchBox = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const loading = open && options.length === 0;
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    let active = true;
    if (inputValue === '') {
      setOptions([]);
      return undefined;
    }

    (async () => {
      try {
        const response = await fetch(
          `https://serverdatabase.onrender.com/api/v1/search?query=${encodeURIComponent(inputValue)}`
        );
        const data = await response.json();
        if (active) {
          setOptions(data);
        }
      } catch (error) {
        console.error('Erro na busca:', error);
        setOptions([]);
      }
    })();

    return () => {
      active = false;
    };
  }, [inputValue]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleSelect = (event, value) => {
    if (value && value.id) {
      router.push(`/procedimentos/${value.id}`);
    }
  };

  return (
    <Autocomplete
      id="search-box"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onChange={handleSelect}
      getOptionLabel={(option) => option.titulo || ''}
      options={options}
      loading={loading}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      sx={{
        width: { xs: '220px', sm: '260px' },
        '& .MuiAutocomplete-listbox': {
          padding: 0,
          boxShadow: theme.shadows[4],
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
        },
        '& .MuiAutocomplete-option': {
          padding: theme.spacing(1),
          borderBottom: `1px solid ${theme.palette.divider}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }}
      renderOption={(props, option) => (
        <StyledOption {...props}>
          <Typography
            variant="subtitle2"
            sx={{ color: theme.palette.mode === 'light' ? '#111827' : '#f9fafb' }}
          >
            {option.titulo}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.mode === 'light' ? '#111827' : '#f9fafb' }}
          >
            {option.descricao}
          </Typography>
        </StyledOption>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Pesquisar..."
          variant="outlined"
          size="small"
          sx={{
            // Estiliza o label para cores contrastantes
            '& .MuiInputLabel-root': {
              color: theme.palette.mode === 'light' ? '#111827' : '#f9fafb',
            },
            // Estiliza o input: texto e borda
            '& .MuiOutlinedInput-root': {
              color: theme.palette.mode === 'light' ? '#111827' : '#f9fafb',
              '& fieldset': {
                borderColor: theme.palette.mode === 'light' ? '#111827' : '#f9fafb',
              },
              '&:hover fieldset': {
                borderColor: theme.palette.mode === 'light' ? '#111827' : '#f9fafb',
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.mode === 'light' ? '#111827' : '#f9fafb',
              },
            },
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchBox;
