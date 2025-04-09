// src/components/Procedures/ProcedurePages.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MainLayout from '../Layout/MainLayout';
import ProcedureDetails from './ProcedureDetails';
import ErrorGateway from '../Common/ErrorGateway';
import { CircularProgress } from '@mui/material';

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
        const response = await axios.get(`https://serverdatabase.onrender.com/api/v1/projects/${id}`);
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
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <CircularProgress />
        </div>
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
