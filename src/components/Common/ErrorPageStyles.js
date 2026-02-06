// src/components/Common/ErrorPageStyles.js
// Styled components compartilhados entre GenericError e StatusErrorPage
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

export const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export const Wrapper = styled('div')(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  fontFamily: 'Segoe UI, Roboto, sans-serif',
  zIndex: 9999,
}));

export const AnimationLayer = styled('div')(() => ({
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
}));

export const StyledLottie = styled(Lottie)(() => ({
  width: '100%',
  height: '100%',
  maxWidth: '100vw',
  maxHeight: '100vh',
  objectFit: 'cover',
}));

export const FullscreenCard = styled(motion.div)(() => ({
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

export const Title = styled('h1')(() => ({
  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
  fontWeight: 700,
  marginBottom: '1rem',
  color: 'var(--color-text, #fff)',
}));

export const Description = styled('p')(() => ({
  fontSize: 'clamp(1rem, 2vw, 1.3rem)',
  color: 'var(--color-text, #ddd)',
  maxWidth: '600px',
  marginBottom: '1.5rem',
}));

export const CodeInfo = styled('p')(() => ({
  fontSize: '1rem',
  color: 'var(--color-text, #bbb)',
  marginBottom: '1rem',
}));

export const ErrorMessage = styled('pre')(() => ({
  fontSize: '0.85rem',
  color: '#f87171',
  backgroundColor: 'rgba(0,0,0,0.25)',
  padding: '1rem',
  borderRadius: '8px',
  maxWidth: '600px',
  overflowX: 'auto',
  marginBottom: '1.5rem',
}));
