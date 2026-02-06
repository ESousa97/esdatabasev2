import PropTypes from 'prop-types';
import Error400 from '../../../pages/400';
import Error401 from '../../../pages/401';
import Error403 from '../../../pages/403';
import Error404 from '../../../pages/404';
import Error500 from '../../../pages/500';
import Error503 from '../../../pages/503';
import GenericError from './GenericError';

export default function ErrorGateway({ statusCode, error }) {
  switch (statusCode) {
    case 400:
      return <Error400 />;
    case 401:
      return <Error401 />;
    case 403:
      return <Error403 />;
    case 404:
      return <Error404 />;
    case 500:
      return <Error500 />;
    case 503:
      return <Error503 />;
    default:
      return <GenericError statusCode={statusCode} error={error} />;
  }
}

ErrorGateway.propTypes = {
  statusCode: PropTypes.number,
  error: PropTypes.object,
};
