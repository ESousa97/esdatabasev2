// src/components/Common/GenericError.js
import { useEffect, useState } from 'react';
import { ThemeProvider, styled } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../../styles/theme';
import { motion } from 'framer-motion';
import ReplayIcon from '@mui/icons-material/Replay';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import errorAnimation from '../../animations/generic-erro.json';

const Wrapper = styled('div')(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  fontFamily: 'Segoe UI, Roboto, sans-serif',
  zIndex: 9999,
}));

const AnimationLayer = styled('div')(() => ({
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
}));

const StyledLottie = styled(Lottie)(() => ({
  width: '100%',
  height: '100%',
  maxWidth: '100vw',
  maxHeight: '100vh',
  objectFit: 'cover',
}));

const FullscreenCard = styled(motion.div)(() => ({
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
}));

const Title = styled('h1')(() => ({
  fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
  fontWeight: 700,
  marginBottom: '1rem',
  color: 'var(--color-text, #fff)',
}));

const Description = styled('p')(() => ({
  fontSize: 'clamp(1rem, 2vw, 1.3rem)',
  color: 'var(--color-text, #ddd)',
  maxWidth: '600px',
  marginBottom: '1.5rem',
}));

const CodeInfo = styled('p')(() => ({
  fontSize: '1rem',
  color: 'var(--color-text, #bbb)',
  marginBottom: '1rem',
}));

const ErrorMessage = styled('pre')(() => ({
  fontSize: '0.85rem',
  color: '#f87171',
  backgroundColor: 'rgba(0,0,0,0.25)',
  padding: '1rem',
  borderRadius: '8px',
  maxWidth: '600px',
  overflowX: 'auto',
  marginBottom: '1.5rem',
}));

const ButtonRow = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
}));

const RetryButton = styled('button')(() => ({
  border: 'none',
  background: '#4f46e5',
  color: '#fff',
  fontSize: '1rem',
  padding: '0.8rem 1.4rem',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.2s ease',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  '&:hover': { background: '#4338ca' },
}));

const ReplayIconStyled = styled(ReplayIcon)(() => ({
  marginRight: 8,
}));

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
      <Wrapper>
        <AnimationLayer>
          <StyledLottie animationData={errorAnimation} loop autoplay />
        </AnimationLayer>

        {showCard && (
          <FullscreenCard initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Title>Erro inesperado</Title>
              <Description>
                Algo fora do esperado aconteceu. Estamos cientes e já estamos investigando para resolver o mais rápido possível!
              </Description>
              <CodeInfo>Status: {statusCode || 'desconhecido'}</CodeInfo>

              {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}

              <ButtonRow>
                <RetryButton onClick={() => window.location.reload()}>
                  <ReplayIconStyled />
                  Tentar novamente
                </RetryButton>
              </ButtonRow>
            </motion.div>
          </FullscreenCard>
        )}
      </Wrapper>
    </ThemeProvider>
  );
}
