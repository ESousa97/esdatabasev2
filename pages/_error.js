// pages/_error.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Error({ statusCode }) {
  return (
    <div style={styles.container}>
      <Image
        src="/images/background.gif"
        alt="Erro"
        width={300}
        height={300}
        style={{ marginBottom: '1rem' }}
      />
      <h1 style={styles.title}>
        {statusCode
          ? `Erro ${statusCode}`
          : 'Ocorreu um erro inesperado'}
      </h1>
      <p style={styles.description}>
        {statusCode === 404
          ? 'A página que você está procurando não foi encontrada.'
          : 'Algo deu errado. Por favor, tente novamente mais tarde.'}
      </p>
      <Link href="/" style={styles.link}>Voltar para a página inicial</Link>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode || 500;
  return { statusCode };
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '4rem 1rem',
    fontFamily: 'Arial, sans-serif',
    color: 'var(--color-text, #333)',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
  },
  link: {
    display: 'inline-block',
    padding: '0.6rem 1.2rem',
    backgroundColor: 'var(--color-primary, #0070f3)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '0.5rem',
    transition: 'background 0.3s ease',
  },
};

export default Error;
