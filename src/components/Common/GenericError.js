// src/components/Common/GenericError.js
import PropTypes from 'prop-types';
import ReplayIcon from '@mui/icons-material/Replay';
import errorAnimation from '../../animations/generic-erro.json';
import StatusErrorPage from './StatusErrorPage';

export default function GenericError({ statusCode, error }) {
  return (
    <StatusErrorPage
      animationData={errorAnimation}
      title="Erro inesperado"
      description={
        'Algo fora do esperado aconteceu. Estamos cientes e já estamos investigando para resolver o mais rápido possível!'
      }
      codeInfo={`Status: ${statusCode || 'desconhecido'}`}
      errorMessage={error?.message}
      actionLabel="Tentar novamente"
      actionIcon={ReplayIcon}
      onAction={() => window.location.reload()}
    />
  );
}

GenericError.propTypes = {
  statusCode: PropTypes.number,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};
