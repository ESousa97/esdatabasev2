import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
// Pode substituir esse JSON por um específico de 401 se desejar
import errorAnimation from '../src/animations/erro-404.json';

export default function Custom401() {
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.animation}>
        <Lottie animationData={errorAnimation} loop autoplay />
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
            <h1 style={styles.title}>Erro 401 - Não autorizado</h1>
            <p style={styles.description}>
              Você não tem permissão para acessar esta página. Faça login com uma conta válida para continuar.
            </p>

            <Link href="/login" legacyBehavior>
              <a style={styles.link}>🔐 Fazer login</a>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    fontFamily: 'Segoe UI, Roboto, sans-serif',
  },
  animation: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
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
    color: 'var(--color-text, #ddd)',
  },
  link: {
    display: 'inline-block',
    padding: '1rem 2.2rem',
    backgroundColor: 'var(--color-primary, #0070f3)',
    color: 'var(--color-on-primary, #fff)',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
    borderRadius: '0.8rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 14px rgba(0, 112, 243, 0.25)',
  },
};
