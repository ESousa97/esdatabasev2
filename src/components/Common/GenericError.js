// src/components/Common/GenericError.js
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../../styles/theme';
import { motion } from 'framer-motion';
import ReplayIcon from '@mui/icons-material/Replay';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import errorAnimation from '../../animations/generic-erro.json';

export default function GenericError({ statusCode, error }) {
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
        {/* Animação Lottie como background */}
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
              <h1 style={styles.title}>Erro inesperado</h1>
              <p style={styles.description}>
                Algo fora do esperado aconteceu. Estamos cientes e já estamos investigando para resolver o mais rápido possível!
              </p>
              <p style={styles.codeInfo}>Status: {statusCode || 'desconhecido'}</p>

              {error?.message && (
                <pre style={styles.errorMessage}>{error.message}</pre>
              )}

              <div style={styles.buttons}>
                <button style={styles.button} onClick={() => window.location.reload()}>
                  <ReplayIcon style={{ marginRight: 8 }} />
                  Tentar novamente
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </ThemeProvider>
  );
}

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
    fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
    fontWeight: 700,
    marginBottom: '1rem',
    color: 'var(--color-text, #fff)',
  },
  description: {
    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
    color: 'var(--color-text, #ddd)',
    maxWidth: '600px',
    marginBottom: '1.5rem',
  },
  codeInfo: {
    fontSize: '1rem',
    color: '#ccc',
    marginBottom: '1rem',
  },
  errorMessage: {
    maxWidth: '90%',
    color: '#ffb3b3',
    background: 'rgba(0, 0, 0, 0.4)',
    padding: '1rem',
    borderRadius: '0.5rem',
    fontSize: '0.85rem',
    margin: '0 auto 1.5rem',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    padding: '1rem 2rem',
    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
    fontWeight: 600,
    border: 'none',
    borderRadius: '0.8rem',
    cursor: 'pointer',
    backgroundColor: 'var(--color-primary, #0070f3)',
    color: 'var(--color-on-primary, #fff)',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 14px rgba(0, 112, 243, 0.25)',
    display: 'flex',
    alignItems: 'center',
  },
};
