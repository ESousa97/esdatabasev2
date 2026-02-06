import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { ThemeProvider, styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { lightTheme, darkTheme } from '../../styles/theme';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

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
  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
  fontWeight: 700,
  marginBottom: '1rem',
  color: 'var(--color-text, #fff)',
}));

const Description = styled('p')(() => ({
  fontSize: 'clamp(1rem, 2vw, 1.3rem)',
  maxWidth: '600px',
  marginBottom: '2rem',
  color: 'var(--color-text, #ddd)',
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

export default function StatusErrorPage({
  animationData,
  title,
  description,
  actionLabel,
  actionIcon: ActionIcon,
  onAction,
  codeInfo,
  errorMessage,
}) {
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
          <StyledLottie animationData={animationData} loop autoplay />
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
              <Title>{title}</Title>
              <Description>{description}</Description>

              {codeInfo && <CodeInfo>{codeInfo}</CodeInfo>}
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

              <Button
                variant="contained"
                color="primary"
                startIcon={ActionIcon ? <ActionIcon /> : null}
                onClick={onAction}
              >
                {actionLabel}
              </Button>
            </motion.div>
          </FullscreenCard>
        )}
      </Wrapper>
    </ThemeProvider>
  );
}

StatusErrorPage.propTypes = {
  animationData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  actionLabel: PropTypes.string.isRequired,
  actionIcon: PropTypes.elementType,
  onAction: PropTypes.func.isRequired,
  codeInfo: PropTypes.string,
  errorMessage: PropTypes.string,
};
