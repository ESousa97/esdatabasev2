import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { lightTheme, darkTheme } from '../../styles/theme';
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
