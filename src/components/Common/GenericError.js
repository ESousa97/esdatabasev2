// src/components/Common/GenericError.js
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, styled } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../../styles/theme';
import { motion } from 'framer-motion';
import ReplayIcon from '@mui/icons-material/Replay';
import errorAnimation from '../../animations/generic-erro.json';
import {
  Wrapper,
  AnimationLayer,
  StyledLottie,
  FullscreenCard,
  Title,
  Description,
  CodeInfo,
  ErrorMessage,
} from './ErrorPageStyles';

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
  const [prefersDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 4000);
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
          <FullscreenCard
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Title>Erro inesperado</Title>
              <Description>
                Algo fora do esperado aconteceu. Estamos cientes e já estamos investigando para
                resolver o mais rápido possível!
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

GenericError.propTypes = {
  statusCode: PropTypes.number,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};
