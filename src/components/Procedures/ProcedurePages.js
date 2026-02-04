// src/components/Procedures/ProcedurePages.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from '../../utils/apiClient';
import MainLayout from '../Layout/MainLayout';
import ProcedureDetails from './ProcedureDetails';
import ErrorGateway from '../Common/ErrorGateway';
import { CircularProgress } from '@mui/material';
import { LoadingContainer } from '../Common/LoadingState';

function ProcedurePages() {
  const { query } = useRouter();
  const { id } = query;
  const [procedure, setProcedure] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProcedure = async () => {
      try {
        const response = await apiClient.get(`/projects/${id}`);
        setProcedure(response.data);
      } catch (err) {
        console.error('Erro ao buscar procedimento:', err);
        setError(err);
        setStatusCode(err.response?.status || 500);
      } finally {
        setLoading(false);
      }
    };

    fetchProcedure();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      </MainLayout>
    );
  }

  if (error && statusCode) {
    return (
      <MainLayout>
        <ErrorGateway statusCode={statusCode} error={error} />
      </MainLayout>
    );
  }

  if (!procedure) return null;

  return (
    <MainLayout>
      <ProcedureDetails procedure={procedure} />
    </MainLayout>
  );
}

export default ProcedurePages;
