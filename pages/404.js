import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../src/styles/theme';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import errorAnimation from '../src/animations/erro-404.json';

export default function Custom404() {
  const [showCard, setShowCard] = useState(false);
  const [prefersDark, setPrefersDark] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 4000);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setPrefersDark(mediaQuery.matches);

    return () => clearTimeout(timer);
  }, []);

  const theme = prefersDark ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <div style={styles.wrapper}>
        <div style={styles.animation}>
          <Lottie animationData={errorAnimation} loop autoplay style={styles.lottie} />
        </div>

        {showCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={styles.fullscreenCard}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <h1 style={styles.title}>Erro 404 - Página não encontrada</h1>
              <p style={styles.description}>
                Você parece ter descoberto um universo alternativo 👽<br />
                Mas não se preocupe, te levamos de volta rapidinho!
              </p>

              <Button
                variant="contained"
                color="primary"
                startIcon={<HomeIcon />}
                onClick={() => router.push('/components')}
              >
                Voltar ao início
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </ThemeProvider>
  );
}

Custom404.getLayout = (page) => page;

const styles = {
  wrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    fontFamily: 'Segoe UI, Roboto, sans-serif',
    zIndex: 9999,
  },
  animation: {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  lottie: {
    width: '100%',
    height: '100%',
    maxWidth: '100vw',
    maxHeight: '100vh',
    objectFit: 'cover',
  },
  fullscreenCard: {
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    padding: '2rem',
  },
  title: {
    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
    fontWeight: 700,
    marginBottom: '1rem',
    color: 'var(--color-text, #fff)',
  },
  description: {
    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
    maxWidth: '600px',
    marginBottom: '2rem',
    color: 'var(--color-text, #000)',
  },
};
