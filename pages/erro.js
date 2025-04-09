// pages/erro.js
import React from 'react';
import { useRouter } from 'next/router';
import { Button, Container, Typography } from '@mui/material';
import ErrorGateway from '../src/components/Common/ErrorGateway';

export default function CustomErrorPage() {
  const router = useRouter();
  const { code } = router.query;
  const statusCode = Number(code) || 500;

  const handleVoltar = () => router.push('/components');

  return (
    <Container style={{ marginTop: '2rem', textAlign: 'center' }}>
      <ErrorGateway statusCode={statusCode} error={null} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleVoltar}
        style={{ marginTop: '1rem' }}
      >
        Voltar para a Página Principal
      </Button>
    </Container>
  );
}
