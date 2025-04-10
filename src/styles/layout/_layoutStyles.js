// _layoutStyles.js ou onde HeaderContainer é definido
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

export const HeaderContainer = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.main : undefined,
  boxShadow: theme.shadows[4],
  transition: 'all 0.3s ease-in-out',
  overflow: 'visible', // Permite que elementos absolutamente posicionados escapem
  
  '& .MuiToolbar-root': {
    overflow: 'visible',   // Garante que o conteúdo possa sair do Toolbar
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    gap: theme.spacing(1),
    minHeight: 56,
    display: 'flex',
    alignItems: 'center',
  
    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(0.5),
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
    },
  
    // Alteramos para impactar somente o título do header
    '& .header-title': {
      fontSize: '1rem',
      flexShrink: 0,
      whiteSpace: 'nowrap',
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.7rem',
        // Se preferir ocultar o título em telas menores, inclua: display: 'none',
      },
    },
  
    '& .MuiIconButton-root': {
      padding: 6,
      marginRight: 4,
      [theme.breakpoints.down('sm')]: {
        padding: 4,
        marginRight: 2,
        '& svg': {
          fontSize: '1.1rem',
        },
      },
    },
  },
}));
