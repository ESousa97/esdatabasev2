import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../src/styles/theme';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import errorAnimation500 from '../src/animations/erro-500.json';

export default function Custom500() {
  const [showCard, setShowCard] = useState(false);
  const [prefersDark, setPrefersDark] = useState(false);

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
          <Lottie
            animationData={errorAnimation500}
            loop
            autoplay
            style={styles.lottie}
          />
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
              <h1 style={styles.title}>Erro 500 - Erro interno do servidor</h1>
              <p style={styles.description}>
                Um dos nossos servidores tropeçou... ou talvez um gato tenha pisado no teclado 🐱⌨️<br />
                Estamos investigando com carinho e logo tudo voltará ao normal.<br />
                Obrigado por sua paciência!
              </p>

              <div style={styles.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => window.location.reload()}
                  startIcon={<RestartAltIcon />}
                >
                  Tentar novamente
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </ThemeProvider>
  );
}

Custom500.getLayout = (page) => page;

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
    color: 'var(--color-text)',
  },
  description: {
    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
    maxWidth: '600px',
    marginBottom: '2rem',
    color: 'var(--color-text)',
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};
