// src/styles/layout/_layoutStyles.js
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

export const HeaderContainer = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));
