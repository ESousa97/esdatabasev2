// Login.jsx
import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react'; // signIn removido
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../src/styles/theme';
import {
  Box,
  Button,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Stack,
  Divider,
} from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import MicrosoftIcon from '../src/components/Auth/MicrosoftIcon';
import GoogleIcon from '../src/components/Auth/GoogleIcon';
import homeAnimation from '../src/animations/home-animation.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import loginAnimation from '../src/animations/login-animation.json';

export default function Login() {
  const [prefersDark, setPrefersDark] = useState(false);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setPrefersDark(mediaQuery.matches);
  }, []);

  const theme = prefersDark ? darkTheme : lightTheme;

  const redirectToFakeLogin = (type) => {
    window.open(`/fake-login/${type}`, '_blank');
  };

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Login - Projects Portfólio</title>
      </Head>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Lado esquerdo - Animação */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: prefersDark
              ? 'linear-gradient(135deg, #0f172a, #1e293b)'
              : 'linear-gradient(135deg, #e0f2f1, #f3f4f6)',
          }}
        >
          <Lottie
            animationData={loginAnimation}
            loop
            autoplay
            style={{
              width: isMobile ? '90%' : '80%',
              maxHeight: '80vh',
              objectFit: 'contain',
            }}
          />
        </Box>

        {/* Lado direito - Card de login */}
        <Box
          sx={{
            flex: 1,
            p: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 420,
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              borderRadius: 4,
              boxShadow: theme.shadows[5],
              p: 4,
              textAlign: 'center',
              transition: 'all 0.3s ease',
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Bem-vindo à{' '}
              <span style={{ color: theme.palette.primary.main }}>Projects Portfólio</span>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Acesse sua conta para continuar
            </Typography>

            <Stack spacing={2}>
              <Button
                onClick={() => redirectToFakeLogin('microsoft')}
                startIcon={<MicrosoftIcon />}
                fullWidth
                variant="contained"
                sx={{ borderRadius: 8 }}
              >
                Entrar com Microsoft
              </Button>

              <Divider sx={{ fontSize: 12 }}>ou</Divider>

              <Button
                onClick={() => redirectToFakeLogin('google')}
                startIcon={<GoogleIcon />}
                fullWidth
                variant="contained"
                sx={{
                  borderRadius: 8,
                  backgroundColor: '#24262b',
                  '&:hover': { backgroundColor: '#1c1e25' },
                }}
              >
                Entrar com Google
              </Button>

              <Stack direction="row" spacing={1} justifyContent="center">
                <IconButton
                  onClick={() => redirectToFakeLogin('google-signup')}
                  title="Criar conta Google"
                >
                  <GoogleIcon />
                </IconButton>
                <IconButton
                  onClick={() => redirectToFakeLogin('microsoft-signup')}
                  title="Criar conta Microsoft"
                >
                  <MicrosoftIcon />
                </IconButton>
              </Stack>

              <NextLink href="/components" passHref legacyBehavior>
                <Button
                  component="a"
                  variant="outlined"
                  fullWidth
                  sx={{ borderRadius: 8, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Box sx={{ width: 28, height: 28 }}>
                    <Lottie
                      animationData={homeAnimation}
                      loop
                      autoplay
                      style={{ width: '100%', height: '100%' }}
                    />
                  </Box>
                  Ir para Home
                </Button>
              </NextLink>
            </Stack>

            <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
              <NextLink href="/terms" passHref>
                <Button variant="text" size="small">
                  Termos de Uso
                </Button>
              </NextLink>
              <NextLink href="/privacy" passHref>
                <Button variant="text" size="small">
                  Privacidade
                </Button>
              </NextLink>
            </Stack>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return { redirect: { destination: '/components', permanent: false } };
  }
  return { props: {} };
}
