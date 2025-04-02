import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

export const HeaderContainer = styled(MuiAppBar)(({ theme }) => ({
  // Aplica a cor somente no modo light; no dark deixa undefined para usar o override do tema
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.main : undefined,
}));
