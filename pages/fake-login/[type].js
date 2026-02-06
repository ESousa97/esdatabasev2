// src/pages/fake-login/[type].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { Box, Typography, Button, Snackbar } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import funnyAnimation from '../../src/animations/funny-login.json';
import confettiAnimation from '../../src/animations/confetti.json';

export default function GenericFakeLogin() {
  const router = useRouter();
  const theme = useTheme();
  const { query, isReady } = router;
  const type = isReady ? query.type : '';
  const [countdown, setCountdown] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const [easterEggShown, setEasterEggShown] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const getMessage = (type) => {
    switch (type) {
      case 'google':
        return 'Você tentou logar com o Google... mas o Google olhou de volta e disse: "Hã?"';
      case 'microsoft':
        return 'Login com Microsoft? Só se for no Windows 98!';
      case 'google-signup':
        return 'Criar conta no Google? Era melhor ter ido ver o filme do Pelé.';
      case 'microsoft-signup':
        return 'Cadastro na Microsoft... abortado pela Cortana com sucesso!';
      default:
        return 'Tentativa de login misteriosa detectada. Chamando os Caça-Fantasmas 👻';
    }
  };

  useEffect(() => {
    if (!isReady || !type) return;

    if (!isPaused && countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (!isPaused && countdown === 0) {
      const audio = new Audio('/sounds/pop.mp3');
      audio.play();
      setShowConfetti(true);
      setTimeout(() => router.push('/components'), 2500);
    }
  }, [countdown, isPaused, isReady, type, router]);

  useEffect(() => {
    if (isPaused && !easterEggShown) {
      const eggTimer = setTimeout(() => {
        setSnackbarOpen(true);
        setEasterEggShown(true);
      }, 7000);
      return () => clearTimeout(eggTimer);
    }
  }, [isPaused, easterEggShown]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1e293b, #0f172a)'
            : 'linear-gradient(135deg, #fdf6e3, #e1f5fe)',
        textAlign: 'center',
        padding: 4,
        position: 'relative',
      }}
    >
      {showConfetti && (
        <Box
          sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}
        >
          <Lottie animationData={confettiAnimation} loop={false} autoplay />
        </Box>
      )}

      <Box sx={{ maxWidth: 400, zIndex: 1 }}>
        <Lottie animationData={funnyAnimation} loop autoplay />
      </Box>

      <Typography variant="h5" fontWeight="bold" mt={4}>
        {getMessage(type)}
      </Typography>

      <Typography variant="body1" mt={2}>
        Este login foi tão inútil quanto um chinelo furado 🩴
        <br />
        Redirecionando você para a verdadeira salvação em {countdown} segundo
        {countdown !== 1 ? 's' : ''}...
      </Typography>

      <Button
        variant="outlined"
        onClick={() => setIsPaused(!isPaused)}
        sx={{ mt: 3, borderRadius: 8 }}
      >
        {isPaused ? 'Retomar contador' : 'Pausar redirecionamento'}
      </Button>

      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="Você pausou o universo... cuidado pra ele não perceber! 🌀"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={6000}
        icon={<VolumeUpIcon />}
      />
    </Box>
  );
}
