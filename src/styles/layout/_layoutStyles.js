// _layoutStyles.js ou onde HeaderContainer é definido
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

export const HeaderContainer = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 2, // 🔥 Aqui é a mágica
  position: 'fixed',
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.primary.main
      : theme.palette.background.paper + 'CC',
  boxShadow: theme.shadows[4],
  backdropFilter: 'blur(6px)', // Permite que elementos absolutamente posicionados escapem

  '& .MuiToolbar-root': {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    minHeight: 61.5,

    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(0.5),
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
      minHeight: 52.5,
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
