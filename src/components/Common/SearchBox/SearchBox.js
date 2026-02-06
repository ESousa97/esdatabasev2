import React, { useState, useEffect, useMemo, useCallback } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import { useTheme, useMediaQuery } from '@mui/material';
import Popper from '@mui/material/Popper';
import {
  StyledOption,
  StyledAutocomplete,
  StyledTextField,
  OptionTitle,
  OptionDescription,
  LoadingMessage,
} from './SearchBoxStyles';
import { apiClient } from '../../../utils/apiClient';

const SearchBox = () => {
  const [open, setOpen] = useState(false);
  const [fetchedOptions, setFetchedOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isXsDown = useMediaQuery('(max-width:400px)');

  const loaderSize = isXsDown ? 12 : isSmDown ? 16 : 20;

  // Derive options based on open state and inputValue
  const options = useMemo(() => {
    if (!open || inputValue === '') return [];
    return fetchedOptions;
  }, [open, inputValue, fetchedOptions]);

  const loading = isLoading && open && inputValue !== '';

  // Clear options when closing - called as event handler, not in effect
  const handleClose = useCallback(() => {
    setOpen(false);
    setFetchedOptions([]);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    let active = true;
    if (inputValue === '') {
      // Don't call setState here - options are derived as empty when inputValue is ''
      return;
    }
    setIsLoading(true);
    (async () => {
      try {
        const response = await apiClient.get('/search', {
          params: { query: inputValue },
        });
        const data = response.data;
        if (active) {
          setFetchedOptions(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Erro na busca:', error);
        if (active) {
          setFetchedOptions([]);
          setIsLoading(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [inputValue]);

  const handleSelect = (event, value) => {
    if (value && value.id) {
      router.push(`/procedimentos/${value.id}`);
    }
  };

  const CustomPopper = (props) => (
    <Popper
      {...props}
      modifiers={[
        {
          name: 'widthMatch',
          enabled: true,
          phase: 'beforeWrite',
          requires: ['computeStyles'],
          fn: ({ state }) => {
            state.styles.popper.width = `${state.rects.reference.width}px`;
          },
        },
      ]}
    />
  );

  return (
    <StyledAutocomplete
      id="search-box"
      PopperComponent={CustomPopper}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      onChange={handleSelect}
      getOptionLabel={(option) => option.titulo || ''}
      options={options}
      loading={loading}
      loadingText={<LoadingMessage>Carregando...</LoadingMessage>}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      renderOption={(props, option) => (
        <StyledOption {...props}>
          <OptionTitle variant="subtitle2">{option.titulo}</OptionTitle>
          <OptionDescription variant="body2">{option.descricao}</OptionDescription>
        </StyledOption>
      )}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          label="Pesquisar..."
          variant="outlined"
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: <>{loading && <CircularProgress color="inherit" size={loaderSize} />}</>,
          }}
        />
      )}
    />
  );
};

export default SearchBox;
